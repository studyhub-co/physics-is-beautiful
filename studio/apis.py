import json

from django.db.models import Q, Count
from django.db import transaction

from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from courses.models import Course, Unit, Module, Lesson, Material, MaterialProblemType, \
    SANDOX_TEMPLATE_REACT_JSON_STRING

from .serializers import CourseSerializer, UnitSerializer, ModuleSerializer, \
    LessonSerializer, MaterialSerializer, MaterialMaterialProblemTypeSerializer

from .permissions import IsOwnerOrCollaboratorBase, IsUnitOwnerOrCollaborator, \
    IsModuleOwnerOrCollaborator, IsLessonOwnerOrCollaborator, IsMaterialOwnerOrCollaborator,\
    IsMaterialProblemTypeAuthor


# TODO add pagiantion to api views! or block load listview for Units/Lessons at least

class TagAddRemoveViewMixin(object):
    # @action(methods=['POST', 'DELETE'],
    #         detail=True,
    #         permission_classes=[IsOwnerOrCollaboratorBase, ], )
    def tags(self, request, *args, **kwargs):
        tagret_object = self.get_object()
        if request.method == 'POST':
            # create tag
            new_tag = request.data.get('tag', None)
            if not new_tag:
                raise ValidationError('tag is not present')
            tagret_object.tags.add(new_tag)
            return Response({'tag': new_tag}, status=status.HTTP_201_CREATED)
        if request.method == 'DELETE':
            to_delete_tag = request.data.get('tag', None)
            if not to_delete_tag:
                raise ValidationError('tag is not present')
            tagret_object.tags.remove(to_delete_tag)
            return Response({'tag': to_delete_tag}, status=status.HTTP_204_NO_CONTENT)


class CourseViewSet(ModelViewSet, TagAddRemoveViewMixin):
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrCollaboratorBase)    
    serializer_class = CourseSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        profile = self.request.user.profile
        return Course.objects.filter(Q(author=profile) | Q(collaborators=profile)). \
               select_related('author'). \
               prefetch_related('units__modules', 'units__tags').\
               annotate(count_lessons=Count('units__modules__lessons', distinct=True))

    def perform_create(self, serializer):
        new_course = serializer.save()
        # new_course = serializer.save(author=self.request.user.profile)

        if 'prototype' in self.request.data and self.request.data['prototype']:
            prototype = Course.objects.get(uuid=self.request.data['prototype'])
            prototype.clone(new_course)

    @action(methods=['POST', 'DELETE'],
            detail=True,
            permission_classes=[IsOwnerOrCollaboratorBase, ], )
    def tags(self, request, *args, **kwargs):
        return super(CourseViewSet, self).tags(request, args, kwargs)

    class Meta:
        ordering = ['-published_on']

    
class UnitViewSet(ModelViewSet, TagAddRemoveViewMixin):
    permission_classes = (permissions.IsAuthenticated, IsUnitOwnerOrCollaborator)
    serializer_class = UnitSerializer
    lookup_field = 'uuid'

    def create(self, request, *args, **kwargs):
        if 'prototype' in self.request.data and self.request.data['prototype']:
            prototype = Unit.objects.get(uuid=self.request.data['prototype'])
            copied_unit = prototype.clone(Course.objects.get(uuid=self.request.data['course']))

            return Response(UnitSerializer(copied_unit, context={'request': request}).data, status=status.HTTP_201_CREATED)
        else:
            return super().create(request, *args, **kwargs)

    @action(methods=['POST', 'DELETE'],
            detail=True,
            permission_classes=[IsUnitOwnerOrCollaborator, ], )
    def tags(self, request, *args, **kwargs):
        return super(UnitViewSet, self).tags(request, args, kwargs)

    def get_queryset(self):
        return Unit.objects.filter(Q(course__author=self.request.user.profile) |
                                   Q(course__collaborators=self.request.user.profile)). \
                                   prefetch_related('tags').\
                                   distinct()

    
class ModuleViewSet(ModelViewSet, TagAddRemoveViewMixin):
    permission_classes = (permissions.IsAuthenticated, IsModuleOwnerOrCollaborator)
    serializer_class = ModuleSerializer
    lookup_field = 'uuid'

    def create(self, request, *args, **kwargs):
        if 'prototype' in self.request.data and self.request.data['prototype']:
            prototype = Module.objects.get(uuid=self.request.data['prototype'])
            copied_module = prototype.clone(Unit.objects.get(uuid=self.request.data['unit']))

            return Response(ModuleSerializer(copied_module, context={'request': request}).data, status=status.HTTP_201_CREATED)
        else:
            return super().create(request, *args, **kwargs)

    @action(methods=['POST', 'DELETE'],
            detail=True,
            permission_classes=[IsModuleOwnerOrCollaborator, ], )
    def tags(self, request, *args, **kwargs):
        return super(ModuleViewSet, self).tags(request, args, kwargs)

    def get_queryset(self):
        return Module.objects.filter(Q(unit__course__author=self.request.user.profile) |
                                     Q(unit__course__collaborators=self.request.user.profile)).\
                                     prefetch_related('tags', 'lessons').\
                                     distinct()

    
class LessonViewSet(ModelViewSet, TagAddRemoveViewMixin):
    permission_classes = (permissions.IsAuthenticated, IsLessonOwnerOrCollaborator)
    serializer_class = LessonSerializer
    lookup_field = 'uuid'

    def create(self, request, *args, **kwargs):
        if 'prototype' in self.request.data and self.request.data['prototype']:
            prototype = Lesson.objects.get(uuid=self.request.data['prototype'])
            copied_lesson = prototype.clone(Module.objects.get(uuid=self.request.data['module']))

            return Response(
                LessonSerializer(copied_lesson, context={'request': request}).data, status=status.HTTP_201_CREATED
            )
        else:
            return super().create(request, *args, **kwargs)

    @action(methods=['POST', 'DELETE'],
            detail=True,
            permission_classes=[IsLessonOwnerOrCollaborator, ], )
    def tags(self, request, *args, **kwargs):
        return super(LessonViewSet, self).tags(request, args, kwargs)

    def get_queryset(self):
        return Lesson.objects.filter(Q(module__unit__course__author=self.request.user.profile) |
                                     Q(module__unit__course__collaborators=self.request.user.profile)) \
            .prefetch_related('materials__tags') \
            .distinct()
            # .prefetch_related('questions__tags', 'questions__vectors')\


class MaterialViewSet(ModelViewSet, TagAddRemoveViewMixin):
    permission_classes = (permissions.IsAuthenticated, IsMaterialOwnerOrCollaborator)
    serializer_class = MaterialSerializer
    lookup_field = 'uuid'

    def create(self, request, *args, **kwargs):
        if 'prototype' in self.request.data and self.request.data['prototype']:
            prototype = Material.objects.get(uuid=self.request.data['prototype'])
            copied_material = prototype.clone(Lesson.objects.get(uuid=self.request.data['lesson']))

            return Response(MaterialSerializer(copied_material, context={'request': request}).data,
                            status=status.HTTP_201_CREATED)
        else:
            return super().create(request, *args, **kwargs)

    @action(methods=['POST', 'DELETE'],
            detail=True,
            permission_classes=[IsMaterialOwnerOrCollaborator, ], )
    def tags(self, request, *args, **kwargs):
        return super(MaterialViewSet, self).tags(request, args, kwargs)

    def get_queryset(self):
        return Material.objects.filter(Q(lesson__module__unit__course__author=self.request.user.profile) |
                                       Q(lesson__module__unit__course__collaborators=self.request.user.profile)).\
                                distinct()


class MaterialProblemTypeViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsMaterialProblemTypeAuthor)
    serializer_class = MaterialMaterialProblemTypeSerializer
    queryset = MaterialProblemType.objects.\
        select_related('author__user').\
        prefetch_related('modules__author__user').all()
    # permission_classes = [IsAuthenticated|ReadOnly]
    lookup_field = 'uuid'

    def create_new_from_json(self, request, *args, **kwargs):
        data = json.loads(SANDOX_TEMPLATE_REACT_JSON_STRING, strict=False)
        from pib_auth.models import User
        superuser = User.objects.filter(is_superuser=True).first()
        # TODO check profile
        if superuser:
            author = superuser.profile
        else:
            author = request.user.profile

        # data['name'] = 'Material problem type name'
        data['name'] = 'New'  # don't chage 'new' slug!

        serializer = self.serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            instance = serializer.save_from_tree_data(author=author)
            return instance

    # override RetrieveModelMixin
    def retrieve(self, request, *args, **kwargs):
        if 'uuid' in kwargs and kwargs['uuid'] == 'new':
            # get or create 'new' sandbox skeleton
            try:
                instance = self.queryset.get(slug='new')
            except MaterialProblemType.DoesNotExist:
                instance = self.create_new_from_json(request)
        else:
            # regular instance
            instance = self.get_object()
        instance = self.queryset.get(slug='new')
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    # @transaction.atomic
    # TODO rewrite with SQL
    def clone_sanbox(self):
        # clone sandbox
        initial_sandbox = self.get_object()

        initial_modules = initial_sandbox.modules.all()
        initial_directories = initial_sandbox.directories.all()

        # clone sandbox
        initial_sandbox.pk = None
        initial_sandbox.save()

        new_old_dir_pks = {}

        # clone directories
        for directory in initial_directories:
            old_dir_pk = directory.pk

            directory.pk = None
            directory.sandbox = initial_sandbox
            directory.save()
            new_dir_pk = directory.pk

            new_old_dir_pks[old_dir_pk] = new_dir_pk

        # resave parent
        for dir in initial_sandbox.directories.all():
            if directory.directory:
                directory.directory_id = new_old_dir_pks[directory.directory_id]
                directory.save()

        # clone modules
        for module in initial_modules:
            module.pk = None
            module.sandbox = initial_sandbox

            if module.directory:
                module.directory_id = new_old_dir_pks[module.directory_id]

            module.save()

        return initial_sandbox

    # fork sandbox/MaterialProblemType
    @action(methods=['POST'],
            detail=True,
            permission_classes=[permissions.IsAuthenticated, ], )
    def fork(self, request, *args, **kwargs):

        forked_material_problem_type = self.clone_sanbox()

        # if kwargs['uuid'] == 'new':
        #
        #     data = json.loads(SANDOX_TEMPLATE_REACT_JSON_STRING, strict=False)
        #     # TODO check profile
        #     data['author'] = request.user.profile.pk
        #     data['name'] = 'Material problem type name'
        #
        #     serializer = self.serializer_class(data=data)
        #     if serializer.is_valid(raise_exception=True):
        #         serializer.save()
        #
        #         return Response(serializer.data)
        #
        #     # data = json.loads(SANDOX_TEMPLATE_REACT_JSON_STRING, strict=False)
        #     # data['name'] = 'Material problem type name'
        #     # data['author'] = request.user.profile
        #
        #     # modules = data.pop('modules')
        #     # forked_material_problem_type = self.queryset.create(**data)
        #     # forked_material_problem_type.modules.set(modules)
        #
        #     # forked_material_problem_type = self.queryset.create(
        #     #     name='Material problem type name',
        #     #     author=request.user.profile,  # TODO create profile getter
        #     #     data=json.loads(SANDOX_TEMPLATE_REACT_JSON_STRING, strict=False)
        #     # )
        # else:
        #     # TODO get base sandbox
        #     pass

        serializer = self.get_serializer(forked_material_problem_type)
        return Response(serializer.data)

