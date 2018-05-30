from collections import OrderedDict

from django.db.models import F

from rest_framework import serializers
from rest_framework.fields import empty

from expander import ExpanderSerializerMixin

from curricula.models import Curriculum, Unit, Module, Lesson, Question, Answer
from curricula.models import ImageWText

from curricula.serializers import BaseSerializer


class DictSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        return OrderedDict([(d['uuid'], d) for d in super().to_representation(data)])

    @property
    def data(self):
        return super(serializers.ListSerializer, self).data

    

class LessonSerializer(BaseSerializer):

    module = serializers.CharField(source='module.uuid')

    questions = serializers.SerializerMethodField()

    def get_questions(self, lesson):
        return list(lesson.questions.values_list('uuid', flat=True))
    
    def validate_module(self, value):
        return Module.objects.get(uuid=value)

    def update(self, instance, validated_data):
        if 'module' in validated_data:
            validated_data['module'] = validated_data['module']['uuid']
        if 'position' in validated_data and instance.position != validated_data['position']:
            Lesson.objects.filter(position__gte=validated_data['position'],
                                  module_id=instance.module_id).update(position=F('position')+1)
        return super().update(instance, validated_data)

    def create(self, validated_data):
        validated_data['module'] = validated_data['module']['uuid']
        return super().create(validated_data)

    class Meta:
        model = Lesson
        list_serializer_class = DictSerializer
        fields = ['uuid', 'module', 'name', 'image', 'position', 'lesson_type', 'url', 'questions']
        extra_kwargs = {
            'url' : {'lookup_field' : 'uuid'}
        }


class SimpleModuleSerializer(BaseSerializer):

    unit = serializers.CharField(source='unit.uuid')
    
    class Meta:
        model = Module
        list_serializer_class = DictSerializer
        fields = ['uuid', 'name', 'image', 'position', 'unit', 'url']
        read_only_fields = ('uuid', 'curriculum')
        extra_kwargs = {
            'url' : {'lookup_field' : 'uuid'}
        }

class ModuleSerializer(BaseSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    unit = serializers.CharField(source='unit.uuid')
    curriculum = serializers.CharField(source='unit.curriculum.uuid')
    
    def validate_unit(self, value):
        return Unit.objects.get(uuid=value)

    def update(self, instance, validated_data):
        if 'unit' in validated_data:
            validated_data['unit'] = validated_data['unit']['uuid']
        if 'position' in validated_data and instance.position != validated_data['position']:
            Module.objects.filter(position__gte=validated_data['position'],
                                  unit_id=instance.unit_id).update(position=F('position')+1)
        return super().update(instance, validated_data)

    def create(self, validated_data):
        validated_data['unit'] = validated_data['unit']['uuid']
        return super().create(validated_data)

#    curriculum = serializers.CharField(read_only=True, source='unit.curriculum.uuid')

    class Meta:
        model = Module
        fields = ['uuid', 'name', 'image', 'position', 'unit', 'curriculum', 'url', 'lessons'] #, 'curriculum']
        read_only_fields = ('uuid', )
        extra_kwargs = {
            'url' : {'lookup_field' : 'uuid'}
        }
    

class UnitSerializer(ExpanderSerializerMixin, BaseSerializer):
    modules = SimpleModuleSerializer(many=True, read_only=True)
    
    curriculum = serializers.CharField(source='curriculum.uuid')

    
    def validate_curriculum(self, value):
        return Curriculum.objects.get(uuid=value)

    def update(self, instance, validated_data):
        if 'curriculum' in validated_data:
            validated_data['curriculum'] = validated_data['curriculum']['uuid']
        return super().update(instance, validated_data)

    def create(self, validated_data):
        validated_data['curriculum'] = validated_data['curriculum']['uuid']
        return super().create(validated_data)
    
    class Meta:
        model = Unit
        list_serializer_class = DictSerializer
        fields = ['uuid', 'name', 'image', 'position', 'url', 'curriculum', 'modules']
        read_only_fields = ('uuid', 'modules')        
        expandable_fields = {
            'modules': (ModuleSerializer, (), {'many': True}),
        }
        extra_kwargs = {
            'url' : {'lookup_field' : 'uuid'}
        }
        

class CurriculumSerializer(ExpanderSerializerMixin, BaseSerializer):
    units = UnitSerializer(many=True, read_only=True)

    class Meta:
        model = Curriculum
        list_serializer_class = DictSerializer
        fields = ['uuid', 'name', 'image', 'url', 'units']
        read_only_fields = ('uuid', 'units')
        expandable_fields = {
            'units': (UnitSerializer, (), {'many': True}),
        }
        extra_kwargs = {
            'url' : {'lookup_field' : 'uuid'}
        }



class AnswerContentField(serializers.Field):
    def to_representation(self, obj):
        if isinstance(obj, ImageWText):
            img_field = serializers.ImageField()
            return {'image' : img_field.to_representation(obj.image),
                    'text' : obj.text}
        return 'UNKNOWN'
      
class AnswerSerializer(BaseSerializer):

    question = serializers.CharField(source='question.uuid')
    
    def __init__(self, *args, **kwargs):
        self.answer_type = kwargs.pop('answer_type', None)
        super().__init__(*args, **kwargs)
    
    def validate_question(self, value):
        return Question.objects.get(uuid=value)

    def _fix_question(self, validated_data):
        if 'question' in validated_data:
            validated_data['question'] = validated_data['question']['uuid']
    
    def update(self, instance, validated_data):
        self._fix_question(validated_data)
        content_data = validated_data.pop('content', None)
        if content_data:
            content = instance.content
            for k, v in content_data.items():
                setattr(instance.content, k, v)
            content.save()
        ret = super().update(instance, validated_data)
        if ret.question and ret.question.answer_type == Question.AnswerType.MULTIPLE_CHOICE and ret.is_correct:
            ret.question.answers.exclude(id=ret.id).update(is_correct=False)
       
        return ret

    def create(self, validated_data):
        self._fix_question(validated_data)
        self.answer_type = validated_data['question'].answer_type
        if self.answer_type in (Question.AnswerType.MULTIPLE_CHOICE, Question.AnswerType.MULTISELECT_CHOICE):
            validated_data['content'] = ImageWText.objects.create(text='New answer')            
        ret =  super().create(validated_data)
        if hasattr(self, '_fields'):
            del self._fields
        return ret

    def get_fields(self):
        fields = super().get_fields()
        if self.answer_type in (Question.AnswerType.MULTIPLE_CHOICE, Question.AnswerType.MULTISELECT_CHOICE) or \
           (self.instance and isinstance(self.instance, Answer) and isinstance(self.instance.content, ImageWText)):
            fields['image'] = serializers.ImageField(source='content.image')
            fields['text'] = serializers.CharField(source='content.text')
            
        return fields
    
    class Meta:
        model = Answer
        list_serializer_class = DictSerializer
        fields = ['uuid', 'question', 'position', 'is_correct']

    
        
    
class QuestionSerializer(BaseSerializer):
    lesson = serializers.CharField(source='lesson.uuid')

    answers = serializers.SerializerMethodField()
    
    def get_answers(self, obj):
        s = AnswerSerializer(many=True, answer_type=obj.answer_type)
        return s.to_representation(obj.answers.all())

    def validate_lesson(self, value):
        return Lesson.objects.get(uuid=value)

    def update(self, instance, validated_data):
        if 'lesson' in validated_data:
            validated_data['lesson'] = validated_data['lesson']['uuid']
        return super().update(instance, validated_data)

    def create(self, validated_data):
        validated_data['lesson'] = validated_data['lesson']['uuid']
        return super().create(validated_data)

    
    class Meta:
        model = Question
        fields = ['uuid', 'lesson', 'text',  'hint', 'image', 'position', 'answer_type', 'answers']



        