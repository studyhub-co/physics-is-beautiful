from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from expander import ExpanderSerializerMixin

from django.contrib.auth import get_user_model

from .models import Course, Unit, Module, Lesson, LessonType, LessonProgress, MySQL, UserReaction, Material


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


class MySQLQuestionSerializer(BaseSerializer):

    class Meta:
        model = MySQL
        fields = ['schema_SQL', 'schema_SQL_json']


class MySQLAnswerSerializer(BaseSerializer):
    class Meta:
        model = MySQL
        fields = ['query_SQL', 'schema_SQL_json']


class MySQLAnswerReturnedSerializer(BaseSerializer):
    class Meta:
        model = MySQL
        fields = ['query_SQL', 'expected_output_json']


class UserResponseSerializer(BaseSerializer):

    class Meta:
        model = UserReaction
        # fields = [
        #     'question', 'vector', 'mathematical_expression', 'unit_conversion', 'text', 'my_sql',
        #     'profile',
        #     'answer', 'answers_list',
        #     'answered_on'
        # ]
        extra_kwargs = {'profile': {'required': False}}

    my_sql = MySQLAnswerSerializer(required=False)
    # multiple or multi select field

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
            # answers_list = Answer.objects.filter(uuid__in=answers_uuids)

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
        source='lesson_type_name', choices=LessonType
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


class MaterialSerializer(BaseSerializer):
    # unit_conversion = serializers.SerializerMethodField()
    lesson = LessonSerializer()
    my_sql = serializers.SerializerMethodField()

    def get_unit_conversion(self, obj):
        if obj.answer_type == Material.MaterialWorkflowType.UNIT_CONVERSION:
            try:
                answer = obj.answers.all()[0]
            except IndexError:
                return None

            # if type(answer.content) == UnitConversion:
            #     return UnitConversionSerializer(answer.content).data

        return None

    def get_my_sql(self, obj):
        if obj.answer_type == Material.MaterialWorkflowType.MYSQL:
            try:
                answer = obj.answers.all()[0]
            except IndexError:
                return None

            if type(answer.content) == MySQL:
                    return MySQLQuestionSerializer(answer.content).data

            return None

    class Meta:
        model = Material
        fields = [
            'uuid',
            # 'uuid', 'text', 'solution_text', 'hint', 'image', 'vectors', 'answer_type', 'choices',  # 'question_type',
            # 'lesson', 'unit_conversion', 'thread', 'my_sql'
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


class CourseSerializer(ExpanderSerializerMixin, BaseSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Course
        fields = ['uuid', 'name', 'author', 'description', 'image', 'cover_photo']
        expandable_fields = {
            'units': (UnitSerializer, (), {'many': True}),
        }


class SimpleCourseSerializer(ExpanderSerializerMixin, BaseSerializer):
    class Meta:
        model = Course
        fields = ['uuid', 'name', 'description', 'image', 'cover_photo']


