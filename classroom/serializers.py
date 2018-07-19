from rest_framework import serializers
from rest_framework.fields import empty

from .models import Classroom, Assignment, ClassroomStudent

from profiles.serializers import ProfileSerializer
from curricula.serializers import SimpleCurriculumSerializer


class ClassroomSerializer(serializers.ModelSerializer):
    less_students = ProfileSerializer(many=True, read_only=True)
    count_students = serializers.IntegerField()
    teacher = ProfileSerializer(read_only=True)
    curriculum = SimpleCurriculumSerializer()

    class Meta:
        model = Classroom
        fields = ['uuid', 'name', 'created_on', 'updated_on', 'curriculum', 'code', 'less_students', 'count_students',
                  'teacher']
        read_only_fields = ('uuid', 'code', 'count_students')


class ClassroomStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassroomStudent
        # list_serializer_class = DictSerializer
        fields = ['code_entered_on', 'leave_on', 'student', 'classroom']
        read_only_fields = ('code_entered_on', 'classroom', 'student')
