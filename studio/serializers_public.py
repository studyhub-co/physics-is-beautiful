from rest_framework import serializers

from courses.models import Course, Unit, Module, Lesson, Material

from profiles.serializers import PublicProfileSerializer

from .serializers import BaseSerializer


class PublicCourseSerializer(BaseSerializer):
    author = PublicProfileSerializer(read_only=True)
    number_of_learners = serializers.IntegerField(read_only=True, source='number_of_learners_denormalized')
    count_lessons = serializers.IntegerField(read_only=True)

    class Meta:
        model = Course
        fields = ['uuid', 'name', 'image', 'number_of_learners', 'url', 'author', 'count_lessons', 'created_on',
                  'updated_on', 'cover_photo', 'description']
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


# TODO refactor this
class PublicUnitSerializer(BaseSerializer):

    class Meta:
        model = Unit
        fields = ['uuid', 'name', 'image', 'position', 'url', 'course', 'created_on', 'updated_on']
        read_only_fields = ('uuid', 'modules', 'image')
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


class PublicModuleSerializer(BaseSerializer):

    class Meta:
        model = Module
        fields = ['uuid', 'name', 'image', 'position', 'url', 'created_on', 'updated_on']
        read_only_fields = ('uuid', 'lessons', 'image')
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


class PublicLessonSerializer(BaseSerializer):

    class Meta:
        model = Lesson
        fields = ['uuid', 'name', 'image', 'position', 'url', 'created_on', 'updated_on']
        read_only_fields = ('uuid', 'materials', 'image')
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


class PublicMaterialSerializer(BaseSerializer):
    lesson = PublicLessonSerializer(read_only=True)

    class Meta:
        model = Material
        fields = ['uuid', 'name', 'position', 'url', 'created_on', 'updated_on', 'lesson', 'screenshot']
        read_only_fields = ('uuid', 'screenshot')
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
