from rest_framework.viewsets import ModelViewSet

from curricula.models import Curriculum, Unit, Module, Lesson, Question, Answer

from editor.serializers import CurriculumSerializer, UnitSerializer, ModuleSerializer, LessonSerializer, QuestionSerializer, AnswerSerializer

class CurriculumViewSet(ModelViewSet):

    serializer_class = CurriculumSerializer
    queryset = Curriculum.objects.all()
    lookup_field = 'uuid'


class UnitViewSet(ModelViewSet):

    serializer_class = UnitSerializer
    lookup_field = 'uuid'
    queryset = Unit.objects.all()

class ModuleViewSet(ModelViewSet):
    serializer_class = ModuleSerializer
    lookup_field = 'uuid'
    queryset = Module.objects.all()

    
class LessonViewSet(ModelViewSet):
    serializer_class = LessonSerializer
    lookup_field = 'uuid'
    queryset = Lesson.objects.all()


class QuestionViewSet(ModelViewSet):
    serializer_class = QuestionSerializer
    lookup_field = 'uuid'
    queryset = Question.objects.all()

class AnswerViewSet(ModelViewSet):
    serializer_class = AnswerSerializer
    lookup_field = 'uuid'
    queryset = Answer.objects.all()
