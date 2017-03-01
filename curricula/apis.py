from django.utils import timezone
import re
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ValidationError

from expander import ExpanderSerializerMixin

from .models import (
    Curriculum, Unit, Module, Lesson, Question, Answer, UserResponse, LessonProgress, Vector, Text,
    Image
)
from .services import get_progress_service


class BaseSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        super(BaseSerializer, self).__init__(*args, **kwargs)
        self.lookup_field = getattr(self.Meta, 'lookup_field', 'pk')

    def to_internal_value(self, data):
        if isinstance(data, str):
            return self.Meta.model.objects.get(**{self.lookup_field: data})
        else:
            return super(BaseSerializer, self).to_internal_value(data)


class TextSerializer(BaseSerializer):

    class Meta:
        model = Text
        fields = ['text']


class ImageSerializer(BaseSerializer):

    class Meta:
        model = Image
        fields = ['image']

    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        return '/{}'.format(obj.image.url)


class VectorSerializer(BaseSerializer):

    class Meta:
        model = Vector
        fields = ['magnitude', 'angle', 'x_component', 'y_component']

    def to_representation(self, obj):
        return super(VectorSerializer, self).to_representation(obj.for_display())


class AnswerSerializer(BaseSerializer):

    CONTENT_SERIALIZER_MAP = {
        Text.__name__.lower(): TextSerializer,
        Image.__name__.lower(): ImageSerializer,
        Vector.__name__.lower(): VectorSerializer,
    }

    class Meta:
        model = Answer
        fields = ['uuid', 'type', 'content']

    uuid = serializers.CharField()
    type = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()

    def get_type(self, obj):
        return obj.content.__class__.__name__.lower()

    def get_content(self, obj):
        return self.CONTENT_SERIALIZER_MAP[obj.content.__class__.__name__.lower()](obj.content).data


class UserResponseSerializer(BaseSerializer):

    class Meta:
        model = UserResponse
        fields = ['profile', 'question', 'vector', 'text', 'image', 'answer', 'answered_on']
        extra_kwargs = {'profile': {'required': False}}

    vector = VectorSerializer(required=False)
    text = TextSerializer(required=False)
    image= ImageSerializer(required=False)
    answer = AnswerSerializer(required=False)

    def validate_answer(self, value):
        return Answer.objects.get(uuid=value['uuid'])

    def validate(self, data):
        fields = set(self.fields.keys()) - {'question', 'profile', 'answered_on'}
        provided_fields = fields & set(data.keys())
        if len(provided_fields) != 1:
            raise ValidationError('Must specify exactly one of ({})'.format(', '.join(fields)))
        self.field_name = provided_fields.pop()
        return data

    def get_response(self, **kwargs):
        assert hasattr(self, '_errors'), (
            'You must call `.is_valid()` before calling `.get_response()`.'
        )
        content = self.validated_data.pop(self.field_name)
        if isinstance(content, dict):
            # Answers map to objects, everything else maps to dictionaries for
            # objects to be created. Here we create those sub-objects
            serializer_class = self.fields[self.field_name].__class__
            sr = serializer_class(data=content)
            sr.is_valid(raise_exception=True)
            content = sr.Meta.model(**sr.validated_data)
        self.validated_data['content'] = content
        self.validated_data.update(kwargs)
        instance = self.Meta.model(**self.validated_data)
        return instance


class LessonSerializer(BaseSerializer):

    class Meta:
        model = Lesson
        fields = ['uuid', 'name', 'image', 'module', 'is_locked', 'is_complete']

    image = serializers.SerializerMethodField()
    module = serializers.SerializerMethodField()
    is_locked = serializers.SerializerMethodField()
    is_complete = serializers.SerializerMethodField()

    def get_image(self, obj):
        return '/{}'.format(obj.image.url)

    def get_module(self, obj):
        return obj.module.uuid

    def get_is_locked(self, obj):
        return self.context['progress_service'].check_lesson_locked(obj)

    def get_is_complete(self, obj):
        return self.context['progress_service'].check_lesson_completed(obj)


class QuestionSerializer(BaseSerializer):

    class Meta:
        model = Question
        fields = ['uuid', 'text', 'hint', 'image', 'question_type', 'answer_type', 'choices', 'lesson']

    question_type = serializers.ChoiceField(
        source='question_type_name', choices=Question.QuestionType.choices_inverse
    )
    answer_type = serializers.ChoiceField(
        source='answer_type_name', choices=Question.AnswerType.choices_inverse
    )
    choices = serializers.SerializerMethodField()
    lesson = LessonSerializer()

    def get_choices(self, obj):
        if obj.question_type == Question.QuestionType.MULTIPLE_CHOICE:
            return AnswerSerializer(obj.answers, many=True).data


class LessonProgressSerializer(serializers.ModelSerializer):

    class Meta:
        model = LessonProgress
        fields = ['score']


class QuestionViewSet(ModelViewSet):

    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    permission_classes = []
    lookup_field = 'uuid'

    def user_response(self, request, uuid):
        question = self.get_object()
        data = {'question': question.pk, 'answered_on': timezone.now()}
        data.update(request.data)
        sr = UserResponseSerializer(data=data)
        sr.is_valid(raise_exception=True)
        kwargs = {}
        if request.user.is_authenticated():
            kwargs['profile'] = request.user.profile
        user_response = sr.get_response(**kwargs)
        service = get_progress_service(request, question.lesson)
        is_correct = service.check_user_response(user_response)
        data = LessonProgressSerializer(service.current_lesson_progress).data
        data['required_score'] = service.COMPLETION_THRESHOLD
        data['was_correct'] = is_correct
        if not is_correct:
            data['correct_answer'] = AnswerSerializer(user_response.get_correct_answer()).data
        return Response(data)


class LessonViewSet(ModelViewSet):

    serializer_class = LessonSerializer
    queryset = Lesson.objects.all()
    lookup_field = 'uuid'

    def get_serializer_context(self):
        context = super(LessonViewSet, self).get_serializer_context()
        context['progress_service'] = get_progress_service(context['request'])
        return context

    def get_next_question(self, request, uuid):
        lesson = self.get_object()
        service = get_progress_service(request, lesson)
        previous_question = None
        previous_question_uuid = request.query_params.get('previous_question')
        if previous_question_uuid:
            previous_question = Question.objects.filter(uuid=previous_question_uuid).first()
        question = service.get_next_question(previous_question)
        if question:
            data = QuestionSerializer(question, context={'progress_service': service}).data
            data.update(LessonProgressSerializer(service.current_lesson_progress).data)
            data['required_score'] = service.COMPLETION_THRESHOLD
            def markup(text, dictionary, user_words):
                text_with_markup = re.sub(
                    r'\b(' + '|'.join(sorted(dictionary.keys(), key=len, reverse=True)) + r')\b',
                    lambda x: '<span class="pop" style = "color:'+('orange' if x.group() not in user_words else '')+'" data-container="body" data-toggle="popover" data-placement="top" data-content="' + dictionary[x.group()] + '">' + x.group() + '</span>',
                    text,
                    flags=re.IGNORECASE)
                return text_with_markup
            dictionary = {'magnitude': 'The length of a vector'}
            user_words = []
            data['text'] = markup(data['text'], dictionary, user_words)
            return Response(data)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ModuleSerializer(ExpanderSerializerMixin, BaseSerializer):

    class Meta:
        model = Module
        fields = [
            'uuid', 'name', 'image', 'lesson_count', 'lesson_completed_count', 'is_locked',
            'is_complete'
        ]
        expandable_fields = {
            'lessons': (LessonSerializer, (), {'many': True}),
        }

    image = serializers.SerializerMethodField()
    lesson_count = serializers.IntegerField(source='lessons.count')
    lesson_completed_count = serializers.SerializerMethodField()
    is_locked = serializers.SerializerMethodField()
    is_complete = serializers.SerializerMethodField()

    def get_image(self, obj):
        return '/{}'.format(obj.image.url)

    def get_lesson_completed_count(self, obj):
        count = 0
        for lesson in obj.lessons.all():
            if self.context['progress_service'].check_lesson_completed(lesson):
                count += 1
        return count

    def get_is_locked(self, obj):
        first_lesson = obj.lessons.first()
        return bool(
            not first_lesson or self.context['progress_service'].check_lesson_locked(first_lesson)
        )

    def get_is_complete(self, obj):
        return all(
            self.context['progress_service'].check_lesson_completed(l) for l in obj.lessons.all()
        )


class ModuleViewSet(ModelViewSet):

    serializer_class = ModuleSerializer
    queryset = Module.objects.all()
    lookup_field = 'uuid'

    def get_serializer_context(self):
        context = super(ModuleViewSet, self).get_serializer_context()
        context['progress_service'] = get_progress_service(context['request'])
        return context


class UnitSerializer(ExpanderSerializerMixin, BaseSerializer):

    class Meta:
        model = Unit
        fields = ['uuid', 'name', 'image']
        expandable_fields = {
            'modules': (ModuleSerializer, (), {'many': True}),
        }


class UnitViewSet(ModelViewSet):

    serializer_class = UnitSerializer
    queryset = Unit.objects.all()
    lookup_field = 'uuid'


class CurriculumSerializer(ExpanderSerializerMixin, BaseSerializer):

    class Meta:
        model = Curriculum
        fields = ['uuid', 'name']
        expandable_fields = {
            'units': (UnitSerializer, (), {'many': True}),
        }


class CurriculaViewSet(ModelViewSet):

    serializer_class = CurriculumSerializer
    queryset = Curriculum.objects.all()
    lookup_field = 'uuid'

    def get_serializer_context(self):
        context = super(CurriculaViewSet, self).get_serializer_context()
        context['progress_service'] = get_progress_service(context['request'])
        return context

    def get_object(self):
        lookup_id = self.kwargs.get(self.lookup_url_kwarg or self.lookup_field)
        if lookup_id and lookup_id.lower() == 'default':
            return Curriculum.objects.get_default()
        return super(CurriculaViewSet, self).get_object()
