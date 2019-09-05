from django.db import transaction

from django.core.files.storage import get_storage_class

from rest_framework import serializers

from .models import Classroom, Assignment, ExternalClassroom

from curricula.models import Curriculum, Lesson
from profiles.models import Profile

from profiles.serializers import PublicProfileSerializer
from curricula.serializers import SimpleCurriculumSerializer, CurriculumSerializer, LessonSerializer

from urllib.parse import urljoin

from django.utils import timezone
from django.conf import settings
from django.urls import reverse

from django.template import loader

from django.core.mail import EmailMessage

from django.contrib.sites.models import Site


class StudentProfileSerializer(PublicProfileSerializer):
    counts = serializers.SerializerMethodField()

    def get_counts(self, obj):
        return {'num_completed_assignments': obj.num_completed_assignments if hasattr(obj, 'num_completed_assignments') else 0,
                'num_delayed_assignments': obj.num_delayed_assignments if hasattr(obj, 'num_delayed_assignments') else 0,
                'num_missed_assignments': obj.num_missed_assignments if hasattr(obj, 'num_missed_assignments') else 0
                }

    class Meta:
        model = Profile
        fields = PublicProfileSerializer.Meta.fields + ['counts']


class AssignmentStudentsSerializer(PublicProfileSerializer):
    """
    Student Profiles For Assignment serializer
    """
    completed_on = serializers.SerializerMethodField()
    delayed_on = serializers.SerializerMethodField()
    start_on = serializers.SerializerMethodField()

    def get_completed_on(self, obj):
        return obj.as_students_current_assignment_progress[0].completed_on\
            if hasattr(obj, 'as_students_current_assignment_progress') else None

    def get_delayed_on(self, obj):
        return obj.as_students_current_assignment_progress[0].delayed_on\
            if hasattr(obj, 'as_students_current_assignment_progress') else None

    def get_start_on(self, obj):
        return obj.as_students_current_assignment_progress[0].start_on\
            if hasattr(obj, 'as_students_current_assignment_progress') else None

    class Meta:
        model = PublicProfileSerializer.Meta.model
        fields = PublicProfileSerializer.Meta.fields + ['completed_on', 'delayed_on', 'start_on']


class ExternalClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExternalClassroom
        fields = ['external_id', 'name', 'teacher_id', 'code', 'provider', 'alternate_link']


class ClassroomBaseSerializer(serializers.ModelSerializer):
    count_students = serializers.IntegerField(read_only=True)
    teacher = PublicProfileSerializer(read_only=True)
    curriculum = CurriculumSerializer(read_only=True)
    # curriculum = SimpleCurriculumSerializer(read_only=True)
    curriculum_uuid = serializers.SlugRelatedField(queryset=Curriculum.objects.all(), source='curriculum',
                                                   slug_field='uuid', write_only=True)

    external_classroom = ExternalClassroomSerializer(many=False, required=False)

    def create(self, validated_data):
        external_classroom = None
        if 'external_classroom' in validated_data:
            external_classroom = validated_data.pop('external_classroom')

        to_return = super(ClassroomBaseSerializer, self).create(validated_data)

        if external_classroom:
            # save external data
            kwargs = external_classroom
            # if 'provider' in external_classroom:
            #     kwargs['provider'] = external_classroom.pop('provider')
            # external_id=external_classroom['external_id'],
            #                                              name=external_classroom['name'],
            #                                              teacher_id=external_classroom['teacher_id'],
            #                                              code=external_classroom['code'],
            try:
                ExternalClassroom.objects.create(classroom=to_return,
                                             **kwargs)
            except:  # TODO raise error message
                pass
        return to_return

    class Meta:
        model = Classroom
        fields = ['uuid', 'name', 'created_on', 'updated_on', 'curriculum', 'code', 'count_students',
                  'teacher', 'curriculum_uuid', 'external_classroom']
        read_only_fields = ('uuid', 'code', 'created_on', 'updated_on')


class ClassroomListSerializer(ClassroomBaseSerializer):
    less_students = serializers.SerializerMethodField(read_only=True)

    def get_less_students(self, container):
        students = container.students.all()[:12]
        serializer = PublicProfileSerializer(instance=students, many=True)
        return serializer.data

    class Meta(ClassroomBaseSerializer.Meta):
        fields = ClassroomBaseSerializer.Meta.fields + ['less_students']


class ClassroomSerializer(ClassroomBaseSerializer):
    pass


class AssignmentListSerializer(serializers.ModelSerializer):
    lessons_uuids = serializers.SlugRelatedField(queryset=Lesson.objects.all(), source='lessons',
                                                 slug_field='uuid', many=True, write_only=True)
    # classroom = ClassroomSerializer(read_only=True)
    classroom_uuid = serializers.SlugRelatedField(queryset=Classroom.objects.all(), source='classroom',
                                                  slug_field='uuid', write_only=True)

    count_lessons = serializers.IntegerField(read_only=True)

    completed_on = serializers.SerializerMethodField(read_only=True)
    delayed_on = serializers.SerializerMethodField(read_only=True)

    # total Assignment per students statistics
    count_students_completed_assingment = serializers.SerializerMethodField(read_only=True)
    count_students_missed_assingment = serializers.SerializerMethodField(read_only=True)
    count_students_delayed_assingment = serializers.SerializerMethodField(read_only=True)
    count_completed_lessons = serializers.SerializerMethodField(read_only=True)
    # assigned_on = serializers.SerializerMethodField(read_only=True)

    # current user (request.user) completed lessons
    count_completed_lessons = serializers.SerializerMethodField(read_only=True)
    image = serializers.SerializerMethodField(read_only=True)

    def send_emails(sender, instance, *args, **kwargs):

        # TODO if we will have a large number of students we need to think about sending email asynchronously

        # send email to students in classroom
        d1 = timezone.now()
        d0 = instance.due_on.replace()
        delta = d0 - d1

        current_site = Site.objects.get_current()

        lesson = instance.lessons.first()

        lesson_url = reverse('main_curricula:lesson', args=[lesson.uuid])

        url = urljoin('http://{}/'.format(current_site.domain), lesson_url)

        # TODO we need to send letter if assignment is:
        # 1. created
        # 2. new lessons have been added
        # 3. dates have been changed

        for student in instance.classroom.students.all():
            html_message = loader.render_to_string(
                'classroom/notification_email.html',
                {
                    'user_full_name': student.user.full_name,
                    'assignment': instance,
                    'days': delta.days,
                    'url': url
                }
            )

            email = EmailMessage(
                'You have a new assignment on Physics is Beautiful!',
                html_message,
                settings.DEFAULT_FROM_EMAIL,
                [student.user.email, ]
            )
            email.content_subtype = "html"

            # Suppress email until it's fixed.
            email.send()

    def get_image(self, obj):
        if obj.denormalized_image:
            storage = get_storage_class()()
            # if storage.exists(obj.denormalized_image): # do not work with s3
            return storage.url(obj.denormalized_image)

        return None

    # this is for current user (student)
    def get_count_completed_lessons(self, obj):
        # return obj.count_completed_lessons if hasattr(obj, 'count_completed_lessons')  \
        #                                    and obj.classroom.teacher.user == self.context['request'].user\
        #        else 0
        # FIXME need to create SQl query or upgrade Django to > 2.0
        # https://docs.djangoproject.com/en/2.1/topics/db/aggregation/#filtering-on-annotations
        # Changed in Django 2.0:
        # The filter argument was added to aggregates.
        if hasattr(obj, 'assignment_student_progress') and len(obj.assignment_student_progress) > 0:
            return obj.assignment_student_progress[0].completed_lessons.count()
        else:
            return 0

    # # assigned_on to user
    # def get_assigned_on(self, obj):
    #     if hasattr(obj, 'assignment_student_progress') and len(obj.assignment_student_progress) > 0:
    #         return obj.assignment_student_progress[0].start_on  # start date of assignment
    #     else:
    #         return None

    def get_completed_on(self, obj):
        if hasattr(obj, 'assignment_student_progress') and len(obj.assignment_student_progress) > 0:
            return obj.assignment_student_progress[0].completed_on
        return None

    def get_delayed_on(self, obj):
        if hasattr(obj, 'assignment_student_progress') and len(obj.assignment_student_progress) > 0:
            return obj.assignment_student_progress[0].delayed_on
        return None

    # follow counters for teacher
    def get_count_students_completed_assingment(self, obj):
        return obj.count_students_completed_assingment if hasattr(obj, 'count_students_completed_assingment') \
            and obj.classroom.teacher.user == self.context['request'].user else 0

    def get_count_students_missed_assingment(self, obj):
        return obj.count_students_missed_assingment if hasattr(obj, 'count_students_missed_assingment')\
            and obj.classroom.teacher.user == self.context['request'].user else 0

    def get_count_students_delayed_assingment(self, obj):
        return obj.count_students_delayed_assingment if hasattr(obj, 'count_students_delayed_assingment') \
            and obj.classroom.teacher.user == self.context['request'].user else 0

    def create(self, validated_data):
        lessons = validated_data.pop('lessons')
        with transaction.atomic():
            assignment = Assignment.objects.create(**validated_data)
            assignment.lessons.set(lessons)
            assignment.save()
        return assignment

    def update(self, instance, validated_data):
        lessons = validated_data.pop('lessons')

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        with transaction.atomic():
            instance.lessons.clear()
            instance.lessons.set(lessons)
            instance.save()
        return instance

    class Meta:
        model = Assignment
        fields = ['uuid', 'name', 'created_on', 'updated_on', 'start_on', 'due_on', 'classroom_uuid', 'lessons_uuids',
                  'count_lessons', 'completed_on', 'delayed_on',
                  # 'assigned_on',
                  'count_students_completed_assingment', 'count_students_missed_assingment',
                  'count_students_delayed_assingment',
                  'count_completed_lessons', 'image', 'send_email']
        read_only_fields = ('uuid', 'created_on', 'updated_on')


class AssignmentSerializer(AssignmentListSerializer):
    lessons = LessonSerializer(read_only=True, many=True)

    class Meta(AssignmentListSerializer.Meta):
        fields = AssignmentListSerializer.Meta.fields + ['lessons']


class StudentAssignmentsSerializer(AssignmentListSerializer):
    """
    Assignments For Student Profile serializer
    """
    completed_on = serializers.SerializerMethodField()
    delayed_on = serializers.SerializerMethodField()
    assigned_on = serializers.DateTimeField(source='start_on')
    start_on = serializers.SerializerMethodField()

    def get_completed_on(self, obj):
        return obj.assignment_student_progress[0].completed_on\
            if hasattr(obj, 'assignment_student_progress') else None

    def get_delayed_on(self, obj):
        return obj.assignment_student_progress[0].delayed_on\
            if hasattr(obj, 'assignment_student_progress') else None

    # !!! Warning: we ovverride start_on date of Assignment with start_on date of user Assignment proccess
    def get_start_on(self, obj):
        return obj.assignment_student_progress[0].start_on\
            if hasattr(obj, 'assignment_student_progress') else None

    class Meta:
        model = AssignmentListSerializer.Meta.model
        fields = AssignmentListSerializer.Meta.fields + ['completed_on', 'delayed_on', 'assigned_on']
        # fields = AssignmentListSerializer.Meta.fields + ['completed_on', 'delayed_on', 'start_on']

