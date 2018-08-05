from django.db import transaction

from rest_framework import serializers

from .models import Classroom, Assignment

from curricula.models import Curriculum, Lesson

from profiles.serializers import PublicProfileSerializer
from curricula.serializers import SimpleCurriculumSerializer, CurriculumSerializer, LessonSerializer


class ClassroomSerializer(serializers.ModelSerializer):
    less_students = PublicProfileSerializer(many=True, read_only=True)
    count_students = serializers.IntegerField(read_only=True)
    teacher = PublicProfileSerializer(read_only=True)
    # curriculum = SimpleCurriculumSerializer(read_only=True)
    curriculum = CurriculumSerializer(read_only=True)
    curriculum_uuid = serializers.SlugRelatedField(queryset=Curriculum.objects.all(), source='curriculum',
                                                   slug_field='uuid',  write_only=True)

    class Meta:
        model = Classroom
        fields = ['uuid', 'name', 'created_on', 'updated_on', 'curriculum', 'code', 'less_students', 'count_students',
                  'teacher', 'curriculum_uuid']
        read_only_fields = ('uuid', 'code', 'created_on', 'updated_on')


class AssignmentListSerializer(serializers.ModelSerializer):
    lessons_uuids = serializers.SlugRelatedField(queryset=Lesson.objects.all(), source='lessons',
                                                 slug_field='uuid', many=True, write_only=True)
    # classroom = ClassroomSerializer(read_only=True)
    classroom_uuid = serializers.SlugRelatedField(queryset=Classroom.objects.all(), source='classroom',
                                                  slug_field='uuid', write_only=True)

    count_lessons = serializers.IntegerField(read_only=True)

    def create(self, validated_data):
        lessons = validated_data.pop('lessons')
        with transaction.atomic():
            assignment = Assignment.objects.create(**validated_data)
            assignment.lessons = lessons
            assignment.save()
        return assignment

    def update(self, instance, validated_data):
        lessons = validated_data.pop('lessons')

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        with transaction.atomic():
            instance.lessons.clear()
            instance.lessons = lessons
            instance.save()
        return instance

    class Meta:
        model = Assignment
        fields = ['uuid', 'name', 'created_on', 'updated_on', 'start_on', 'due_on',
                  'classroom_uuid', 'lessons_uuids', 'count_lessons']
        read_only_fields = ('uuid', 'created_on', 'updated_on')


class AssignmentSerializer(AssignmentListSerializer):
    lessons = LessonSerializer(read_only=True, many=True)

    class Meta(AssignmentListSerializer.Meta):
        fields = AssignmentListSerializer.Meta.fields + ['lessons']
