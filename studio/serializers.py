from collections import OrderedDict

from django.db.models import F
from django.db import transaction
from django.core.files.images import get_image_dimensions

from rest_framework import serializers
# from rest_framework.fields import empty

# from tagging.models import Tag
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)

from expander import ExpanderSerializerMixin

from courses.models import (
    Course, Unit, Module, Lesson, Material, MaterialProblemType, MaterialProblemTypeSandboxDirectory,
    MaterialProblemTypeSandboxModule, MaterialProblemTypeSandboxCache
)
# from courses.models import MySQL
from courses.serializers import BaseSerializer

from profiles.serializers import PublicProfileSerializer
from profiles.models import Profile


"""
Fixme:

The ListSerializer class provides the behavior for serializing and validating multiple objects at once. 
You won't typically need to use ListSerializer directly, but should instead simply pass many=True when 
instantiating a serializer.

When a serializer is instantiated and many=True is passed, a ListSerializer instance will be created. 
The serializer class then becomes a child of the parent ListSerializer
"""
class DictSerializer(serializers.ListSerializer):

    def to_representation(self, data):
        # FIXME bad approach, can't use prefetch_related with it
        return OrderedDict([(d['uuid'], d) for d in super().to_representation(data)])

    @property
    def data(self):
        return super(serializers.ListSerializer, self).data


class SimpleModuleSerializer(BaseSerializer):

    unit = serializers.CharField(source='unit.uuid')

    class Meta:
        model = Module
        list_serializer_class = DictSerializer
        fields = ['uuid', 'name', 'image', 'position', 'unit', 'url']
        read_only_fields = ('uuid', 'course')
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


# class MaterialListSerializer(DictSerializer):
# TODO its load all material now - add pagination
class MaterialListSerializer(BaseSerializer):
    lesson = serializers.CharField(source='lesson.uuid')

    def create(self, validated_data):
        validated_data['lesson'] = validated_data['lesson']['uuid']
        return super().create(validated_data)

    class Meta:
        model = Material
        fields = ['uuid', 'lesson', 'name', 'slug', 'position', 'screenshot']


class LessonSerializer(BaseSerializer):
    module = serializers.CharField(source='module.uuid')
    # materials = MaterialSerializer(many=True, read_only=True)
    materials = MaterialListSerializer(many=True, read_only=True)

    def validate_module(self, value):
        return Module.objects.get(uuid=value)

    def update(self, instance, validated_data):
        if 'module' in validated_data:
            validated_data['module'] = validated_data['module']['uuid']
        if 'position' in validated_data and instance.position != validated_data['position']:
            Lesson.objects.filter(position__gte=validated_data['position'],
                                  module=validated_data.get('module', instance.module)).update(position=F('position')+1)
        return super().update(instance, validated_data)

    def create(self, validated_data):
        validated_data['module'] = validated_data['module']['uuid']
        new_lesson = super().create(validated_data)
        # create new empty material for new lesson
        Material.objects.create(
            lesson=new_lesson,
            author=self.context['request'].user.profile,
            name='New material'
        )
        # FIXME remove Lesson Charfield
        # serializer = MaterialSerializer(
        #     data={'lesson': new_lesson}, context={'request': self.context['request']}
        # )
        # serializer.is_valid(raise_exception=True)
        # serializer.save()
        return new_lesson

    class Meta:
        model = Lesson
        list_serializer_class = DictSerializer
        fields = [
            'uuid', 'module', 'name', 'image', 'position',
            'url', 'materials'
        ]
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


class MiniLessonSerializer(LessonSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop('materials')


class ModuleSerializer(TaggitSerializer, BaseSerializer):
    lessons = MiniLessonSerializer(many=True, read_only=True)
    tags = TagListSerializerField(read_only=True)
    unit = serializers.CharField(source='unit.uuid')
    course = serializers.CharField(source='unit.course.uuid', read_only=True)

    def validate_unit(self, value):
        return Unit.objects.get(uuid=value)

    def update(self, instance, validated_data):
        if 'unit' in validated_data:
            validated_data['unit'] = validated_data['unit']['uuid']
        if 'position' in validated_data and instance.position != validated_data['position']:
            Module.objects.filter(position__gte=validated_data['position'],
                                  unit=validated_data.get('unit', instance.unit)).update(position=F('position')+1)
        return super().update(instance, validated_data)

    def create(self, validated_data):
        validated_data['unit'] = validated_data['unit']['uuid']
        return super().create(validated_data)

    class Meta:
        model = Module
        fields = ['uuid', 'name', 'image', 'position', 'unit', 'course', 'url', 'lessons', 'tags']
        read_only_fields = ('uuid', )
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


class UnitSerializer(TaggitSerializer, ExpanderSerializerMixin, BaseSerializer):
    modules = SimpleModuleSerializer(many=True, read_only=True)
    tags = TagListSerializerField(read_only=True)

    course = serializers.CharField(source='course.uuid')

    def validate_course(self, value):
        return Course.objects.get(uuid=value)

    def update(self, instance, validated_data):
        if 'course' in validated_data:
            validated_data['course'] = validated_data['course']['uuid']
        if 'position' in validated_data and instance.position != validated_data['position']:
            Unit.objects.filter(
                position__gte=validated_data['position'],
                course=validated_data.get('course', instance.course)
            ).update(position=F('position')+1)

        return super().update(instance, validated_data)

    def create(self, validated_data):
        validated_data['course'] = validated_data['course']['uuid']
        return super().create(validated_data)

    class Meta:
        model = Unit
        list_serializer_class = DictSerializer
        fields = ['uuid', 'name', 'image', 'position', 'url', 'course', 'modules', 'tags']
        read_only_fields = ('uuid', 'modules')
        expandable_fields = {
            'modules': (ModuleSerializer, (), {'many': True}),
        }
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


class CourseSerializer(TaggitSerializer, ExpanderSerializerMixin, BaseSerializer):
    units = UnitSerializer(many=True, read_only=True)
    tags = TagListSerializerField(read_only=True)
    author = PublicProfileSerializer(read_only=True)
    collaborators = PublicProfileSerializer(many=True, read_only=True)
    collaborators_ids = serializers.SlugRelatedField(queryset=Profile.objects.all(), source='collaborators',
                                                     slug_field='id', many=True, write_only=True,
                                                     style={'base_template': 'input.html'}
                                                     )
    count_lessons = serializers.IntegerField(read_only=True)
    number_of_learners = serializers.IntegerField(read_only=True, source='number_of_learners_denormalized')

    # def validate_name(self, value):
    #     if value and value.lower() == Course.Name.DEFAULT.lower():
    #         raise serializers.ValidationError("Invalid name: %s" % value)
    #     return value

    def validate_cover_photo(self, value):
        w, h = get_image_dimensions(value)
        if value:
            if round(w / h, 1) != 2.7:
                raise serializers.ValidationError("Invalid aspect ratio (2.7 : 1)")
        return value

    def update(self, instance, validated_data):
        # TODO Do we need to save collaborators while create course?
        try:
            instance.collaborators = validated_data.pop('collaborators')
        except KeyError:
            pass

        # if 'name' in validated_data and self.instance.name == Course.Name.DEFAULT:
        #     del validated_data['name']
        return super().update(instance, validated_data)

    class Meta:
        model = Course
        list_serializer_class = DictSerializer
        fields = ['uuid', 'name', 'image', 'url', 'units', 'created_on', 'updated_on', 'count_lessons', 'author',
                  'cover_photo', 'number_of_learners', 'description', 'collaborators', 'collaborators_ids',
                  'setting_units_unlocked', 'setting_modules_unlocked', 'setting_lessons_unlocked',
                  'setting_publically', 'tags', 'slug'
                  ]
        read_only_fields = ('uuid', 'units', 'created_on', 'updated_on', 'slug')
        expandable_fields = {
            'units': (UnitSerializer, (), {'many': True}),
        }
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


class MaterialProblemTypeSandboxDirectorySerializer(BaseSerializer):
    # shortid = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    id = serializers.SerializerMethodField()
    directory_shortid = serializers.SerializerMethodField()

    def get_directory_shortid(self, obj):
        if obj.directory:  # parent dir
            return obj.directory.shortid
            # return to_short_id(obj.directory.name)
            # return obj.directory.uuid
        else:
            return None

    def get_id(self, obj):
        return obj.uuid

    def get_title(self, obj):
        return obj.name

    # def get_shortid(self, obj):
    #     return to_short_id(obj.name)
        # return obj.uuid

    class Meta:
        model = MaterialProblemTypeSandboxDirectory
        # fields = '__all__'
        fields = [field.name for field in model._meta.fields]
        fields.extend(['shortid', 'title', 'id', 'directory_shortid'])
        read_only_fields = ('author', 'last_edit_user')


class MaterialProblemTypeSandboxModuleSerializer(BaseSerializer):
    directory_shortid = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    id = serializers.SerializerMethodField()
    # shortid = serializers.SerializerMethodField()
    # source_id = serializers.SerializerMethodField()

    # def get_shortid(self, obj):
    #     return to_short_id(obj.name)
    #     # return obj.uuid

    def get_id(self, obj):
        return obj.uuid

    def get_title(self, obj):
        return obj.name

    def get_directory_shortid(self, obj):
        if obj.directory:
            # return obj.directory.uuid
            # return to_short_id(obj.directory.name)
            return obj.directory.shortid
        else:
            return None

    class Meta:
        model = MaterialProblemTypeSandboxModule
        # fields = '__all__'
        fields = [field.name for field in model._meta.fields]
        fields.extend(['directory_shortid', 'title', 'id', 'shortid'])
        read_only_fields = ('author', 'last_edit_user', 'shortid')


class MaterialProblemTypeSerializer(BaseSerializer):
    directories = MaterialProblemTypeSandboxDirectorySerializer(many=True, read_only=True)
    modules = MaterialProblemTypeSandboxModuleSerializer(many=True, read_only=True)
    title = serializers.SerializerMethodField()
    id = serializers.SerializerMethodField()
    owned = serializers.SerializerMethodField()

    def get_owned(self, obj):
        if hasattr(self.context['request'].user, 'profile') and \
                self.context['request'].user.profile.id == obj.author_id \
                or self.context['request'].user.is_superuser:
            return True
        else:
            return False

    def get_id(self, obj):
        return obj.uuid

    def get_title(self, obj):
        return obj.name

    # # TODO not sure we need save_from_tree_data create_from_tree_data
    # def save_from_tree_data(self, **kwargs):
    #     assert not hasattr(self, 'save_object'), (
    #         'Serializer `%s.%s` has old-style version 2 `.save_object()` '
    #         'that is no longer compatible with REST framework 3. '
    #         'Use the new-style `.create()` and `.update()` methods instead.' %
    #         (self.__class__.__module__, self.__class__.__name__)
    #     )
    #
    #     assert hasattr(self, '_errors'), (
    #         'You must call `.is_valid()` before calling `.save()`.'
    #     )
    #
    #     assert not self.errors, (
    #         'You cannot call `.save()` on a serializer with invalid data.'
    #     )
    #
    #     # Guard against incorrect use of `serializer.save(commit=False)`
    #     assert 'commit' not in kwargs, (
    #         "'commit' is not a valid keyword argument to the 'save()' method. "
    #         "If you need to access data before committing to the database then "
    #         "inspect 'serializer.validated_data' instead. "
    #         "You can also pass additional keyword arguments to 'save()' if you "
    #         "need to set extra attributes on the saved model instance. "
    #         "For example: 'serializer.save(owner=request.user)'.'"
    #     )
    #
    #     assert not hasattr(self, '_data'), (
    #         "You cannot call `.save()` after accessing `serializer.data`."
    #         "If you need to access data before committing to the database then "
    #         "inspect 'serializer.validated_data' instead. "
    #     )
    #
    #     validated_data = dict(
    #         list(self.validated_data.items()) +
    #         list(kwargs.items())
    #     )
    #
    #     if self.instance is not None:
    #         self.instance = self.update(self.instance, validated_data)
    #         assert self.instance is not None, (
    #             '`update()` did not return an object instance.'
    #         )
    #     else:
    #         self.instance = self.create_from_tree_data(validated_data)
    #         assert self.instance is not None, (
    #             '`create()` did not return an object instance.'
    #         )
    #
    #     return self.instance

    # @transaction.atomic
    # def create_from_tree_data(self, validated_data):
    #     modules_data = self.initial_data.pop('modules')
    #     directories_data = self.initial_data.pop('directories')
    #     material_problem_type = super().create(validated_data)
    #     # material_problem_type = MaterialProblemType.objects.create(**validated_data)
    #
    #     # directory shortid / instance src dict
    #     directory_ids = {}
    #
    #     # create directories
    #     # TODO this code don't support descendants dirs
    #     for directory_data in directories_data:
    #         # directory_data['author'] = validated_data['author'].pk
    #         directory_data['name'] = directory_data['title']
    #         directory_data['sandbox'] = material_problem_type.uuid
    #         serializer = MaterialProblemTypeSandboxDirectorySerializer(data=directory_data)
    #         if serializer.is_valid(raise_exception=True):
    #             instance = serializer.save(author=material_problem_type.author)
    #             directory_ids[directory_data['shortid']] = instance
    #
    #     # create modules (and place it in directory)
    #     for module_data in modules_data:
    #         # module_data['author'] = validated_data['author'].pk
    #         module_data['name'] = module_data['title']
    #         module_data['sandbox'] = material_problem_type.uuid
    #
    #         # try to find module directory
    #         if module_data['directory_shortid']:
    #             if module_data['directory_shortid'] in directory_ids:
    #                 module_data['directory'] = directory_ids[module_data['directory_shortid']].pk
    #
    #         serializer = MaterialProblemTypeSandboxModuleSerializer(data=module_data)
    #         if serializer.is_valid(raise_exception=True):
    #             serializer.save(author=material_problem_type.author)
    #
    #     return material_problem_type

    class Meta:
        model = MaterialProblemType
        # fields = ['uuid', 'name', 'data', 'created_on', 'updated_on']
        fields = '__all__'
        read_only_fields = ('author', 'last_edit_user', 'forked_from_sandbox', 'slug')
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }


class MaterialProblemTypeSandboxCacheSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialProblemTypeSandboxCache
        # fields = '__all__'
        fields = ['version', 'data']


class MaterialSerializer(BaseSerializer):
    lesson = serializers.CharField(source='lesson.uuid')
    tags = TagListSerializerField(read_only=True)
    material_problem_type = MaterialProblemTypeSerializer(read_only=True)

    def validate_lesson(self, value):
        return Lesson.objects.get(uuid=value)

    def update(self, instance, validated_data):
        # update lesson
        if 'lesson' in validated_data:
            validated_data['lesson'] = validated_data['lesson']['uuid']

        # update postion
        if 'position' in validated_data and instance.position != validated_data['position']:
            Material.objects.filter(position__gte=validated_data['position'],
                                    lesson=validated_data.get('lesson', instance.lesson)).update(position=F('position')+1)

        return super().update(instance, validated_data)

    # def update(self, instance, validated_data):
    #     if 'lesson' in validated_data:
    #         validated_data['lesson'] = validated_data['lesson']['uuid']
    #
    #     if 'position' in validated_data and instance.position != validated_data['position']:
    #         Material.objects.filter(position__gte=validated_data['position'],
    #                                 lesson=validated_data.get('lesson', instance.lesson)).update(position=F('position')+1)
    #
    #     new_answers = validated_data.pop('answers', None)
    #
    #     updated = super().update(instance, validated_data)
    #     if new_answers:
    #         updated.answers.all().delete()
    #         new_answers.update(question=updated)
    #     return updated

    def create(self, validated_data):
        validated_data['lesson'] = validated_data['lesson']['uuid']
        return super().create(validated_data)

    class Meta:
        model = Material
        fields = ['uuid', 'lesson', 'tags', 'name', 'slug', 'material_workflow_type',
                  'material_problem_type', 'screenshot', 'position'
                  # 'hint', 'text', 'solution_text', 'hint', 'image', 'position',
                  # 'answer_type', 'answers', 'vectors',
                  ]
        # not support Meta/fields, see piblib.drf.views_set_mixins
        # list_serializer_class = DictSerializer
