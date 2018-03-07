from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from expander import ExpanderSerializerMixin

from .models import (
    Curriculum, Unit, Module, Lesson, Question, Answer, UserResponse, LessonProgress, Vector, MathematicalExpression, UnitConversion, ImageWText
)


class LessonProgressSerializer(serializers.ModelSerializer):

    class Meta:
        model = LessonProgress
        fields = ['score', 'status', 'completed_on']


class BaseSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        super(BaseSerializer, self).__init__(*args, **kwargs)
        self.lookup_field = getattr(self.Meta, 'lookup_field', 'pk')

    def to_internal_value(self, data):
        if isinstance(data, str):
            return self.Meta.model.objects.get(**{self.lookup_field: data})
        else:
            return super(BaseSerializer, self).to_internal_value(data)


class MathematicalExpressionSerializer(BaseSerializer):

    class Meta:
        model = MathematicalExpression
        fields = ['representation']

class VectorSerializer(BaseSerializer):

    class Meta:
        model = Vector
        fields = ['magnitude', 'angle', 'x_component', 'y_component']

    def to_representation(self, obj):
        return super(VectorSerializer, self).to_representation(obj.for_display())


class UnitConversionSerializer(BaseSerializer):
    conversion_steps = serializers.JSONField()

    class Meta:
        model = UnitConversion
        fields = ['question_number', 'question_unit',
                  'answer_number', 'answer_unit',
                  'conversion_steps', 'unit_conversion_type']


class ImageWithTextSerializer(BaseSerializer):

    class Meta:
        model = ImageWText
        fields = ['text', 'image']


class AnswerSerializer(BaseSerializer):

    CONTENT_SERIALIZER_MAP = {
        Vector.__name__.lower(): VectorSerializer,
        MathematicalExpression.__name__.lower(): MathematicalExpressionSerializer,
        UnitConversion.__name__.lower(): UnitConversionSerializer,
        ImageWText.__name__.lower(): ImageWithTextSerializer,
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
        fields = [
            'question', 'vector',  'mathematical_expression', 'unit_conversion',  # 'text', 'image',
            'profile',
            'answer', 'answers_list',
            'answered_on'
        ]
        extra_kwargs = {'profile': {'required': False}}

    vector = VectorSerializer(required=False)
    mathematical_expression = MathematicalExpressionSerializer(required=False)
    # multiple or multi select field
    answer = AnswerSerializer(required=False)
    answers_list = AnswerSerializer(required=False, many=True)
    unit_conversion = UnitConversionSerializer(required=False)

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
        answers_list = []
        if isinstance(content, dict):
            # Answers map to objects, everything else maps to dictionaries for
            # objects to be created. Here we create those sub-objects
            serializer_class = self.fields[self.field_name].__class__
            sr = serializer_class(data=content)
            sr.is_valid(raise_exception=True)
            content = sr.Meta.model(**sr.validated_data)
        if isinstance(content, list):
            serializer_class = self.fields[self.field_name].__class__
            sr = serializer_class(data=content, child=AnswerSerializer())
            sr.is_valid(raise_exception=True)
            # content = sr.Meta.model(**sr.validated_data)
            content = None

            answers_uuids = []

            for answer_data in sr.validated_data:
                answers_uuids.append(answer_data.get('uuid', 0))
            answers_list = Answer.objects.filter(uuid__in = answers_uuids)

        self.validated_data['content'] = content
        self.validated_data.update(kwargs)
        instance = self.Meta.model(**self.validated_data)
        instance.answers_list = answers_list
        return instance


class LessonSerializer(BaseSerializer):

    class Meta:
        model = Lesson
        fields = ['uuid', 'name', 'image', 'module', 'status', 'lesson_type', 'game_slug']

    module = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    lesson_type = serializers.ChoiceField(
        source='lesson_type_name', choices=Lesson.LessonType.choices_inverse
    )
    game_slug = serializers.SlugField(source='game.slug')

    def get_module(self, obj):
        return obj.module.uuid

    def get_status(self, obj):
        return LessonProgress.Status.get_name(
            self.context['progress_service'].get_lesson_status(obj)
        ).lower()


class QuestionSerializer(BaseSerializer):
    # question_type = serializers.ChoiceField(
    #     source='question_type_name', choices=Question.QuestionType.choices_inverse
    # )
    answer_type = serializers.ChoiceField(
        source='answer_type_name', choices=Question.AnswerType.choices_inverse
    )
    choices = serializers.SerializerMethodField()
    unit_conversion = serializers.SerializerMethodField()
    lesson = LessonSerializer()
    vectors = VectorSerializer(many=True)

    def get_unit_conversion(self, obj):
        if obj.answer_type == Question.AnswerType.UNIT_CONVERSION:
            try:
                answer = obj.answers.all()[0]
            except IndexError:
                return None

            if type(answer.content) == UnitConversion:
                return UnitConversionSerializer(answer.content).data

        return None

    def get_choices(self, obj):
        if obj.answer_type == Question.AnswerType.MULTIPLE_CHOICE \
                or obj.answer_type == Question.AnswerType.MULTISELECT_CHOICE:
            return AnswerSerializer(obj.answers, many=True).data

    class Meta:
        model = Question
        fields = [
            'uuid', 'text', 'hint', 'image', 'vectors', 'answer_type', 'choices', # 'question_type',
            'lesson', 'unit_conversion'
        ]


class ProfileUserField(serializers.RelatedField):
    def to_representation(self, value):
        return '%s %s' % (value.user.first_name, value.user.last_name)


class ScoreBoardSerializer(serializers.ModelSerializer):
    row_num = serializers.IntegerField(read_only=True)
    profile = ProfileUserField(read_only=True)

    class Meta:
        model = LessonProgress
        fields = ['score', 'duration', 'profile', 'row_num']


class ModuleSerializer(ExpanderSerializerMixin, BaseSerializer):

    class Meta:
        model = Module
        fields = [
            'uuid', 'name', 'image', 'lesson_count', 'lesson_completed_count', 'status',
        ]
        expandable_fields = {
            'lessons': (LessonSerializer, (), {'many': True}),
        }

    lesson_count = serializers.IntegerField(source='lessons.count')
    lesson_completed_count = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    def get_lesson_completed_count(self, obj):
        count = 0
        for lesson in obj.lessons.all():
            if (self.context['progress_service'].get_lesson_status(lesson) ==
                    LessonProgress.Status.COMPLETE):
                count += 1
        return count

    def get_status(self, obj):
        lesson_statuses = {
            self.context['progress_service'].get_lesson_status(lesson)
            for lesson in obj.lessons.all()
        }
        sequential_check = [
            LessonProgress.Status.NEW,
            LessonProgress.Status.UNLOCKED,
            LessonProgress.Status.LOCKED,
            LessonProgress.Status.COMPLETE,
        ]
        for status in sequential_check:
            if status in lesson_statuses:
                break
        return LessonProgress.Status.get_name(status).lower()


class UnitSerializer(ExpanderSerializerMixin, BaseSerializer):

    class Meta:
        model = Unit
        fields = ['uuid', 'name', 'image']
        expandable_fields = {
            'modules': (ModuleSerializer, (), {'many': True}),
        }


class CurriculumSerializer(ExpanderSerializerMixin, BaseSerializer):

    class Meta:
        model = Curriculum
        fields = ['uuid', 'name']
        expandable_fields = {
            'units': (UnitSerializer, (), {'many': True}),
        }


# class LessonProgressSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = LessonProgress
#         fields = ['score']
#
#
# class TextSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Text
#         fields = ['text']
#
#
# class MathematicalExpressionSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = MathematicalExpression
#         fields = ['representation']
#
#
# class VectorSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Vector
#         fields = ['magnitude', 'angle', 'x_component', 'y_component']
#
#
# class AnswerSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Answer
#         fields = ['uuid']
#
#     uuid = serializers.CharField()
#
#
# class UserResponseSerializer(serializers.ModelSerializer):
#
#     CONTENT_SERIALIZER_MAP = {
#         Text.__name__.lower(): TextSerializer,
#         Vector.__name__.lower(): VectorSerializer,
#         Answer.__name__.lower(): AnswerSerializer,
#         MathematicalExpression.__name__.lower(): MathematicalExpressionSerializer,
#     }
#
#     class Meta:
#         model = UserResponse
#         fields = ['question', 'content_type', 'content', 'is_correct', 'answered_on']
#
#     content = serializers.SerializerMethodField()
#
#     def get_content(self, obj):
#         return self.CONTENT_SERIALIZER_MAP[obj.content.__class__.__name__.lower()](obj.content).data
