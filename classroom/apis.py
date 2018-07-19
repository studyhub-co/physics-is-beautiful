from django.db.models import Q
from django.db.models import Count

from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions

from .models import Classroom, Assignment, ClassroomStudent
from .permissions import IsClassroomTeacherOrStudent
from .serializers import ClassroomSerializer, ClassroomStudentSerializer


class ClassroomViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsClassroomTeacherOrStudent)
    serializer_class = ClassroomSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Classroom.objects.\
            filter(Q(teacher__user=self.request.user) | Q(students__user=self.request.user)).\
            annotate(count_students=Count('students'))

    def perform_create(self, serializer):
        serializer.save(teacher__user=self.request.user)


class ClassroomStudentViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsClassroomTeacherOrStudent)
    serializer_class = ClassroomStudentSerializer
    # lookup_field = 'uuid'

    def get_queryset(self):
        return ClassroomStudent.objects.filter(student__user=self.request.user)

    def perform_create(self, serializer):
        # TODO check ID of room
        serializer.save(student__user=self.request.user)

