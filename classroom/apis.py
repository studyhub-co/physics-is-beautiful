from django.db.models import Q
from django.db.models import Count

from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound


from .models import Classroom, Assignment, ClassroomStudent
from .permissions import IsClassroomTeacherOrStudent
from .serializers import ClassroomSerializer


class ClassroomViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsClassroomTeacherOrStudent)
    serializer_class = ClassroomSerializer
    queryset = Classroom.objects.all()
    lookup_field = 'uuid'

    def get_queryset(self):

        queryset = self.queryset. \
                annotate(count_students=Count('students'))

        filter_by = self.request.query_params.get('filter', None)

        if filter_by in ('as_student', 'as_teacher') and self.request.user.is_authenticated():
            if filter_by == 'as_student':
                queryset = queryset.filter(students__user=self.request.user)
            elif filter_by == 'as_teacher':
                queryset = queryset.filter(teacher__user=self.request.user)
        else:
            queryset = queryset. \
                filter(Q(teacher__user=self.request.user) | Q(students__user=self.request.user))

        return queryset

    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user.profile)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def join_classroom(request):
    try:
        classroom = Classroom.objects.get(code=request.data.get('code', ''))
        # todo join
    except Classroom.DoesNotExist:
        raise NotFound()

    return classroom
