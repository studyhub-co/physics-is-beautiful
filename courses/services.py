from django.utils.functional import cached_property

# from user_reputation.models import Reputation
# from notifications.signals import notify

from .models import LessonProgress

class LessonLocked(Exception):

    def __init__(self, message=None):
        self.message = message or 'message', 'Lesson is locked!'


def get_progress_service(request, current_lesson=None):
    if request.user.is_authenticated:
        return ProgressService(request, current_lesson=current_lesson)
    else:
        return AnonymousProgressService(
            request, current_lesson=current_lesson
        )


class ProgressServiceBase(object):

    COMPLETION_THRESHOLD = 80
    CORRECT_RESPONSE_VALUE = 10
    INCORRECT_RESPONSE_VALUE = -5

    def __init__(self, request, current_lesson=None):
        self.request = request
        self.user = request.user
        self.current_lesson = current_lesson
        self.user_responses = []
        self._dirty_lesson_progresses = {}

    def get_next_question(self, current_question=None):
        qs = self.current_lesson.questions
        if current_question:
            qs = qs.filter(position__gt=current_question.position)
        question = qs.order_by('position').first()
        if not question:
            question = self.current_lesson.questions.first()
        elif question.position == 0:
            self.current_lesson_progress.score = 0
            self.save()
        return question

    def _allow_override(self, lesson):
        return True  # Set this to True if you want all users to have all lessons unlocked

    @cached_property
    def current_lesson_progress(self):
        if self.current_lesson:
            if self.get_lesson_status(self.current_lesson) == LessonProgress.Status.LOCKED:
                raise LessonLocked()
            return self.get_lesson_progress(self.current_lesson)

    def unlock_lesson(self, lesson):
        lesson_progress = self.get_lesson_progress(lesson)
        if lesson_progress.status != LessonProgress.Status.UNLOCKED and \
                lesson_progress.status != LessonProgress.Status.COMPLETE:  # no need to change status for completed
            lesson_progress.status = LessonProgress.Status.UNLOCKED
            self._dirty_lesson_progresses[str(lesson.pk)] = lesson_progress
        return lesson_progress

    def get_lesson_progress(self, lesson):
        return self._dirty_lesson_progresses.setdefault(
            str(lesson.pk),
            self._get_lesson_progress(lesson)
        )

    def mark_new(self, lesson):
        lesson_progress = self.get_lesson_progress(lesson)
        if lesson_progress.status != LessonProgress.Status.NEW:
            lesson_progress.status = LessonProgress.Status.NEW
            self._dirty_lesson_progresses[str(lesson.pk)] = lesson_progress
        return lesson_progress

    def get_lesson_status(self, lesson, auto_unlock=True):
        lesson_progress = self.get_lesson_progress(lesson)
        if lesson_progress.status == LessonProgress.Status.LOCKED:
            if self._allow_override(lesson):
                return LessonProgress.Status.UNLOCKED
            elif auto_unlock:
                previous_lesson = lesson.get_previous_lesson()
                if (not previous_lesson or
                        self.get_lesson_status(previous_lesson, auto_unlock=False) ==
                        LessonProgress.Status.COMPLETE):
                    next_lesson = lesson.get_next_lesson()
                    if (next_lesson and
                            self.get_lesson_status(next_lesson, auto_unlock=False) !=
                            LessonProgress.Status.LOCKED):
                        # if both our previous and next lessons are not locked, we
                        # should indicate this as a newly inserted lesson.
                        return self.mark_new(lesson).status
                    else:
                        # if only our previous lesson is locked, then let's just
                        # auto-unlock this.
                        return self.unlock_lesson(lesson).status
        return lesson_progress.status

    def check_user_response(self, user_response):
        is_correct = user_response.check_response()
        if is_correct:
            self.current_lesson_progress.score += self.CORRECT_RESPONSE_VALUE
            if self.current_lesson_progress.score >= self.COMPLETION_THRESHOLD:
                self.current_lesson_progress.complete(score=self.current_lesson_progress.score)

                # unlock the next lesson!
                next_lesson = self.current_lesson.get_next_lesson()
                if next_lesson:
                    self.unlock_lesson(next_lesson)
        else:
            self.current_lesson_progress.score = max(
                0, self.current_lesson_progress.score + self.INCORRECT_RESPONSE_VALUE
            )

        self.user_responses.append(user_response)
        self.save()
        return is_correct

    def game_success(self, game, duration=None, score=None):
        self.current_lesson_progress.complete(duration, score)
        next_lesson = game.lesson.get_next_lesson()
        if next_lesson:
            self.unlock_lesson(next_lesson)
        self.save()


class ProgressService(ProgressServiceBase):

    def _get_lesson_progress(self, lesson):
        return LessonProgress.objects.get_or_create(lesson=lesson, profile=self.user.profile)[0]

    def _allow_override(self, lesson):
        # return self.user.profile.all_lessons_unlocked or lesson.module.unit.curriculum.author == self.user
        return True

    def save(self):
        for response in self.user_responses:
            if response.content:
                obj = response.content
                obj.save()
                response.content = obj
                response.save()
        for lesson_progress in self._dirty_lesson_progresses.values():
            lesson_progress.save()
        self.user_responses = []
        self.current_lesson_progress.save()

    @staticmethod
    def get_score_board_qs(lesson):
        return LessonProgress.objects.filter(lesson=lesson, status=LessonProgress.Status.COMPLETE).order_by('duration')


class AnonymousProgressService(ProgressService):

    def __init__(self, request, current_lesson=None):
        super(AnonymousProgressService, self).__init__(request, current_lesson=current_lesson)
        if not request.session.session_key:
            request.session.create()
        self.session = request.session

    def _get_lesson_progress(self, lesson):
        return LessonProgress.objects.get_or_create(lesson=lesson, anon_session_key=self.session.session_key)[0]
