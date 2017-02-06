from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ValidationError

from expander import ExpanderSerializerMixin

from .models import (
    Curriculum, Unit, Module, Lesson, Question, Answer, UserResponse, LessonProgress, Vector, Text
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


class VectorSerializer(BaseSerializer):

    class Meta:
        model = Vector
        fields = ['magnitude', 'angle', 'x_component', 'y_component']


class AnswerSerializer(BaseSerializer):

    CONTENT_SERIALIZER_MAP = {
        Text.__name__.lower(): TextSerializer,
        Vector.__name__.lower(): VectorSerializer,
    }

    class Meta:
        model = Answer
        fields = ['uuid', 'type', 'content']
        lookup_field = 'uuid'

    type = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()

    def get_type(self, obj):
        return obj.content.__class__.__name__.lower()

    def get_content(self, obj):
        return self.CONTENT_SERIALIZER_MAP[obj.content.__class__.__name__.lower()](obj.content).data


class UserResponseSerializer(BaseSerializer):

    class Meta:
        model = UserResponse
        fields = ['profile', 'question', 'vector', 'text', 'answer']
        extra_kwargs = {'profile': {'required': False}}

    vector = VectorSerializer(required=False)
    text = TextSerializer(required=False)
    answer = AnswerSerializer(required=False)

    def validate(self, data):
        fields = set(self.fields.keys())
        provided_fields = fields & set(data.keys()) - {'question', 'profile'}
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


class QuestionSerializer(BaseSerializer):

    class Meta:
        model = Question
        fields = ['uuid', 'text', 'image', 'question_type', 'choices']

    question_type = serializers.ChoiceField(
        source='question_type_name', choices=Question.QuestionType.choices_inverse
    )
    choices = serializers.SerializerMethodField()

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
        data = {'question': question.pk}
        data.update(request.data)
        sr = UserResponseSerializer(data=data)
        sr.is_valid(raise_exception=True)
        kwargs = {}
        if request.user.is_authenticated():
            kwargs['profile'] = request.user.profile
        user_response = sr.get_response(**kwargs)
        service = get_progress_service(request, question.lesson)
        is_correct = service.check_answer(user_response)
        data = LessonProgressSerializer(service.lesson_progress).data
        data['required_score'] = service.COMPLETION_THRESHOLD
        data['was_correct'] = is_correct
        if not is_correct:
            data['correct_answer'] = AnswerSerializer(user_response.get_correct_answer()).data
        return Response(data)


class LessonSerializer(BaseSerializer):

    class Meta:
        model = Lesson
        fields = ['uuid', 'name', 'image']

    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        return '/{}'.format(obj.image.url)


class LessonViewSet(ModelViewSet):

    serializer_class = LessonSerializer
    queryset = Lesson.objects.all()

    def get_next_question(self, request, pk):
        lesson = self.get_object()
        service = get_progress_service(request, lesson)
        question = service.get_next_question()
        if question:
            return Response(QuestionSerializer(question).data)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ModuleSerializer(ExpanderSerializerMixin, BaseSerializer):

    class Meta:
        model = Module
        fields = ['uuid', 'name', 'image', 'lesson_count']
        expandable_fields = {
            'lessons': (LessonSerializer, (), {'many': True}),
        }

    image = serializers.SerializerMethodField()
    lesson_count = serializers.IntegerField(source='lessons.count')

    def get_image(self, obj):
        return '/{}'.format(obj.image.url)


class ModuleViewSet(ModelViewSet):

    serializer_class = ModuleSerializer
    queryset = Module.objects.all()


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

    def get_object(self):
        lookup_id = self.kwargs.get(self.lookup_url_kwarg or self.lookup_field)
        if lookup_id and lookup_id.lower() == 'default':
            return Curriculum.objects.get_default()
        return super(CurriculaViewSet, self).get_object()
