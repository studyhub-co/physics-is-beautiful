from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from expander import ExpanderSerializerMixin

from .models import Curriculum, Unit, Module, Lesson, Question, Answer, Vector, Text


class BaseSerializer(serializers.ModelSerializer):
    pass


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
        Text.__name__: TextSerializer,
        Vector.__name__: VectorSerializer,
    }

    class Meta:
        model = Answer
        fields = ['uuid', 'type', 'content']

    type = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()

    def get_type(self, obj):
        return obj.content.__class__.__name__.lower()

    def get_content(self, obj):
        return self.CONTENT_SERIALIZER_MAP[obj.content.__class__.__name__](obj.content).data


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


class QuestionViewSet(ModelViewSet):

    serializer_class = QuestionSerializer
    queryset = Question.objects.all()


class LessonSerializer(BaseSerializer):

    class Meta:
        model = Lesson
        fields = ['uuid', 'name', 'image']


class LessonViewSet(ModelViewSet):

    serializer_class = LessonSerializer
    queryset = Lesson.objects.all()

    def get_next_question(self, request, pk):
        lesson = self.get_object()
        question = lesson.get_next_question()
        if question:
            return Response(QuestionSerializer(question).data)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ModuleSerializer(ExpanderSerializerMixin, BaseSerializer):

    class Meta:
        model = Module
        fields = ['uuid', 'name', 'image']
        expandable_fields = {
            'lessons': (LessonSerializer, (), {'many': True}),
        }


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
