from rest_framework import serializers

from curricula.models import Curriculum, Unit, Module, Lesson, Game, Question, Answer

from curricula.serializers import BaseSerializer, UserSerializer


class PublicCurriculumSerializer(BaseSerializer):
    # author = serializers.SerializerMethodField()
    author = UserSerializer(read_only=True)
    number_of_learners = serializers.IntegerField(read_only=True, source='number_of_learners_denormalized')
    count_lessons = serializers.IntegerField(read_only=True)

    # def get_author(self, obj):
    #     return obj.author.display_name

    class Meta:
        model = Curriculum
        fields = ['uuid', 'name', 'image', 'number_of_learners', 'url', 'author', 'count_lessons', 'created_on',
                  'updated_on', 'cover_photo', 'description']
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


# TODO refactor this
class PublicUnitSerializer(BaseSerializer):

    class Meta:
        model = Unit
        fields = ['uuid', 'name', 'image', 'position', 'url', 'curriculum']
        read_only_fields = ('uuid', 'modules', 'image')
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


class PublicModuleSerializer(BaseSerializer):

    class Meta:
        model = Module
        fields = ['uuid', 'name', 'image', 'position', 'url']
        read_only_fields = ('uuid', 'modules', 'image')
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


class PublisLessonSerializer(BaseSerializer):

    class Meta:
        model = Lesson
        fields = ['uuid', 'name', 'image', 'position', 'url']
        read_only_fields = ('uuid', 'modules', 'image')
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


class PublicQuestionSerializer(BaseSerializer):

    class Meta:
        model = Question
        fields = ['uuid', 'text', 'image', 'position', 'url']
        read_only_fields = ('uuid', 'modules', 'image')
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
