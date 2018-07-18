from rest_framework import serializers
from rest_framework.fields import empty

from .models import Classroom, Assignment, ClassroomStudent


class ClassroomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Classroom
        # list_serializer_class = DictSerializer
        fields = ['uuid', 'name', 'image', 'url', 'units']
        read_only_fields = ('uuid', 'units')
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


class ClassroomStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassroomStudent
        # list_serializer_class = DictSerializer
        fields = ['code_entered_on', 'leave_on', 'student', 'classroom']
        read_only_fields = ('code_entered_on', 'classroom', 'student')
