from django.db.models import Q, Count, Max, F

from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import permissions, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
# from rest_framework.pagination import PageNumberPagination
# from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
# from rest_framework import filters
# from django_filters.rest_framework import DjangoFilterBackend
# from tagging.models import Tag

from curricula.models import Curriculum, Unit, Module, Lesson, Question, Answer, CurriculumUserDashboard

from editor.serializers import CurriculumSerializer, UnitSerializer, \
    ModuleSerializer, LessonSerializer, QuestionSerializer, AnswerSerializer

from editor.permissions import IsOwnerOrCollaboratorBase, IsUnitOwnerOrCollaborator, IsModuleOwnerOrCollaborator, \
    IsLessonOwnerOrCollaborator, IsQuestionOwnerOrCollaborator, IsAnswerOwnerOrCollaborator


class CurriculumViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrCollaboratorBase)    
    serializer_class = CurriculumSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Curriculum.objects.filter(Q(author=self.request.user)
                                         | Q(collaborators=self.request.user.profile)
                                         | Q(classroom__students__user=self.request.user)).\
               select_related('author').\
               annotate(count_lessons=Count('units__modules__lessons', distinct=True))
               # !TODO: modules, units, tags genereate too many sql queries

    def perform_create(self, serializer):
        new_curriculum = serializer.save(author=self.request.user)

        if 'prototype' in self.request.data and self.request.data['prototype']:
            prototype = Curriculum.objects.get(uuid=self.request.data['prototype'])
            prototype.clone(new_curriculum)

    @action(methods=['POST', 'DELETE'],
            detail=True,
            permission_classes=[IsOwnerOrCollaboratorBase, ],)
    def tags(self, request, uuid):
        course = self.get_object()
        if request.method == 'POST':
            # create tag
            new_tag = request.data.get('tag', None)
            if not new_tag:
                raise ValidationError('tag is not present')
            course.tags.add(new_tag)
            return Response({'tag': new_tag}, status=status.HTTP_201_CREATED)
        if request.method == 'DELETE':
            to_delete_tag = request.data.get('tag', None)
            if not to_delete_tag:
                raise ValidationError('tag is not present')
            course.tags.remove(to_delete_tag)
            return Response({'tag': to_delete_tag}, status=status.HTTP_204_NO_CONTENT)

    class Meta:
        ordering = ['-published_on']

    
class UnitViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsUnitOwnerOrCollaborator)
    serializer_class = UnitSerializer
    lookup_field = 'uuid'

    def create(self, request, *args, **kwargs):
        if 'prototype' in self.request.data and self.request.data['prototype']:
            prototype = Unit.objects.get(uuid=self.request.data['prototype'])
            copied_unit = prototype.clone(Curriculum.objects.get(uuid=self.request.data['curriculum']))

            return Response(UnitSerializer(copied_unit, context={'request': request}).data, status=status.HTTP_201_CREATED)
        else:
            return super().create(request, *args, **kwargs)

    def get_queryset(self):
        return Unit.objects.filter(Q(curriculum__author=self.request.user) |
                                   Q(curriculum__collaborators=self.request.user.profile)).distinct()

    
class ModuleViewSet(ModelViewSet):
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

    def get_queryset(self):
        return Module.objects.filter(Q(unit__curriculum__author=self.request.user) |
                                     Q(unit__curriculum__collaborators=self.request.user.profile)).distinct()

    
class LessonViewSet(ModelViewSet):
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

    def get_queryset(self):
        return Lesson.objects.filter(Q(module__unit__curriculum__author=self.request.user) |
                                     Q(module__unit__curriculum__collaborators=self.request.user.profile)).distinct()


class QuestionViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsQuestionOwnerOrCollaborator)
    serializer_class = QuestionSerializer
    lookup_field = 'uuid'

    def create(self, request, *args, **kwargs):
        if 'prototype' in self.request.data and self.request.data['prototype']:
            prototype = Question.objects.get(uuid=self.request.data['prototype'])
            copied_question = prototype.clone(Lesson.objects.get(uuid=self.request.data['lesson']))

            return Response(QuestionSerializer(copied_question, context={'request': request}).data,
                            status=status.HTTP_201_CREATED)
        else:
            return super().create(request, *args, **kwargs)
    
    def get_queryset(self):
        return Question.objects.filter(Q(lesson__module__unit__curriculum__author=self.request.user) |
                                       Q(lesson__module__unit__curriculum__collaborators=self.request.user.profile)).\
                                distinct()

    
class AnswerViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsAnswerOwnerOrCollaborator)
    serializer_class = AnswerSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Answer.objects.filter(Q(question__lesson__module__unit__curriculum__author=self.request.user) |
                                     Q(question__lesson__module__unit__curriculum__collaborators=self.request.user.profile)).\
                              distinct()
