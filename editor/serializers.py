from collections import OrderedDict

from django.db.models import F

from rest_framework import serializers
from expander import ExpanderSerializerMixin

from curricula.models import Curriculum, Unit, Module, Lesson, Question, Answer
from curricula.serializers import BaseSerializer


class DictSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        return OrderedDict([(d['uuid'], d) for d in super().to_representation(data)])

    @property
    def data(self):
        return super(serializers.ListSerializer, self).data

    

class LessonSerializer(BaseSerializer):

    class Meta:
        model = Lesson
        list_serializer_class = DictSerializer
        fields = ['uuid', 'name', 'image', 'position', 'lesson_type', 'url']
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
            Module.objects.filter(position__gte=validated_data['position']).update(position=F('position')+1)
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

