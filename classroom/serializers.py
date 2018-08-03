from rest_framework import serializers
from rest_framework.fields import empty

from .models import Classroom, Assignment, ClassroomStudent

from curricula.models import Curriculum

from profiles.serializers import PublicProfileSerializer
from curricula.serializers import SimpleCurriculumSerializer, CurriculumSerializer


class ClassroomSerializer(serializers.ModelSerializer):
    less_students = PublicProfileSerializer(many=True, read_only=True)
    count_students = serializers.IntegerField(read_only=True)
    teacher = PublicProfileSerializer(read_only=True)
    # curriculum = SimpleCurriculumSerializer(read_only=True)
    curriculum = CurriculumSerializer(read_only=True)
    # TODO limit to my Curricula
    curriculum_uuid = serializers.SlugRelatedField(queryset=Curriculum.objects.all(), source='curriculum',
                                                   slug_field='uuid',  write_only=True)

    class Meta:
        model = Classroom
        fields = ['uuid', 'name', 'created_on', 'updated_on', 'curriculum', 'code', 'less_students', 'count_students',
                  'teacher', 'curriculum_uuid']
        read_only_fields = ('uuid', 'code')


# class ClassroomStudentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ClassroomStudent
#         # list_serializer_class = DictSerializer
#         fields = ['code_entered_on', 'leave_on', 'student', 'classroom']
#         read_only_fields = ('code_entered_on', 'classroom', 'student')
