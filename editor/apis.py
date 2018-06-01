from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from rest_framework import permissions

from curricula.models import Curriculum, Unit, Module, Lesson, Question, Answer

from editor.serializers import MiniCurriculumSerializer, CurriculumSerializer, UnitSerializer, ModuleSerializer, LessonSerializer, QuestionSerializer, AnswerSerializer

from editor.permissions import IsOwnerBase, IsUnitOwner, IsModuleOwner, IsLessonOwner, IsQuestionOwner, IsAnswerOwner

class OthersCurriculaView(ListAPIView):
    serializer_class = MiniCurriculumSerializer
    def get_queryset(self):
        return Curriculum.objects.exclude(author=self.request.user)

class CurriculumViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsOwnerBase)    
    serializer_class = CurriculumSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Curriculum.objects.filter(author=self.request.user)
    
    def perform_create(self, serializer):
        new_curriculum = serializer.save(author=self.request.user)

        if 'prototype' in self.request.data and self.request.data['prototype'] is not None:
            prototype = Curriculum.objects.get(uuid=self.request.data['prototype'])
            prototype.clone(new_curriculum)
    
    
class UnitViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsUnitOwner)
    serializer_class = UnitSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Unit.objects.filter(curriculum__author=self.request.user)

    
class ModuleViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsModuleOwner)
    serializer_class = ModuleSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Module.objects.filter(unit__curriculum__author=self.request.user)

    
class LessonViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsLessonOwner)
    serializer_class = LessonSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Lesson.objects.filter(module__unit__curriculum__author=self.request.user)
   
class QuestionViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsQuestionOwner)
    serializer_class = QuestionSerializer
    lookup_field = 'uuid'
    
    def get_queryset(self):
        return Question.objects.filter(lesson__module__unit__curriculum__author=self.request.user)

    
class AnswerViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsAnswerOwner)
    serializer_class = AnswerSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Answer.objects.filter(question__lesson__module__unit__curriculum__author=self.request.user)
