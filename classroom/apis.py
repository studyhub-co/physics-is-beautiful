from django.db.models import Q
from django.db.models import Count

from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound

from profiles.models import Profile

from .models import Classroom, Assignment, ClassroomStudent
from .permissions import IsClassroomTeacherOrStudentReadonly, IsAssignmentClassroomTeacherOrStudentReadonly
from .serializers import ClassroomSerializer, AssignmentSerializer, AssignmentListSerializer, ClassroomListSerializer,\
    StudentProfileSerializer


class SeparateListObjectSerializerMixin:
    def get_serializer_class(self):
        if self.action == 'list':
            return self.list_serializer_class
        if self.action in ('retrieve', 'partial_update', 'iupdate'):
            return self.serializer_class
        return self.list_serializer_class


class ClassroomViewSet(SeparateListObjectSerializerMixin, ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsClassroomTeacherOrStudentReadonly)
    serializer_class = ClassroomSerializer
    list_serializer_class = ClassroomListSerializer
    queryset = Classroom.objects.all().select_related('curriculum')
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
    except Classroom.DoesNotExist:
        raise NotFound()

    # check ther user not if classrom
    if ClassroomStudent.objects.filter(student=request.user.profile, classroom=classroom).count() == 0:
        # add current user to classroom as student
        ClassroomStudent.objects.create(student=request.user.profile, classroom=classroom)

    serializer = ClassroomSerializer(classroom)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def leave_classroom(request):
    try:
        classroom = Classroom.objects.get(uuid=request.data.get('uuid', ''))
    except Classroom.DoesNotExist:
        raise NotFound()

    ClassroomStudent.objects.filter(student=request.user.profile, classroom=classroom).delete()

    # fixme to reduce data we can return simple uuid
    serializer = ClassroomSerializer(classroom)

    return Response(serializer.data)


class AssignmentViewSet(SeparateListObjectSerializerMixin, ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsAssignmentClassroomTeacherOrStudentReadonly)
    serializer_class = AssignmentSerializer
    list_serializer_class = AssignmentListSerializer
    queryset = Assignment.objects.all()
    lookup_field = 'uuid'

    def get_queryset(self):
        queryset = self.queryset.filter(classroom__uuid=self.kwargs['classroom_uuid']).prefetch_related('lessons')
        queryset = queryset.annotate(count_lessons=Count('lessons'))
        return queryset


class StudentProfileViewSet(GenericViewSet):
    # queryset = Profile.objects.all()
    lookup_field = 'username'
    # serializer_class = StudentProfileSerializer

    @action(methods=['get'], detail=True, permission_classes=[])
    def profile(self, request, classroom_uuid, username=None):
        """
        urls like /api/v1/classroom/:classroomuuid/students/:username/profile/
        """
        user_id = username.replace('user', '')
        profile = Profile.objects.get(user__pk=user_id)

        # TODO count for current classroom assignment progress
        # queryset = queryset.annotate(count_lessons=Count('lessons'))
        serializer = StudentProfileSerializer(profile, many=False)
        return Response(serializer.data)

    @action(methods=['get'], detail=False, permission_classes=[])
    def assignments(self, classroom_uuid, request, pk=None):
        """
        urls like /api/v1/classroom/:classroomuuid/students/:username/assignments/
        """
        # TODO get all assignments and add AssignmentProgress data for current user
        pass



