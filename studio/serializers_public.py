from rest_framework import serializers

from courses.models import Course, Unit, Module, Lesson, Game, Material

from .serializers import BaseSerializer, UserSerializer


class PublicCourseSerializer(BaseSerializer):
    # author = serializers.SerializerMethodField()
    author = UserSerializer(read_only=True)
    number_of_learners = serializers.IntegerField(read_only=True, source='number_of_learners_denormalized')
    count_lessons = serializers.IntegerField(read_only=True)

    # def get_author(self, obj):
    #     return obj.author.display_name

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


class PublisLessonSerializer(BaseSerializer):

    class Meta:
        model = Lesson
        fields = ['uuid', 'name', 'image', 'position', 'url', 'created_on', 'updated_on']
        read_only_fields = ('uuid', 'questions', 'image')
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


class PublicQuestionSerializer(BaseSerializer):
    lesson = PublisLessonSerializer(read_only=True)

    class Meta:
        model = Material
        fields = ['uuid', 'text', 'image', 'position', 'url', 'created_on', 'updated_on', 'lesson']
        read_only_fields = ('uuid', 'image')
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
