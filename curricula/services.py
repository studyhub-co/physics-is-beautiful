from collections import defaultdict

from django.utils.functional import cached_property
from django.db.models import Count

from rest_framework import serializers

from .models import LessonProgress, UserResponse, Text, Vector


def get_progress_service(request, lesson):
    if request.user.is_authenticated():
        return ProgressService(request.user, lesson)
    else:
        return AnonymousProgressService(request.user, lesson, session=request.session)


class ProgressServiceBase(object):

    COMPLETION_THRESHOLD = 80
    CORRECT_RESPONSE_VALUE = 10
    INCORRECT_RESPONSE_VALUE = -5

    def __init__(self, user, lesson):
        self.user = user
        self.lesson = lesson
        self.user_responses = []

    def check_answer(self, user_response):
        is_correct = user_response.check_response()
        if is_correct:
            self.lesson_progress.score += self.CORRECT_RESPONSE_VALUE
        else:
            self.lesson_progress.score = max(
                0, self.lesson_progress.score + self.INCORRECT_RESPONSE_VALUE
            )

        self.user_responses.append(user_response)
        self.save()
        return is_correct


class ProgressService(ProgressServiceBase):

    @cached_property
    def lesson_progress(self):
        progress, _ = LessonProgress.objects.get_or_create(
            lesson=self.lesson,
            profile=self.user.profile,
        )
        return progress

    def get_next_question(self):
        question = self.lesson.questions.exclude(
            responses__profile=self.user.profile
        ).order_by('position').first()
        if not question:
            question = self.lesson.questions.filter(
                responses__profile=self.user.profile
            ).annotate(
                num_responses=Count('responses')
            ).order_by('num_responses', 'position').first()
        return question

    def save(self):
        for response in self.user_responses:
            response.save()
        self.user_responses = []
        self.lesson_progress.save()


class LessonProgressSerializer(serializers.ModelSerializer):

    class Meta:
        model = LessonProgress
        fields = ['score']


class TextSerializer(serializers.ModelSerializer):

    class Meta:
        model = Text
        fields = ['text']


class VectorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vector
        fields = ['magnitude', 'angle', 'x_component', 'y_component']


class UserResponseSerializer(serializers.ModelSerializer):

    CONTENT_SERIALIZER_MAP = {
        Text.__name__.lower(): TextSerializer,
        Vector.__name__.lower(): VectorSerializer,
    }

    class Meta:
        model = UserResponse
        fields = ['question', 'content_type', 'content', 'is_correct']

    content = serializers.SerializerMethodField()

    def get_content(self, obj):
        return self.CONTENT_SERIALIZER_MAP[obj.content.__class__.__name__.lower()](obj.content).data


class AnonymousProgressService(ProgressServiceBase):

    DEFAULT_LESSON_STORE = {'score': 0}

    def __init__(self, user, lesson, session):
        super(AnonymousProgressService, self).__init__(user, lesson)
        self.session = session

    @cached_property
    def lessons_store(self):
        return self.session.setdefault('lessons', {})

    @cached_property
    def responses_store(self):
        return self.lessons_store.setdefault(
            str(self.lesson.pk),
            self.DEFAULT_LESSON_STORE
        ).setdefault('responses', [])

    @cached_property
    def lesson_progress(self):
        return LessonProgress(
            lesson=self.lesson,
            score=self.lessons_store.setdefault(
                str(self.lesson.pk), self.DEFAULT_LESSON_STORE
            )['score']
        )

    def get_next_question(self):
        question_counts = defaultdict(int)
        for response in self.responses_store:
            question_counts[response['question']] += 1

        total_question_count = self.lesson.questions.count()
        if total_question_count > len(question_counts):
            return self.lesson.questions.exclude(
                pk__in=question_counts.keys()
            ).order_by('position').first()
        else:
            question_count_pairs = sorted(question_counts.items(), key=lambda x: x[1])
            min_value = question_count_pairs[0][1]
            question_count_pairs = filter(
                lambda x: x[1] == min_value, question_count_pairs,
            )
            questions = [q for q, _ in question_count_pairs]
            return self.lesson.questions.filter(pk__in=questions).order_by('position').first()

    def save(self):
        lesson_raw = LessonProgressSerializer(
            self.lesson_progress
        ).data
        responses_raw = UserResponseSerializer(self.user_responses, many=True).data
        self.responses_store.extend(responses_raw)
        lesson_raw['responses'] = self.responses_store
        self.user_responses = []
        self.lessons_store[str(self.lesson_progress.lesson.pk)] = lesson_raw
        self.session['lessons'] = self.lessons_store
