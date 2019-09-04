from django.db import transaction, IntegrityError

from django.db.models import Q, F, Count, Prefetch, Case, When, IntegerField, Value, CharField

from django.utils import timezone

from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, NotAcceptable

from profiles.models import Profile

from curricula.serializers import LessonSerializer

from piblib.drf.views_set_mixins import SeparateListObjectSerializerMixin

from .models import Classroom, Assignment, ClassroomStudent, AssignmentProgress
from .permissions import IsClassroomTeacherOrStudentReadonly, IsAssignmentClassroomTeacherOrStudentReadonly
from .serializers import ClassroomSerializer, AssignmentSerializer, AssignmentListSerializer, ClassroomListSerializer,\
    StudentProfileSerializer, AssignmentStudentsSerializer, StudentAssignmentsSerializer


class ClassroomViewSet(SeparateListObjectSerializerMixin, ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsClassroomTeacherOrStudentReadonly)
    serializer_class = ClassroomSerializer
    list_serializer_class = ClassroomListSerializer
    queryset = Classroom.objects.all().select_related('curriculum', 'curriculum__author', 'teacher', 'teacher__user')\
        .prefetch_related('students', 'students__user', 'external_classroom')
    lookup_field = 'uuid'

    def get_queryset(self):
        queryset = self.queryset. \
                annotate(count_students=Count('students', distinct=True))

        filter_by = self.request.query_params.get('filter', None)

        if filter_by in ('as_student', 'as_teacher') and self.request.user.is_authenticated:
            if filter_by == 'as_student':
                queryset = queryset.filter(students=self.request.user.profile)
            elif filter_by == 'as_teacher':
                queryset = queryset.filter(teacher=self.request.user.profile)
        else:
            queryset = queryset. \
                filter(Q(teacher=self.request.user.profile) | Q(students=self.request.user.profile))

        return queryset

    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user.profile)

    @action(methods=['POST'], detail=False, permission_classes=[permissions.IsAuthenticated, ])
    def join(self, request):
        try:
            classroom = Classroom.objects.get(code=request.data.get('code', ''), external_classroom=None)
        except Classroom.DoesNotExist:
            raise NotFound()

        # TODO limit max number of students in a classroom (999)
        # check that user not if classrom
        try:
            with transaction.atomic():
                if not ClassroomStudent.objects.filter(student=request.user.profile, classroom=classroom).exists():
                    # add current user to classroom as student
                    ClassroomStudent.objects.create(student=request.user.profile, classroom=classroom)
                else:
                    raise NotFound()
        except IntegrityError:  # postgres combine atomic transactions
            raise NotFound()

        serializer = ClassroomSerializer(classroom)

        # create AssignmentProgress for all Assignments for joined student
        ap_objects = []

        for assignment in classroom.assignments.all():
            ap_objects.append(AssignmentProgress(student=request.user.profile, assignment=assignment))

        # FIXME async background mode is preferable
        AssignmentProgress.objects.bulk_create(
            ap_objects
        )

        AssignmentProgress.objects.recalculate_status_by_classroom(classroom, request.user.profile)

        return Response(serializer.data)

    @action(methods=['POST'], detail=False, permission_classes=[permissions.IsAuthenticated, ])
    def leave(self, request):
        try:
            classroom = Classroom.objects.get(uuid=request.data.get('uuid', ''), external_classroom=None)
        except Classroom.DoesNotExist:
            raise NotFound()

        ClassroomStudent.objects.filter(student=request.user.profile, classroom=classroom).delete()

        # remove AssignmentProgress for all Assignments for joined student
        # FIXME async background mode is preferable
        assignments = AssignmentProgress.objects.filter(student=request.user.profile, assignment__classroom=classroom)
        if assignments.exists():
            assignments.delete()

        serializer = ClassroomSerializer(classroom)

        return Response(serializer.data)

    @action(methods=['POST'], detail=True,
            permission_classes=[permissions.IsAuthenticated, IsClassroomTeacherOrStudentReadonly])
    def roster(self, request, uuid):
        # batch API
        try:
            classroom = Classroom.objects.get(uuid=uuid)
        except Classroom.DoesNotExist:
            raise NotFound()

        # if 'students' in request.data:
        # sync students
        # Create students if not exists
        from pib_auth.models import User

        to_add_users_in_classroom = []
        to_remove_profiles_from_classroom__ids = [profile.id for profile in classroom.students.all()]

        if 'students' in request.data:
            for student in request.data['students']:
                user = None
                try:
                    user = User.objects.get(email=student['email'])
                except User.DoesNotExist:
                    try:
                        user = User.objects.create(**student)

                        # add to account_emailaddress (login instead of sign up)
                        from allauth.account.models import EmailAddress
                        EmailAddress.objects.create(user=user, email=user.email, primary=True, verified=True)

                    except TypeError:
                        raise NotAcceptable('Student should be json {"email": , "first_name", "last_name":}')

                if user:
                    try:
                        to_remove_profiles_from_classroom__ids.remove(user.profile.id)
                    except ValueError:
                        pass  # new student

                    if user.profile not in classroom.students.all():  # FIXME test for load / need to use task quene
                        to_add_users_in_classroom.append(user)

        # TODO limit max number of students in a classroom (999)

        # Add students to classroom
        if len(to_add_users_in_classroom) > 0:
            student_classroom_s = (ClassroomStudent(student=user.profile, classroom=classroom)
                                   for user in to_add_users_in_classroom)
            assingments_progressess = []
            for user in to_add_users_in_classroom:  # FIXME need to use task quene
                for assignment in classroom.assignments.all():
                    assingments_progressess.append(AssignmentProgress(student=user.profile, assignment=assignment))

                AssignmentProgress.objects.recalculate_status_by_classroom(classroom, user.profile)

            with transaction.atomic():
                ClassroomStudent.objects.bulk_create(student_classroom_s)
                AssignmentProgress.objects.bulk_create(assingments_progressess)

        # Remove students from classrrom
        if len(to_remove_profiles_from_classroom__ids) > 0:
            with transaction.atomic():
                ClassroomStudent.objects.filter(student__id__in=to_remove_profiles_from_classroom__ids,
                                                classroom=classroom).delete()
                AssignmentProgress.objects.filter(student__id__in=to_remove_profiles_from_classroom__ids,
                                                  assignment__classroom=classroom).delete()

        return Response(status=status.HTTP_201_CREATED)


class ClassroomLessonSerializer(LessonSerializer):

    def get_status(self, obj):
        return obj.ann_status


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
            ap = assignment.assignment_progress.get(student__user=request.user)
            completed_lessons = ap.completed_lessons.all()
            for lesson in assignment.lessons.all():
                if not completed_lessons.exists():
                    first_uncompleted_lesson = lesson
                else:
                    if lesson not in completed_lessons:
                        first_uncompleted_lesson = lesson
                        break
                    else:
                        continue
                break
        except AssignmentProgress.DoesNotExist:
            # create new progress
            student_profile, created = Profile.objects.get_or_create(user=request.user)

            ap = AssignmentProgress.objects.create(
                student=student_profile,
                assignment=assignment
            )

            first_uncompleted_lesson = assignment.lessons.first()

        # save start on
        ap.start_on = timezone.now()
        ap.save()

        # find first uncompleted lesson
        if first_uncompleted_lesson is None:
            raise NotFound('Can\'t find the first uncompleted lesson')

        # TODO Unlock lesson!

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
                                                  then=F('assignment_progress__id')),
                                             output_field=IntegerField()
                                             )
                                         , distinct=True)
                                     )
        queryset = queryset.annotate(count_students_delayed_assingment=
                                     Count(
                                            Case(
                                                When(Q(due_on__lt=timezone.now())
                                                     & Q(assignment_progress__delayed_on__isnull=False)
                                                     & Q(assignment_progress__completed_on__isnull=True),
                                                     then=F('assignment_progress__id')),
                                                output_field=IntegerField()
                                                ),
                                            distinct=True)
                                     )
        queryset = queryset.annotate(count_students_missed_assingment=
                                     Count(
                                        Case(
                                            When(Q(due_on__lt=timezone.now())
                                                 & Q(assignment_progress__delayed_on__isnull=True)
                                                 & Q(assignment_progress__completed_on__isnull=True),
                                                 then=F('assignment_progress__id')),
                                            output_field=IntegerField()
                                            ), distinct=True
                                        )
                                     )

        return queryset

    def perform_create(self, serializer):
        """
        assignment creation
        """
        assignment = serializer.save()

        ap_objects = []

        # create AssignmentProgress for all students in a classroom
        for student in assignment.classroom.students.all():
            ap_objects.append(AssignmentProgress(student=student, assignment=assignment))

        # TODO async background mode is preferable
        AssignmentProgress.objects.bulk_create(
            ap_objects
        )

        # resfresh assignments states
        AssignmentProgress.objects.recalculate_status_by_assignemnt(assignment)

        # test that we need to send emails
        if assignment.send_email:
            serializer.send_emails(assignment)

    def perform_update(self, serializer):
        new_lessons_uuids = []

        for lesson_uuid in serializer.initial_data.get('lessons_uuids', []):
            new_lessons_uuids.append(lesson_uuid)

        existing_lesson_uuids = serializer.instance.lessons.values_list('uuid', flat=True)
        for existing_lesson in existing_lesson_uuids:
            # remove old lessons from new lessons
            if existing_lesson in new_lessons_uuids:
                new_lessons_uuids.remove(existing_lesson)

        # FIXME Do we need to check start date
        # erase AssignmentProgress.completed_on and AssignmentProgress.delayed_on if new lessons added
        if len(new_lessons_uuids) > 0 or serializer.instance.due_on != serializer.validated_data['due_on']:
            # reset AssignmentProgresses dates
            # AssignmentProgress.objects.filter(assignment=serializer.instance)\
            #         .update(completed_on=None, delayed_on=None)
            # resfresh assignments states
            AssignmentProgress.objects.recalculate_status_by_assignemnt(serializer.instance)

            if serializer.instance.send_email:
                serializer.send_emails(serializer.instance)

        serializer.save()

    @action(methods=['get'], detail=True, permission_classes=[permissions.IsAuthenticated, ])
    def students(self, request, classroom_uuid, uuid):
        # /api/v1/classroom/classroomuuid/assignment/uuid/students/
        try:
            assignment = Assignment.objects.get(uuid=uuid, classroom__teacher__user=request.user)
        except Assignment.DoesNotExist:
            raise NotFound('Can\'t find the assignment')

        qs = Profile.objects.prefetch_related(Prefetch('as_students_assignment_progress',
                                              queryset=AssignmentProgress.objects.filter(assignment=assignment).
                                                       select_related('assignment'),
                                              to_attr='as_students_current_assignment_progress'))

        students_list = qs.filter(as_students_assignment_progress__in=assignment.assignment_progress.all())

        serializer = AssignmentStudentsSerializer(students_list, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True, permission_classes=[permissions.IsAuthenticated, ])
    def lessons(self, request, classroom_uuid, uuid):
        # /api/v1/classroom/classroomuuid/assignment/uuid/lessons/
        try:
            assignment = Assignment.objects.get(uuid=uuid)
        except Assignment.DoesNotExist:
            raise NotFound('Can\'t find the assignment')

        lessons_list = assignment.lessons.all().annotate(ann_status=Value('', CharField()))

        try:
            completed_lessons = \
                AssignmentProgress.objects.get(student__user=request.user, assignment=assignment).completed_lessons.all().\
                annotate(ann_status=Value('completed', CharField()))

            # mark completed lessons
            lessons_list = completed_lessons.union(lessons_list.exclude(Q(id__in=completed_lessons)))

        except AssignmentProgress.DoesNotExist:
            pass

        serializer = ClassroomLessonSerializer(lessons_list, many=True)
        return Response(serializer.data)


class StudentProfileViewSet(GenericViewSet):
    queryset = Profile.objects.all()
    lookup_field = 'username'
    serializer_class = StudentProfileSerializer

    def add_counts_to_profiles_qs(self, profile_qs, classroom_uuid):
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
                         & Q(as_students_assignment_progress__assignment__due_on__lt=timezone.now())
                         & Q(as_students_assignment_progress__assignment__classroom__uuid=classroom_uuid),
                         then=1),
                    output_field=IntegerField()
                )
            ))

        profile_qs = profile_qs.annotate(
            num_delayed_assignments=Count(
                Case(
                    When(Q(as_students_assignment_progress__delayed_on__isnull=False)
                         & Q(as_students_assignment_progress__assignment__due_on__lt=timezone.now())
                         & Q(as_students_assignment_progress__assignment__classroom__uuid=classroom_uuid),
                         then=1),
                    output_field=IntegerField()
                )
            ))

        return profile_qs

    def list(self, request, classroom_uuid, *args, **kwargs):
        """
        list of all students in a classrooom
        /api/v1/classroom/:classroomuuid/students/
        """
        # queryset = self.filter_queryset(self.get_queryset())
        #
        # TODO add support for pagination
        # page = self.paginate_queryset(queryset)
        # if page is not None:
        #     serializer = self.get_serializer(page, many=True)
        #     return self.get_paginated_response(serializer.data)

        profile_qs = Profile.objects

        queryset = self.add_counts_to_profiles_qs(profile_qs, classroom_uuid)
        # filter current classroom
        queryset = queryset.filter(as_student_classrooms__uuid=classroom_uuid)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True, permission_classes=[permissions.IsAuthenticated, ])
    def profile(self, request, classroom_uuid, username=None):
        """
        /api/v1/classroom/:classroomuuid/students/:username/profile/
        profile statistics for classroom
        """
        user_id = username.replace('user', '')

        profile_qs = Profile.objects

        profile_qs = self.add_counts_to_profiles_qs(profile_qs, classroom_uuid)

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

        # TODO add support for pagination

        serializer = StudentAssignmentsSerializer(assignments, many=True)
        return Response(serializer.data)

    def destroy(self, request, classroom_uuid, *args, **kwargs):
        """
        remove user from classroom
        """
        if 'username' in kwargs:
            user_id = kwargs['username'].replace('user', '')
        else:
            raise NotFound()

        try:
            profile = Profile.objects.get(user__pk=user_id)
        except Profile.DoesNotExist:
            raise NotFound('profile not found')

        try:
            classroom = Classroom.objects.get(uuid=classroom_uuid, external_classroom=None)
        except Profile.DoesNotExist:
            raise NotFound('classroom not found')

        if request.user != classroom.teacher.user:
            raise NotAcceptable

        ClassroomStudent.objects.filter(student=profile, classroom=classroom).delete()
        # TODO remove assignment progress

        return Response(status=status.HTTP_204_NO_CONTENT)

