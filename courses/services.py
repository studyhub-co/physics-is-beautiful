from django.utils.functional import cached_property

# from user_reputation.models import Reputation
# from notifications.signals import notify

from .models import LessonProgress, LessonProgressStatus, UserReaction, Material


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

    # COMPLETION_THRESHOLD = 80
    # CORRECT_RESPONSE_VALUE = 10
    # INCORRECT_RESPONSE_VALUE = -5
    INCORRECT_RESPONSE_RATIO = 50

    def __init__(self, request, current_lesson=None):
        self.request = request
        self.user = request.user
        self.current_lesson = current_lesson
        # self.user_reactions = []  # depricated
        self.user_reaction = None
        self._dirty_lesson_progresses = {}

    def get_next_material(self, current_material=None):
        qs = self.current_lesson.materials
        if current_material:
            qs = qs.filter(position__gt=current_material.position)
            material = qs.order_by('position').first()
            if not material:
                # if we have current_material(gets from uuid).position == 0 then return the first
                material = self.current_lesson.materials.first()
        else:
            # get the first
            material = self.current_lesson.materials.first()
            # we assume that user have old reactions (for statistics)
            # mark all last reaction as False to reset current lesson progress
            if self.user.is_authenticated:
                user_reactions = UserReaction.objects.filter(profile=self.user.profile,
                                                             material__in=self.current_lesson.materials.all(),
                                                             last_reaction=True,
                                                             )
            else:
                user_reactions = UserReaction.objects.filter(anon_session_key=self.request.session.session_key,
                                                             material__in=self.current_lesson.materials.all(),
                                                             last_reaction=True,
                                                             )
            user_reactions.update(last_reaction=False)
            # reset denorm value
            self.current_lesson_progress.score = 0
            self.save()
            # if not material:
            #     material = self.current_lesson.materials.first()
            # elif material.position == 0:
            #     # self.current_lesson_progress.score = 0
            #     # Temp variant - delete all progress if user request the 1st material in lesson
            #     # TODO remove from the anon user
            #     # user_reactions = UserReaction.objects.filter(profile=self.user.profile,
            #     #                                              material__in=self.current_lesson.materials.all())
            #     # user_reactions.delete()
            #     # self.save()
            #     pass
        return material

    def get_current_material(self, current_material_uuid):
        qs = self.current_lesson.materials
        try:
            material = qs.get(uuid=current_material_uuid)
        except Material.DoesNotExist:
            return None

        return material

    def _allow_override(self, lesson):
        return True  # Set this to True if you want all users to have all lessons unlocked

    @cached_property
    def current_lesson_progress(self):
        if self.current_lesson:
            if self.get_lesson_status(self.current_lesson) == LessonProgressStatus.LOCKED.value:
                raise LessonLocked()
            return self.get_lesson_progress(self.current_lesson)

    def unlock_lesson(self, lesson):
        lesson_progress = self.get_lesson_progress(lesson)
        if lesson_progress.status != LessonProgressStatus.UNLOCKED.value and \
                lesson_progress.status != LessonProgressStatus.COMPLETE:  # no need to change status for completed
            lesson_progress.status = LessonProgressStatus.UNLOCKED.value
            self._dirty_lesson_progresses[str(lesson.pk)] = lesson_progress
        return lesson_progress

    def get_lesson_progress(self, lesson):
        return self._dirty_lesson_progresses.setdefault(
            str(lesson.pk),
            self._get_lesson_progress(lesson)
        )

    def mark_new(self, lesson):
        lesson_progress = self.get_lesson_progress(lesson)
        if lesson_progress.status != LessonProgressStatus.NEW.value:
            lesson_progress.status = LessonProgressStatus.NEW.value
            self._dirty_lesson_progresses[str(lesson.pk)] = lesson_progress
        return lesson_progress

    def get_lesson_status(self, lesson, auto_unlock=True):
        lesson_progress = self.get_lesson_progress(lesson)
        if lesson_progress.status == LessonProgressStatus.LOCKED.value:
            if self._allow_override(lesson):
                return LessonProgressStatus.UNLOCKED.value
            elif auto_unlock:
                previous_lesson = lesson.get_previous_lesson()
                if (not previous_lesson or
                        self.get_lesson_status(previous_lesson, auto_unlock=False) ==
                        LessonProgressStatus.COMPLETE.value):
                    next_lesson = lesson.get_next_lesson()
                    if (next_lesson and
                            self.get_lesson_status(next_lesson, auto_unlock=False) !=
                            LessonProgressStatus.LOCKED.value):
                        # if both our previous and next lessons are not locked, we
                        # should indicate this as a newly inserted lesson.
                        return self.mark_new(lesson).status
                    else:
                        # if only our previous lesson is locked, then let's just
                        # auto-unlock this.
                        return self.unlock_lesson(lesson).status
        return lesson_progress.status

    def calculate_progress(self):
        # TODO validate materials w\o sanboxes?
        number_of_materials = self.current_lesson.materials.count()
        if self.user and self.user.is_authenticated and self.user.profile:
            correct_reactions = UserReaction.objects.filter(material__lesson=self.current_lesson,
                                                            is_correct=True,
                                                            profile=self.user.profile,
                                                            last_reaction=True)
            wrong_reactions = UserReaction.objects.filter(material__lesson=self.current_lesson,
                                                          is_correct=False,
                                                          profile=self.user.profile,
                                                          last_reaction=True)

            progress = max(0,
                           (correct_reactions.count() / number_of_materials) * 100 -
                           (wrong_reactions.count() / number_of_materials) * 100 * (self.INCORRECT_RESPONSE_RATIO / 100)
                           )
        else:
            # TODO calculate anon user progress
            progress = 0

        return progress

    def check_user_reaction(self, user_reaction):
        is_correct = user_reaction.check_reaction()

        # problem with validate.js
        if is_correct is None:
            return is_correct

        # save reaction
        user_reaction.is_correct = is_correct
        user_reaction.save(update_fields=["is_correct"])
        self.user_reaction = user_reaction
        # calculate progress
        # TODO not good place for this
        # 1) if we will add new material - we will got wrong score.
        # 2) we need to recalculate score for all students when add new material
        # 3) so if we want to use denorm score value we need to use backgroud quene (same issue in classroom app)
        # 4) we can just calculate score for each user request (todo optimize sql query).
        self.current_lesson_progress.score = self.calculate_progress()
        self.save()

        return is_correct

        # if is_correct:
        #     self.current_lesson_progress.score += self.CORRECT_RESPONSE_VALUE
        #     if self.current_lesson_progress.score >= self.COMPLETION_THRESHOLD:
        #         self.current_lesson_progress.complete(score=self.current_lesson_progress.score)
        #
        #         # unlock the next lesson!
        #         next_lesson = self.current_lesson.get_next_lesson()
        #         if next_lesson:
        #             self.unlock_lesson(next_lesson)
        # else:
        #     self.current_lesson_progress.score = max(
        #         0, self.current_lesson_progress.score + self.INCORRECT_RESPONSE_VALUE
        #     )
        #
        # # Why user_reactions is list? seems because it was multiple choices == reactions list. not actual
        # self.user_reactions.append(user_reaction)
        # self.save()
        # return is_correct

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
        # FIXME ???
        # return self.user.profile.all_lessons_unlocked or lesson.module.unit.course.author == self.user
        return True

    def save(self):
        # for response in self.user_reactions:
        #     if response.content:
        #         obj = response.content
        #         obj.save()
        #         response.content = obj
        #         response.save()

        # for reaction in self.user_reactions:
        #     reaction.save()
        # self.reaction.save() # already saved

        for lesson_progress in self._dirty_lesson_progresses.values():
            lesson_progress.save()

        # self.user_reactions = []
        self.current_lesson_progress.save()

    # @staticmethod
    # def get_score_board_qs(lesson):
    #     return LessonProgress.objects.filter(
    #         lesson=lesson, status=LessonProgressStatus.COMPLETE.value
    #     ).order_by('duration')

    @staticmethod
    def get_scoreboard_qs(material):
        from django.db.models import F, Func
        from django.db.models import ExpressionWrapper, DurationField

        return UserReaction.objects.filter(
            material=material
        ).annotate(
            # duration=Func(F('reacted_on'), F('reaction_start_on'), function='AGE')
            duration=ExpressionWrapper(F('reacted_on') - F('reaction_start_on'), output_field=DurationField())
        ).order_by('-duration')


class AnonymousProgressService(ProgressService):

    def __init__(self, request, current_lesson=None):
        super(AnonymousProgressService, self).__init__(request, current_lesson=current_lesson)
        if not request.session.session_key:
            request.session.create()
        self.session = request.session

    def _get_lesson_progress(self, lesson):
        return LessonProgress.objects.get_or_create(lesson=lesson, anon_session_key=self.session.session_key)[0]

