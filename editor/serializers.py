from rest_framework import serializers
from expander import ExpanderSerializerMixin

from curricula.models import Curriculum, Unit, Module, Lesson, Question, Answer
from curricula.serializers import BaseSerializer


class LessonSerializer(BaseSerializer):

    class Meta:
        model = Lesson
        fields = ['uuid', 'name', 'image', 'position', 'lesson_type', 'url']
        extra_kwargs = {
            'url' : {'lookup_field' : 'uuid'}
        }


class SimpleModuleSerializer(BaseSerializer):

    class Meta:
        model = Module
        fields = ['uuid', 'name', 'image', 'position', 'unit', 'url']
        read_only_fields = ('uuid', )
        extra_kwargs = {
            'url' : {'lookup_field' : 'uuid'}
        }

class ModuleSerializer(BaseSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    unit = serializers.CharField(write_only=True)
    
    def validate_unit(self, value):
        return Unit.objects.get(uuid=value)

    curriculum = serializers.CharField(read_only=True, source='unit.curriculum.uuid')
    
    class Meta:
        model = Module
        fields = ['uuid', 'name', 'image', 'position', 'unit', 'url', 'lessons', 'curriculum']
        read_only_fields = ('uuid', )
        extra_kwargs = {
            'url' : {'lookup_field' : 'uuid'}
        }
    

class UnitSerializer(ExpanderSerializerMixin, BaseSerializer):
    modules = SimpleModuleSerializer(many=True, read_only=True)
    
    curriculum = serializers.CharField(write_only=True)

    
    def validate_curriculum(self, value):
        return Curriculum.objects.get(uuid=value)
              
    
    class Meta:
        model = Unit
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
        fields = ['uuid', 'name', 'image', 'url', 'units']
        read_only_fields = ('uuid', 'units')
        expandable_fields = {
            'units': (UnitSerializer, (), {'many': True}),
        }
        extra_kwargs = {
            'url' : {'lookup_field' : 'uuid'}
        }

