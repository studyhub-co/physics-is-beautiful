from collections import defaultdict

from django.contrib.contenttypes.models import ContentType
from django.utils.functional import cached_property
from django.db.models import Count, Q
from django.utils import timezone

from rest_framework import serializers

from .models import LessonProgress, UserResponse, Text, Vector, Answer, Lesson


class LessonLocked(Exception):

    def __init__(self, message=None):
        self.message = message or 'message', 'Lesson is locked!'


def get_progress_service(request, current_lesson=None):
    if request.user.is_authenticated():
        return ProgressService(request, current_lesson=current_lesson)
    else:
        return AnonymousProgressService(request, session=request.session, current_lesson=current_lesson)


class ProgressServiceBase(object):

    COMPLETION_THRESHOLD = 80
    CORRECT_RESPONSE_VALUE = 10
    INCORRECT_RESPONSE_VALUE = -5

    def __init__(self, request, current_lesson=None):
        self.request = request
        self.user = request.user
        self.current_lesson = current_lesson
        self.user_responses = []

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

    def check_lesson_locked(self, lesson):
        is_locked = self._check_lesson_locked(lesson)
        if is_locked and lesson.is_start:
            self.unlock_lesson(lesson)
            return False
        return is_locked

    def check_user_response(self, user_response):
        is_correct = user_response.check_response()
        if is_correct:
            self.current_lesson_progress.score += self.CORRECT_RESPONSE_VALUE
            if self.current_lesson_progress.score >= self.COMPLETION_THRESHOLD:
                self.current_lesson_progress.completed_on = timezone.now()
                # unlock the next lesson!
                next_lesson = Lesson.objects.filter(
                    Q(position__gt=self.current_lesson.position,
                      module=self.current_lesson.module) |
                    Q(module__position__gt=self.current_lesson.module.position,
                      module__unit=self.current_lesson.module.unit) |
                    Q(module__unit__position__gt=self.current_lesson.module.unit.position,
                      module__unit__curriculum=self.current_lesson.module.unit.curriculum)
                ).order_by('module__unit__position', 'module__position', 'position').first()
                if next_lesson:
                    self.unlock_lesson(next_lesson)
        else:
            self.current_lesson_progress.score = max(
                0, self.current_lesson_progress.score + self.INCORRECT_RESPONSE_VALUE
            )

        self.user_responses.append(user_response)
        self.save()
        return is_correct


class ProgressService(ProgressServiceBase):

    @cached_property
    def current_lesson_progress(self):
        if self.current_lesson:
            try:
                return LessonProgress.objects.get(
                    lesson=self.current_lesson,
                    profile=self.user.profile,
                )
            except LessonProgress.DoesNotExist:
                if self.current_lesson.is_start:
                    return self.unlock_lesson(self.current_lesson)
                raise LessonLocked()

    def unlock_lesson(self, lesson):
        lp = LessonProgress.objects.create(
            lesson=lesson,
            profile=self.user.profile
        )
        self.lesson_completion_map[lesson.uuid] = None

    @cached_property
    def lesson_completion_map(self):
        return {
            lp.lesson.uuid: lp.completed_on for lp in LessonProgress.objects.filter(
                profile=self.user.profile
            ).only('lesson_id', 'completed_on')
        }

    def _check_lesson_locked(self, lesson):
        return bool(not lesson or lesson.uuid not in self.lesson_completion_map)

    def check_lesson_completed(self, lesson):
        return bool(lesson and self.lesson_completion_map.get(lesson.uuid, False))

    def save(self):
        for response in self.user_responses:
            obj = response.content
            obj.save()
            response.content = obj
            response.save()
        self.user_responses = []
        self.current_lesson_progress.save()


class LessonProgressSerializer(serializers.ModelSerializer):

    class Meta:
        model = LessonProgress
        fields = ['score', 'completed_on']


class TextSerializer(serializers.ModelSerializer):

    class Meta:
        model = Text
        fields = ['text']


class VectorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vector
        fields = ['magnitude', 'angle', 'x_component', 'y_component']


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = ['uuid']

    uuid = serializers.CharField()


class UserResponseSerializer(serializers.ModelSerializer):

    CONTENT_SERIALIZER_MAP = {
        Text.__name__.lower(): TextSerializer,
        Vector.__name__.lower(): VectorSerializer,
        Answer.__name__.lower(): AnswerSerializer,
    }

    class Meta:
        model = UserResponse
        fields = ['question', 'content_type', 'content', 'is_correct', 'answered_on']

    content = serializers.SerializerMethodField()

    def get_content(self, obj):
        return self.CONTENT_SERIALIZER_MAP[obj.content.__class__.__name__.lower()](obj.content).data


class AnonymousProgressService(ProgressServiceBase):

    DEFAULT_LESSON_STORE = {'score': 0, 'completed_on': None, 'responses': []}

    def __init__(self, request, session, current_lesson=None):
        super(AnonymousProgressService, self).__init__(request, current_lesson=current_lesson)
        self.session = session

    @cached_property
    def lessons_store(self):
        return self.session.setdefault('lessons', {})

    def get_lesson_responses_store(self, lesson):
        try:
            return self.lessons_store[lesson.uuid]['responses']
        except KeyError:
            if lesson and lesson.is_start:
                return self.unlock_lesson(lesson)
            raise LessonLocked()

    @cached_property
    def current_lesson_responses_store(self):
        if self.current_lesson:
            return self.get_lesson_responses_store(self.current_lesson)

    def unlock_lesson(self, lesson):
        self.lessons_store.setdefault(lesson.uuid, self.DEFAULT_LESSON_STORE)
        return self.get_lesson_progress(lesson)

    def _check_lesson_locked(self, lesson):
        return lesson.uuid not in self.lessons_store

    def check_lesson_completed(self, lesson):
        try:
            return bool(self.get_lesson_progress(lesson).completed_on)
        except LessonLocked:
            return False

    def get_lesson_progress(self, lesson):
        try:
            lesson_progress = self.lessons_store[lesson.uuid]
        except KeyError:
            if lesson and lesson.is_start:
                return self.unlock_lesson(lesson)
            raise LessonLocked()
        return LessonProgress(
            lesson=lesson,
            score=lesson_progress['score'],
            completed_on=lesson_progress['completed_on'],
        )

    @cached_property
    def current_lesson_progress(self):
        if self.current_lesson:
            return self.get_lesson_progress(self.current_lesson)

    def save(self):
        lesson_raw = LessonProgressSerializer(
            self.current_lesson_progress
        ).data
        responses_raw = UserResponseSerializer(self.user_responses, many=True).data
        self.current_lesson_responses_store.extend(responses_raw)
        lesson_raw['responses'] = self.current_lesson_responses_store
        self.user_responses = []
        self.lessons_store[self.current_lesson_progress.lesson.uuid] = lesson_raw
        self.session['lessons'] = self.lessons_store
