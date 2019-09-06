from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from expander import ExpanderSerializerMixin

from django.contrib.auth import get_user_model

from .models import (
    Curriculum, Unit, Module, Lesson, Question, Answer, UserResponse, LessonProgress, Vector, MathematicalExpression,
    UnitConversion, ImageWText, Text, MySQL
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
            print(self.Meta.model.objects.get(**{self.lookup_field: data}))
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


class TextSerializer(BaseSerializer):

    class Meta:
        model = Text
        fields = ['text']


class MySQLQuestionSerializer(BaseSerializer):

    class Meta:
        model = MySQL
        fields = ['schema_SQL', 'schema_SQL_json']


class MySQLAnswerSerializer(BaseSerializer):
    class Meta:
        model = MySQL
        fields = ['query_SQL', 'schema_SQL_json',]


class MySQLAnswerReturnedSerializer(BaseSerializer):
    class Meta:
        model = MySQL
        fields = ['query_SQL', 'expected_output_json']


class AnswerSerializer(BaseSerializer):

    CONTENT_SERIALIZER_MAP = {
        Vector.__name__.lower(): VectorSerializer,
        MathematicalExpression.__name__.lower(): MathematicalExpressionSerializer,
        UnitConversion.__name__.lower(): UnitConversionSerializer,
        ImageWText.__name__.lower(): ImageWithTextSerializer,
        Text.__name__.lower(): TextSerializer,
        MySQL.__name__.lower(): MySQLAnswerReturnedSerializer,
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
            'question', 'vector',  'mathematical_expression', 'unit_conversion', 'text', 'my_sql',
            'profile',
            'answer', 'answers_list',
            'answered_on'
        ]
        extra_kwargs = {'profile': {'required': False}}

    vector = VectorSerializer(required=False)
    mathematical_expression = MathematicalExpressionSerializer(required=False)
    text = TextSerializer(required=False)
    my_sql = MySQLAnswerSerializer(required=False)
    # multiple or multi select field
    answer = AnswerSerializer(required=False)
    answers_list = AnswerSerializer(required=False, many=True)
    unit_conversion = UnitConversionSerializer(required=False)

    def validate_answer(self, value):
        return Answer.objects.get(uuid=value['uuid'])

    def validate(self, data):
        # fields is the list of fields from above, with values as serializers, eg. {'vector': VectorSerializer()... }
        fields = set(self.fields.keys()) - {'question', 'profile', 'answered_on'}
        # Filter the provided fields (data.keys()) by unioning with the allowed fields (fields) to get, e.g. {'answer'}
        provided_fields = set(data.keys()) & fields
        # Only one answer type (provided field) should be specified. E.g. can't have both a vector and unit conversion
        if len(provided_fields) != 1:
            raise ValidationError('Must specify exactly one of ({})'.format(', '.join(fields)))
        # Define a new property called field_name why?
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
            answers_list = Answer.objects.filter(uuid__in=answers_uuids)

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
        if 'progress_service' in self.context:
            return LessonProgress.Status.get_name(
                self.context['progress_service'].get_lesson_status(obj)
            ).lower()
        else:
            return ''


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
    my_sql = serializers.SerializerMethodField()

    def get_unit_conversion(self, obj):
        if obj.answer_type == Question.AnswerType.UNIT_CONVERSION:
            try:
                answer = obj.answers.all()[0]
            except IndexError:
                return None

            if type(answer.content) == UnitConversion:
                return UnitConversionSerializer(answer.content).data

        return None

    def get_my_sql(self, obj):
        if obj.answer_type == Question.AnswerType.MYSQL:
            try:
                answer = obj.answers.all()[0]
            except IndexError:
                return None

            if type(answer.content) == MySQL:
                    return MySQLQuestionSerializer(answer.content).data

            return None

    def get_choices(self, obj):
        if obj.answer_type == Question.AnswerType.MULTIPLE_CHOICE \
                or obj.answer_type == Question.AnswerType.MULTISELECT_CHOICE:
            return AnswerSerializer(obj.answers, many=True).data

    class Meta:
        model = Question
        fields = [
            'uuid', 'text', 'solution_text', 'hint', 'image', 'vectors', 'answer_type', 'choices',  # 'question_type',
            'lesson', 'unit_conversion', 'thread', 'my_sql'
        ]
        read_only_fields = ('thread',)


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


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ['pk', 'display_name', 'get_absolute_url']


class CurriculumSerializer(ExpanderSerializerMixin, BaseSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Curriculum
        fields = ['uuid', 'name', 'author', 'description', 'image', 'cover_photo']
        expandable_fields = {
            'units': (UnitSerializer, (), {'many': True}),
        }


class SimpleCurriculumSerializer(ExpanderSerializerMixin, BaseSerializer):
    class Meta:
        model = Curriculum
        fields = ['uuid', 'name', 'description', 'image', 'cover_photo']


# from tagging.models import TaggedItem
# from django.urls import reverse
# from rest_framework.fields import Field
# from django.core.exceptions import MultipleObjectsReturned, ObjectDoesNotExist
#
#
# class GenericRelatedField(Field):
#     """
#     A custom field that expect object URL as input and transforms it
#     to django model instance.
#     """
#     read_only = False
#     _default_view_name = '%(model_name)s-detail'
#     lookup_field = 'pk'
#
#     def __init__(self, related_models=(), **kwargs):
#         super(GenericRelatedField, self).__init__(**kwargs)
#         self.related_models = related_models
#
#     def _get_url_basename(self, obj):
#         """ Get object URL basename """
#         format_kwargs = {
#             'app_label': obj._meta.app_label,
#             'model_name': obj._meta.object_name.lower()
#         }
#         return self._default_view_name % format_kwargs
#
#     def _get_request(self):
#         try:
#             return self.context['request']
#         except KeyError:
#             raise AttributeError('GenericRelatedField have to be initialized with `request` in context')
#
#     def to_representation(self, obj):
#         """ Serializes any object to its URL representation """
#         kwargs = {self.lookup_field: getattr(obj, self.lookup_field)}
#         request = self._get_request()
#         return request.build_absolute_uri(reverse(self._get_url_basename(obj), kwargs=kwargs))
#
#     def clear_url(self, url):
#         """ Removes domain and protocol from url """
#         if url.startswith('http'):
#             return '/' + url.split('/', 3)[-1]
#         return url
#
#     def get_model_from_resolve_match(self, match):
#         queryset = match.func.cls.queryset
#         if queryset is not None:
#             return queryset.model
#         else:
#             return match.func.cls.model
#
#     def instance_from_url(self, url):
#         url = self.clear_url(url)
#         match = reverse(url)
#         model = self.get_model_from_resolve_match(match)
#         return model.objects.get(**match.kwargs)
#
#     def to_internal_value(self, data):
#         """ Restores model instance from its URL """
#         if not data:
#             return None
#         # request = self._get_request()
#         try:
#             obj = self.instance_from_url(data)
#             model = obj.__class__
#         except (AttributeError, MultipleObjectsReturned, ObjectDoesNotExist):
#             raise serializers.ValidationError("Can`t restore object from url: %s" % data)
#         if model not in self.related_models:
#             raise serializers.ValidationError('%s object does not support such relationship' % str(obj))
#         return obj
#
#
# class TagItemSerializer(serializers.ModelSerializer):
#     object = GenericRelatedField(related_models=(Module, Lesson))
#
#     class Meta:
#         model = TaggedItem
#         fields = ['tag', 'object']
