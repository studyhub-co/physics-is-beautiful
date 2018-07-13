from django.db.models import Q

from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions

from .models import Classroom, Assignment
from .permissions import IsClassroomTeacherOrStudent
from .serializers import ClassroomSerializer


class ClassroomViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsClassroomTeacherOrStudent)
    serializer_class = ClassroomSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Classroom.objects.filter(Q(teacher=self.request.user) | Q(students=self.request.user))
    
    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user)
