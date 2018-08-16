import datetime

from django.db.models import Q, F, Count, Prefetch, Case, When, Sum, IntegerField

from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound

from profiles.models import Profile

from curricula.serializers import LessonSerializer

from .models import Classroom, Assignment, ClassroomStudent, AssignmentProgress
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
    queryset = Classroom.objects.all().select_related('curriculum', 'teacher').prefetch_related('students')
    lookup_field = 'uuid'

    def get_queryset(self):
        # TODO add counts for students assignments like counts assignments in profile

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


# fixme move to ClassroomViewSet
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

# fixme move to ClassroomViewSet
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

    @action(methods=['get'], detail=True, permission_classes=[])
    def first_uncompleted_lesson(self, request, classroom_uuid, uuid):
        try:
            assignment = Assignment.objects.get(uuid=uuid)
        except Assignment.DoesNotExist:
            raise NotFound('Can\'t find the assignment')

        first_uncompleted_lesson = None

        try:
            completed_lessons = assignment.assignment_progress.get(student__user=request.user).completed_lessons.all()
            for lesson in assignment.lessons.all():
                if completed_lessons.count() == 0:
                    first_uncompleted_lesson = lesson
                else:
                    for completed_lesson in completed_lessons:
                        if completed_lesson != lesson:
                            first_uncompleted_lesson = lesson
                            break
                    else:
                        continue
                break
        except AssignmentProgress.DoesNotExist:
            # create new progress
            student_profile, created = Profile.objects.get_or_create(user=request.user)
            AssignmentProgress.objects.create(
                student=student_profile,
                assignment=assignment
            )
            first_uncompleted_lesson = assignment.lessons.first()

        # find first uncompleted lesson
        if first_uncompleted_lesson is None:
            raise NotFound('Can\'t find the first uncompleted lesson')

        serializer = LessonSerializer(first_uncompleted_lesson, many=False)
        return Response(serializer.data)

    def get_queryset(self):

        queryset = self.queryset.filter(classroom__uuid=self.kwargs['classroom_uuid'])

        if self.action not in ('list', 'retrieve'):
            return queryset

        queryset = queryset.prefetch_related('lessons',
                             Prefetch('assignment_progress',
                                      queryset=AssignmentProgress.objects.filter(student=self.request.user.profile),
                                      to_attr='assignment_student_progress')
                             )

        queryset = queryset.annotate(count_lessons=Count('lessons', distinct=True))

        # counts for teacher
        queryset = queryset.annotate(count_students_completed_assingment=
                                     Count(
                                         Case(
                                             When(assignment_progress__completed_on__isnull=False,
                                                  then=1),
                                             output_field=IntegerField()
                                             )
                                          )
                                     )
        queryset = queryset.annotate(count_students_delayed_assingment=
                                     Count(
                                            Case(
                                                When(Q(due_on__lt=datetime.datetime.now())
                                                     & Q(assignment_progress__delayed_on__isnull=False),
                                                     then=1),
                                                output_field=IntegerField()
                                            )
                                        )
                                     )
        queryset = queryset.annotate(count_students_missed_assingment=
                                     Count(
                                        Case(
                                            When(Q(due_on__lt=datetime.datetime.now())
                                                 & Q(assignment_progress__completed_on__isnull=True),
                                                 then=1),
                                            output_field=IntegerField()
                                            )
                                          )
                                     )

        return queryset

    # TODO need to erase AssignmentProgress.completed_on and AssignmentProgress.delayed_on if new lessons added
    # TODO need to create new AssignmentProgress for all students while Assignment is created, background mode is preferable


class StudentProfileViewSet(GenericViewSet):
    # queryset = Profile.objects.all()
    lookup_field = 'username'
    # serializer_class = StudentProfileSerializer

    @action(methods=['get'], detail=True, permission_classes=[permissions.IsAuthenticated, ])
    def profile(self, request, classroom_uuid, username=None):
        """
        url like /api/v1/classroom/:classroomuuid/students/:username/profile/
        profile statistics for classroom
        """
        user_id = username.replace('user', '')

        profile_qs = Profile.objects

        # count for current user and classroom assignment progress
        profile_qs = profile_qs.annotate(num_completed_assignments=Count(
            Case(
                When(Q(as_students_assignment_progress__completed_on__isnull=False)
                     & Q(as_students_assignment_progress__assignment__classroom__uuid=classroom_uuid),
                     then=1),
                output_field=IntegerField()
            )
        ))

        profile_qs = profile_qs.annotate(
            num_missed_assignments=Count(
                Case(
                    When(Q(as_students_assignment_progress__isnull=True)
                         & Q(as_students_assignment_progress__assignment__due_on__lt=datetime.datetime.now())
                         & Q(as_students_assignment_progress__assignment__classroom__uuid=classroom_uuid),
                         then=1),
                    output_field=IntegerField()
                )
            ))

        profile_qs = profile_qs.annotate(
            num_delayed_assignments=Count(
                Case(
                    When(Q(as_students_assignment_progress__delayed_on__isnull=False)
                         & Q(as_students_assignment_progress__assignment__due_on__lt=datetime.datetime.now())
                         & Q(as_students_assignment_progress__assignment__classroom__uuid=classroom_uuid),
                         then=1),
                    output_field=IntegerField()
                )
            ))

        try:
            profile = profile_qs.get(user__pk=user_id)
        except Profile.DoesNotExist:
            raise NotFound()

        serializer = StudentProfileSerializer(profile, many=False)
        return Response(serializer.data)

    @action(methods=['get'], detail=True, permission_classes=[permissions.IsAuthenticated, ])
    def assignments(self, request, classroom_uuid, username=None):
        """
        assignments for custom user
        urls like /api/v1/classroom/:classroomuuid/students/:username/assignments/
        """
        # TODO get all user assignments and add AssignmentProgress data for current user
        user_id = username.replace('user', '')

        try:
            profile = Profile.objects.get(user__pk=user_id)
        except Profile.DoesNotExist:
            raise NotFound()

        # FIXME need to create SQl query or upgrade Django to > 2.0
        # https://docs.djangoproject.com/en/2.1/topics/db/aggregation/#filtering-on-annotations
        # Changed in Django 2.0:
        # The filter argument was added to aggregates.
        assignments = Assignment.objects.filter(classroom__uuid=classroom_uuid)\
            .prefetch_related('lessons',
                              Prefetch('assignment_progress',
                                       queryset=AssignmentProgress.objects.filter(student=profile),
                                       to_attr='assignment_student_progress')
                              )

        assignments = assignments.annotate(count_lessons=Count('lessons'))

        self.queryset = assignments

        serializer = AssignmentListSerializer(assignments, many=True)
        return Response(serializer.data)


