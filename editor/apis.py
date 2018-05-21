from rest_framework.viewsets import ModelViewSet

from curricula.models import Curriculum, Unit, Module, Lesson

from editor.serializers import CurriculumSerializer, UnitSerializer, ModuleSerializer, LessonSerializer

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

"""    
    def get_queryset(self):
        return Module.objects.filter(unit__uuid=self.kwargs['unit_uuid'])

    def perform_create(self, serializer):
        unit = Unit.objects.get(uuid=self.kwargs['unit_uuid'])
        serializer.save(unit=unit)
"""
    
class LessonViewSet(ModelViewSet):
    serializer_class = LessonSerializer
    lookup_field = 'uuid'
    queryset = Lesson.objects.all()

"""
    def get_queryset(self):
        return Lesson.objects.filter(module__uuid=self.kwargs['module_uuid'])

    def perform_create(self, serializer):
        module = Module.objects.get(uuid=self.kwargs['module_uuid'])
        serializer.save(module=module)
"""
