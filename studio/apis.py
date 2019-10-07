from django.db.models import Q, Count

from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from courses.models import Course, Unit, Module, Lesson, Material

from .serializers import CourseSerializer, UnitSerializer, \
    ModuleSerializer, LessonSerializer, MaterialSerializer

from .permissions import IsOwnerOrCollaboratorBase, IsUnitOwnerOrCollaborator, \
    IsModuleOwnerOrCollaborator, \
    IsLessonOwnerOrCollaborator, IsMaterialOwnerOrCollaborator


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

