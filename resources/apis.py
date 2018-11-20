# from django.db import transaction
#
# from django.db.models import Q, F, Count, Prefetch, Case, When, Sum, IntegerField, Value, CharField
#
# from django.utils import timezone

from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, NotAcceptable

# from profiles.models import Profile

from .models import Resource
from .serializers import ResourceBaseSerializer


class SeparateListObjectSerializerMixin:
    def get_serializer_class(self):
        if self.action == 'list':
            return self.list_serializer_class
        if self.action in ('retrieve', 'partial_update', 'update'):
            return self.serializer_class
        return self.list_serializer_class


class ResourceViewSet(SeparateListObjectSerializerMixin, ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)  # TODO add more
    serializer_class = ResourceBaseSerializer
    # list_serializer_class = ResourceListSerializer
    queryset = Resource.objects.all()
    lookup_field = 'uuid'

    # def get_queryset(self):
    #     queryset = self.queryset. \
    #             annotate(count_students=Count('students', distinct=True))
    #
    #     filter_by = self.request.query_params.get('filter', None)
    #
    #     if filter_by in ('as_student', 'as_teacher') and self.request.user.is_authenticated():
    #         if filter_by == 'as_student':
    #             queryset = queryset.filter(students=self.request.user.profile)
    #         elif filter_by == 'as_teacher':
    #             queryset = queryset.filter(teacher=self.request.user.profile)
    #     else:
    #         queryset = queryset. \
    #             filter(Q(teacher=self.request.user.profile) | Q(students=self.request.user.profile))
    #
    #     return queryset
    #
    # def perform_create(self, serializer):
    #     serializer.save(teacher=self.request.user.profile)

    # @action(methods=['POST'], detail=False, permission_classes=[permissions.IsAuthenticated, ])
    # def join(self, request):
    #     try:
    #         classroom = Classroom.objects.get(code=request.data.get('code', ''), external_classroom=None)
    #     except Classroom.DoesNotExist:
    #         raise NotFound()
    #
    #     # TODO limit max number of students in a classroom (999)
    #     # check that user not if classrom
    #     if ClassroomStudent.objects.filter(student=request.user.profile, classroom=classroom).count() == 0:
    #         # add current user to classroom as student
    #         ClassroomStudent.objects.create(student=request.user.profile, classroom=classroom)
    #     else:
    #         raise NotFound()
    #
    #     serializer = ClassroomSerializer(classroom)
    #
    #     # create AssignmentProgress for all Assignments for joined student
    #     ap_objects = []
    #
    #     for assignment in classroom.assignments.all():
    #         ap_objects.append(AssignmentProgress(student=request.user.profile, assignment=assignment))
    #
    #     # FIXME async background mode is preferable
    #     AssignmentProgress.objects.bulk_create(
    #         ap_objects
    #     )
    #
    #     AssignmentProgress.objects.recalculate_status_by_classroom(classroom, request.user.profile)
    #
    #     return Response(serializer.data)


