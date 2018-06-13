from django.db.models import Q

from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from rest_framework import permissions

from curricula.models import Curriculum, Unit, Module, Lesson, Question, Answer

from editor.serializers import MiniCurriculumSerializer, CurriculumSerializer, UnitSerializer, ModuleSerializer, LessonSerializer, QuestionSerializer, AnswerSerializer

from editor.permissions import IsOwnerOrCollaboratorBase, IsUnitOwnerOrCollaborator, IsModuleOwnerOrCollaborator, IsLessonOwnerOrCollaborator, IsQuestionOwnerOrCollaborator, IsAnswerOwnerOrCollaborator

class AllCurriculaView(ListAPIView):
    serializer_class = MiniCurriculumSerializer
    def get_queryset(self):
        return Curriculum.objects.all()

class CurriculumViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrCollaboratorBase)    
    serializer_class = CurriculumSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Curriculum.objects.filter(Q(author=self.request.user)|Q(collaborators=self.request.user))
    
    def perform_create(self, serializer):
        new_curriculum = serializer.save(author=self.request.user)

        if 'prototype' in self.request.data and self.request.data['prototype']:
            prototype = Curriculum.objects.get(uuid=self.request.data['prototype'])
            prototype.clone(new_curriculum)
    
    
class UnitViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsUnitOwnerOrCollaborator)
    serializer_class = UnitSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Unit.objects.filter(Q(curriculum__author=self.request.user)|Q(curriculum__collaborators=self.request.user))

    
class ModuleViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsModuleOwnerOrCollaborator)
    serializer_class = ModuleSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Module.objects.filter(Q(unit__curriculum__author=self.request.user)|Q(unit__curriculum__collaborators=self.request.user))

    
class LessonViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsLessonOwnerOrCollaborator)
    serializer_class = LessonSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Lesson.objects.filter(Q(module__unit__curriculum__author=self.request.user)|Q(module__unit__curriculum__collaborators=self.request.user))
   
class QuestionViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsQuestionOwnerOrCollaborator)
    serializer_class = QuestionSerializer
    lookup_field = 'uuid'
    
    def get_queryset(self):
        return Question.objects.filter(Q(lesson__module__unit__curriculum__author=self.request.user)|Q(lesson__module__unit__curriculum__collaborators=self.request.user))

    
class AnswerViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsAnswerOwnerOrCollaborator)
    serializer_class = AnswerSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Answer.objects.filter(Q(question__lesson__module__unit__curriculum__author=self.request.user)|Q(question__lesson__module__unit__curriculum__collaborators=self.request.user))
