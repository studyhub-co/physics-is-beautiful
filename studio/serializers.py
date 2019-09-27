import json

from collections import OrderedDict

from django.db.models import F
from django.core.files.images import get_image_dimensions

from rest_framework import serializers
from rest_framework.fields import empty

# from tagging.models import Tag
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)

from expander import ExpanderSerializerMixin

from curricula.models import Curriculum, Unit, Module, Lesson, Game, Question, Answer
from curricula.models import Vector, ImageWText, MathematicalExpression, UnitConversion, Text, MySQL
from curricula.serializers import BaseSerializer, UserSerializer

from profiles.serializers import PublicProfileSerializer
from profiles.models import Profile


class DictSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        # FIXME bad approach, can't use prefetch_related with it
        return OrderedDict([(d['uuid'], d) for d in super().to_representation(data)])

    @property
    def data(self):
        return super(serializers.ListSerializer, self).data


class SimpleModuleSerializer(BaseSerializer):

    unit = serializers.CharField(source='unit.uuid')

    class Meta:
        model = Module
        list_serializer_class = DictSerializer
        fields = ['uuid', 'name', 'image', 'position', 'unit', 'url']
        read_only_fields = ('uuid', 'curriculum')
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


# TODO not use?
class AnswerContentField(serializers.Field):
    def to_representation(self, obj):
        if isinstance(obj, ImageWText):
            img_field = serializers.ImageField()
            return {'image': img_field.to_representation(obj.image),
                    'text': obj.text}
        return 'UNKNOWN'


class AnswerSerializer(BaseSerializer):

    question = serializers.CharField(source='question.uuid')

    def __init__(self, *args, **kwargs):
        self.answer_type = kwargs.pop('answer_type', None)
        super().__init__(*args, **kwargs)

    def validate_question(self, value):
        return Question.objects.get(uuid=value)

    def _fix_question(self, validated_data):
        if 'question' in validated_data and isinstance(validated_data['question'], dict):
            validated_data['question'] = validated_data['question']['uuid']

    def update(self, instance, validated_data):
        self._fix_question(validated_data)
        content_data = validated_data.pop('content', None)
        if content_data:
            content = instance.content
            for k, v in content_data.items():
                setattr(instance.content, k, v)
            if instance.question.answer_type == Question.AnswerType.MYSQL:
                # model level validation
                from django.core.exceptions import ValidationError
                try:
                    content.clean()
                except ValidationError as e:
                    raise serializers.ValidationError(e.message_dict)
            content.save()
        ret = super().update(instance, validated_data)
        if ret.question and ret.question.answer_type == Question.AnswerType.MULTIPLE_CHOICE and ret.is_correct:
            ret.question.answers.exclude(id=ret.id).update(is_correct=False)

        return ret

    def create(self, validated_data):
        self._fix_question(validated_data)
        self.answer_type = validated_data['question'].answer_type

        if 'content' in validated_data:
            # TODO it seems we don't use this code at all, answers are created in question PATCH query (except choices)
            if self.answer_type in (Question.AnswerType.MULTIPLE_CHOICE, Question.AnswerType.MULTISELECT_CHOICE):
                validated_data['content'] = ImageWText.objects.create(**validated_data['content'])
            elif self.answer_type == Question.AnswerType.MATHEMATICAL_EXPRESSION:
                validated_data['content'] = MathematicalExpression.objects.create(**validated_data['content'])
            elif self.answer_type == Question.AnswerType.TEXT:
                validated_data['content'] = Text.objects.create(**validated_data['content'])
            elif self.answer_type == Question.AnswerType.MYSQL:
                validated_data['content'] = MySQL.objects.create(**validated_data['content'])
            elif self.answer_type == Question.AnswerType.VECTOR or self.answer_type == Question.AnswerType.NULLABLE_VECTOR:
                validated_data['content'] = Vector.objects.create(**validated_data['content'])
            elif self.answer_type == Question.AnswerType.UNIT_CONVERSION:
                validated_data['content'] = UnitConversion.objects.create(**validated_data['content'])
        else:  # create an empty choice answer
            if self.answer_type in (Question.AnswerType.MULTIPLE_CHOICE, Question.AnswerType.MULTISELECT_CHOICE):
                validated_data['content'] = ImageWText.objects.create()
        ret = super().create(validated_data)
        if hasattr(self, '_fields'):
            del self._fields
        return ret

    def get_fields(self):
        fields = super().get_fields()
        if self.answer_type in (Question.AnswerType.MULTIPLE_CHOICE, Question.AnswerType.MULTISELECT_CHOICE) or \
           (self.instance and isinstance(self.instance, Answer) and isinstance(self.instance.content, ImageWText)):
            fields['image'] = serializers.ImageField(source='content.image', required=False, allow_empty_file=True, allow_null=True)
            fields['text'] = serializers.CharField(source='content.text', allow_blank=True)
        elif self.answer_type == Question.AnswerType.MATHEMATICAL_EXPRESSION or \
        (self.instance and isinstance(self.instance, Answer) and isinstance(self.instance.content, MathematicalExpression)):
            fields['representation'] = serializers.CharField(source='content.representation')
        elif self.answer_type == Question.AnswerType.TEXT or \
        (self.instance and isinstance(self.instance, Answer) and isinstance(self.instance.content, Text)):
            fields['text'] = serializers.CharField(source='content.text', allow_blank=True)
        elif self.answer_type == Question.AnswerType.MYSQL or \
        (self.instance and isinstance(self.instance, Answer) and isinstance(self.instance.content, MySQL)):
            fields['text'] = serializers.CharField(source='content.text', allow_blank=False)
            fields['schema_SQL'] = serializers.CharField(source='content.schema_SQL', allow_blank=False)
            # TODO we need to hide query_SQL info for non author of the course/curriculum
            fields['query_SQL'] = serializers.CharField(source='content.query_SQL', allow_blank=True)
            fields['schema_is_valid'] = serializers.BooleanField(source='content.schema_is_valid', read_only=True)
        elif self.answer_type == Question.AnswerType.VECTOR or self.answer_type == Question.AnswerType.NULLABLE_VECTOR or \
        self.answer_type == Question.AnswerType.VECTOR_COMPONENTS or \
        (self.instance and isinstance(self.instance, Answer) and isinstance(self.instance.content, Vector)):
            fields['magnitude'] = serializers.FloatField(source='content.magnitude', allow_null=True)
            fields['angle'] = serializers.FloatField(source='content.angle', allow_null=True)
            fields['x_component'] = serializers.FloatField(source='content.x_component', allow_null=True)
            fields['y_component'] = serializers.FloatField(source='content.y_component', allow_null=True)
        elif self.answer_type == Question.AnswerType.UNIT_CONVERSION or \
        (self.instance and isinstance(self.instance, Answer) and isinstance(self.instance.content, UnitConversion)):
            fields['unit_conversion_type'] = serializers.ChoiceField(source='content.unit_conversion_type',
                                                                     choices=UnitConversion.UnitConversionTypes)
            fields['question_number'] = serializers.FloatField(source='content.question_number')
            fields['question_unit'] = serializers.CharField(source='content.question_unit', max_length=100)
            fields['answer_number'] = serializers.FloatField(source='content.answer_number')
            fields['answer_unit'] = serializers.CharField(source='content.answer_unit', max_length=100)
            fields['conversion_steps'] = serializers.JSONField(source='content.conversion_steps')
            fields['is_consistent'] = serializers.BooleanField(source='content.is_consistent', read_only=True)

        return fields

    class Meta:
        model = Answer
        list_serializer_class = DictSerializer
        fields = ['uuid', 'question', 'position', 'is_correct']


class VectorListSerializer(serializers.ListSerializer):
    def get_value(self, dictionary):
        if self.field_name not in dictionary:
            return empty
        else:
            return super().get_value(dictionary)


class VectorSerializer(BaseSerializer):

    class Meta:
        model = Vector
        fields = ['x_component', 'y_component']
        list_serializer_class = VectorListSerializer


class AnswersField(serializers.Field):
    def get_attribute(self, obj):
        return obj

    def to_representation(self, obj):
        s = AnswerSerializer(many=True, answer_type=obj.answer_type)
        return s.to_representation(obj.answers.all())

    def to_internal_value(self, data):
        return Answer.objects.filter(uuid__in=json.loads(data), question__isnull=True)


class QuestionSerializer(BaseSerializer):
    lesson = serializers.CharField(source='lesson.uuid')

    answers = AnswersField(required=False)
    vectors = VectorSerializer(many=True, required=False)
    tags = TagListSerializerField(read_only=True)

    def validate_lesson(self, value):
        return Lesson.objects.get(uuid=value)

    def update(self, instance, validated_data):
        if 'lesson' in validated_data:
            validated_data['lesson'] = validated_data['lesson']['uuid']

        if 'position' in validated_data and instance.position != validated_data['position']:
            Question.objects.filter(position__gte=validated_data['position'],
                                    lesson=validated_data.get('lesson', instance.lesson)).update(position=F('position')+1)
        if 'vectors' in validated_data:
            instance.vectors.all().delete()
            for v in validated_data['vectors']:
                instance.vectors.add(Vector.objects.create(**v))
            del validated_data['vectors']

        new_answers = validated_data.pop('answers', None)

        updated = super().update(instance, validated_data)
        if new_answers:
            updated.answers.all().delete()
            new_answers.update(question=updated)
        return updated

    def create(self, validated_data):
        validated_data['lesson'] = validated_data['lesson']['uuid']
        vectors = validated_data.pop('vectors', [])
        new_question = super().create(validated_data)
        for v in vectors:
            new_question.vectors.add(Vector.objects.create(**v))
        return new_question

    class Meta:
        model = Question
        fields = ['uuid', 'lesson', 'text', 'solution_text', 'hint', 'image', 'position', 'answer_type', 'answers',
                  'vectors', 'tags']
        list_serializer_class = DictSerializer


class LessonSerializer(BaseSerializer):

    module = serializers.CharField(source='module.uuid')

    questions = QuestionSerializer(many=True, read_only=True)

    game_type = serializers.CharField(source='game.slug', required=False)

    def validate_module(self, value):
        return Module.objects.get(uuid=value)

    def update(self, instance, validated_data):
        if 'module' in validated_data:
            validated_data['module'] = validated_data['module']['uuid']
        if 'position' in validated_data and instance.position != validated_data['position']:
            Lesson.objects.filter(position__gte=validated_data['position'],
                                  module=validated_data.get('module', instance.module)).update(position=F('position')+1)
        if 'lesson_type' in validated_data and validated_data['lesson_type'] == Lesson.LessonType.GAME:
            Game.objects.get_or_create(lesson=instance, defaults={'slug': 'unit-conversion'})
        if 'game' in validated_data:
            for k,v in validated_data.pop('game').items():
                setattr(instance.game, k, v)
                instance.game.save()

        return super().update(instance, validated_data)

    def create(self, validated_data):
        validated_data['module'] = validated_data['module']['uuid']
        new_lesson = super().create(validated_data)
        Question.objects.create(lesson=new_lesson, text='New question')  # create new empty quetion for new lesson
        return new_lesson

    class Meta:
        model = Lesson
        list_serializer_class = DictSerializer
        fields = ['uuid', 'module', 'name', 'image', 'position', 'lesson_type', 'game_type', 'url', 'questions']
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


class MiniLessonSerializer(LessonSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop('questions')


class ModuleSerializer(TaggitSerializer, BaseSerializer):
    lessons = MiniLessonSerializer(many=True, read_only=True)
    tags = TagListSerializerField(read_only=True)

    unit = serializers.CharField(source='unit.uuid')
    curriculum = serializers.CharField(source='unit.curriculum.uuid', read_only=True)

    def validate_unit(self, value):
        return Unit.objects.get(uuid=value)

    def update(self, instance, validated_data):
        if 'unit' in validated_data:
            validated_data['unit'] = validated_data['unit']['uuid']
        if 'position' in validated_data and instance.position != validated_data['position']:
            Module.objects.filter(position__gte=validated_data['position'],
                                  unit=validated_data.get('unit', instance.unit)).update(position=F('position')+1)
        return super().update(instance, validated_data)

    def create(self, validated_data):
        validated_data['unit'] = validated_data['unit']['uuid']
        return super().create(validated_data)

#    curriculum = serializers.CharField(read_only=True, source='unit.curriculum.uuid')

    class Meta:
        model = Module
        fields = ['uuid', 'name', 'image', 'position', 'unit', 'curriculum', 'url', 'lessons', 'tags'] #, 'curriculum']
        read_only_fields = ('uuid', )
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


class UnitSerializer(TaggitSerializer, ExpanderSerializerMixin, BaseSerializer):
    modules = SimpleModuleSerializer(many=True, read_only=True)
    tags = TagListSerializerField(read_only=True)

    curriculum = serializers.CharField(source='curriculum.uuid')

    def validate_curriculum(self, value):
        return Curriculum.objects.get(uuid=value)

    def update(self, instance, validated_data):
        if 'curriculum' in validated_data:
            validated_data['curriculum'] = validated_data['curriculum']['uuid']
        if 'position' in validated_data and instance.position != validated_data['position']:
            Unit.objects.filter(
                position__gte=validated_data['position'],
                curriculum=validated_data.get('curriculum', instance.curriculum)
            ).update(position=F('position')+1)

        return super().update(instance, validated_data)

    def create(self, validated_data):
        validated_data['curriculum'] = validated_data['curriculum']['uuid']
        return super().create(validated_data)

    class Meta:
        model = Unit
        list_serializer_class = DictSerializer
        fields = ['uuid', 'name', 'image', 'position', 'url', 'curriculum', 'modules', 'tags']
        read_only_fields = ('uuid', 'modules')
        expandable_fields = {
            'modules': (ModuleSerializer, (), {'many': True}),
        }
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


# class TagSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Tag
#         fields = ['name']

class CurriculumSerializer(TaggitSerializer, ExpanderSerializerMixin, BaseSerializer):
    units = UnitSerializer(many=True, read_only=True)
    # tags = TagSerializer(many=True, read_only=True)
    tags = TagListSerializerField(read_only=True)
    author = UserSerializer(read_only=True)
    collaborators = PublicProfileSerializer(many=True, read_only=True)
    collaborators_ids = serializers.SlugRelatedField(queryset=Profile.objects.all(), source='collaborators',
                                                     slug_field='id', many=True, write_only=True,
                                                     style={'base_template': 'input.html'}
                                                     )
    count_lessons = serializers.IntegerField(read_only=True)
    number_of_learners = serializers.IntegerField(read_only=True, source='number_of_learners_denormalized')

    def validate_name(self, value):
        if value and value.lower() == Curriculum.Name.DEFAULT.lower():
            raise serializers.ValidationError("Invalid name: %s" % value)
        return value

    def validate_cover_photo(self, value):
        w, h = get_image_dimensions(value)
        if value:
            if round(w / h, 1) != 2.7:
                raise serializers.ValidationError("Invalid aspect ratio (2.7 : 1)")
        return value

    def update(self, instance, validated_data):
        # TODO Do we need to save collaborators while create curriculum?
        try:
            instance.collaborators = validated_data.pop('collaborators')
        except KeyError:
            pass

        if 'name' in validated_data and self.instance.name == Curriculum.Name.DEFAULT:
            del validated_data['name']
        return super().update(instance, validated_data)

    class Meta:
        model = Curriculum
        list_serializer_class = DictSerializer
        fields = ['uuid', 'name', 'image', 'url', 'units', 'created_on', 'updated_on', 'count_lessons', 'author',
                  'cover_photo', 'number_of_learners', 'description', 'collaborators', 'collaborators_ids',
                  'setting_units_unlocked', 'setting_modules_unlocked', 'setting_lessons_unlocked',
                  'setting_publically', 'tags'
                  ]
        read_only_fields = ('uuid', 'units', 'created_on', 'updated_on')
        expandable_fields = {
            'units': (UnitSerializer, (), {'many': True}),
        }
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
