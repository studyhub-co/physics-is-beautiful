from django.db.models import Q, Count

from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, status, mixins, viewsets
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound
from rest_framework.parsers import MultiPartParser, JSONParser

from piblib.drf.views_set_mixins import SeparateListObjectSerializerMixin

from courses.models import Course, Unit, Module, Lesson, Material, MaterialProblemType, \
    MaterialProblemTypeSandboxCache, JsonDataImage
    # SANDOX_TEMPLATE_REACT_JSON_STRING,

from ..serializers import CourseSerializer, UnitSerializer, ModuleSerializer, \
    LessonSerializer, MaterialSerializer, MaterialProblemTypeSerializer, \
    MaterialProblemTypeSandboxCacheSerializer, MaterialProblemTypeSandboxModuleSerializer, \
    MaterialListSerializer, JsonDataImageSerializer


from ..permissions import IsOwnerOrCollaboratorBase, IsUnitOwnerOrCollaborator, \
    IsModuleOwnerOrCollaborator, IsLessonOwnerOrCollaborator, IsMaterialOwnerOrCollaborator,\
    IsMaterialProblemTypeAuthor


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10


# TODO add pagination to api views! or block load listview for Units/Lessons at least
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


class MaterialViewSet(ModelViewSet, TagAddRemoveViewMixin, SeparateListObjectSerializerMixin):
    permission_classes = (permissions.IsAuthenticated, IsMaterialOwnerOrCollaborator)
    serializer_class = MaterialSerializer
    list_serializer_class = MaterialListSerializer
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

    @action(methods=['POST'],
            detail=True,
            permission_classes=[IsMaterialOwnerOrCollaborator, ], )
    def set_material_problem_type(self, request, *args, **kwargs):
        material = self.get_object()
        try:
            material_problem_type = MaterialProblemType.objects.get(uuid=request.data.get('uuid', None))
        except MaterialProblemType.DoesNotExist:
            raise NotFound('material_problem_type not found')

        material.material_problem_type = material_problem_type
        material.save()

        serializer = self.serializer_class(material, context={'request': request})

        return Response(serializer.data)

    def get_queryset(self):
        return Material.objects.filter(Q(lesson__module__unit__course__author=self.request.user.profile) |
                                       Q(lesson__module__unit__course__collaborators=self.request.user.profile)).\
                                distinct()


# class MaterialProblemTypeViewSet(ModelViewSet):
class MaterialProblemTypeViewSet(mixins.RetrieveModelMixin,
                                 mixins.UpdateModelMixin,
                                 mixins.ListModelMixin,
                                 # MaterialTypeModulesMixin,
                                 viewsets.GenericViewSet,
                                 ):
    parser_classes = [MultiPartParser, JSONParser]
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsMaterialProblemTypeAuthor)
    pagination_class = StandardResultsSetPagination
    serializer_class = MaterialProblemTypeSerializer
    serializer_class_cache = MaterialProblemTypeSandboxCacheSerializer
    # serializer_class_module = MaterialProblemTypeSandboxModuleSerializer
    queryset = MaterialProblemType.objects.\
        select_related('author__user__profile'). \
        prefetch_related('modules__author__user__profile',
                         'directories',
                         'modules'
                         ).all()
    # permission_classes = [IsAuthenticated|ReadOnly]
    lookup_field = 'uuid'

    # def create_new_from_json(self, request, *args, **kwargs):
    #     data = json.loads(SANDOX_TEMPLATE_REACT_JSON_STRING, strict=False)
    #     from pib_auth.models import User
    #     superuser = User.objects.filter(is_superuser=True).first()
    #     if superuser:
    #         author = superuser.profile
    #     else:
    #         author = request.user.profile
    #
    #     # data['name'] = 'Material problem type name'
    #     # fixme - not good, if we remove object with 'new' slug,
    #     #  this will create new objects with new-2, new-3, etc...
    #     #   create fixtures
    #     data['name'] = 'New'  # don't chage 'new' slug!
    #
    #     serializer = self.serializer_class(data=data)
    #     if serializer.is_valid(raise_exception=True):
    #         instance = serializer.save_from_tree_data(author=author,
    #                                                   official=True)
    #         return instance

    # override RetrieveModelMixin
    def retrieve(self, request, *args, **kwargs):
        if 'uuid' in kwargs and kwargs['uuid'] == 'new':
            # get or create 'new' sandbox skeleton
            try:
                instance = self.queryset.get(slug='new')
            except MaterialProblemType.DoesNotExist:
                assert False, 'You need to create a sanbdox with "new" slug berofe using this app! ' \
                              '(manage.py loaddata from fixtures)'
                # instance = self.create_new_from_json(request)
        else:
            # regular instance
            instance = self.get_object()
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
        # based on https://docs.djangoproject.com/en/2.2/topics/db/queries/#copying-model-instances
        initial_sandbox.pk = None
        initial_sandbox.uuid = None
        initial_sandbox.official = False
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
        for directory in initial_sandbox.directories.all():
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

        serializer = self.get_serializer(forked_material_problem_type)
        return Response(serializer.data)

    @action(methods=['POST'],
            detail=True,
            permission_classes=[permissions.IsAuthenticated, ], )
    # TODO check problem type owner permission
    def cache(self, request, *args, **kwargs):
        # save transpiled data

        # get version
        version = request.data.get('version', None)
        if not version:
            raise ValidationError('version field not found')

        sandbox = self.get_object()

        try:
            # try to get existing cache
            cache = MaterialProblemTypeSandboxCache.objects.get(
                version=version,
                sandbox=sandbox.pk
            )
            serializer = self.serializer_class_cache(cache, data=request.data)
        except MaterialProblemTypeSandboxCache.DoesNotExist:
            # data = {'sandbox': sandbox.pk}
            # data.update(request.data)
            # serializer = self.serializer_class_cache(data=data)
            serializer = self.serializer_class_cache(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(sandbox=sandbox)

        return Response(serializer.data)


# material JSONData media store
class MaterialImageViewSet(ModelViewSet):
    queryset = JsonDataImage.objects.all()
    serializer_class = JsonDataImageSerializer
