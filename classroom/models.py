import uuid

from django.utils import timezone

from django.db import models

from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver

from django.contrib.sites.models import Site

from shortuuidfield import ShortUUIDField

from curricula.models import Curriculum, Lesson
from profiles.models import Profile

from django.db import transaction


# TODO move to utils
def on_transaction_commit(func):
    def inner(*args, **kwargs):
        transaction.on_commit(lambda: func(*args, **kwargs))

    return inner


class Classroom(models.Model):
    uuid = ShortUUIDField(unique=True)
    name = models.CharField(max_length=200)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    deleted_on = models.DateTimeField(blank=True, null=True)

    teacher = models.ForeignKey(Profile, related_name='as_teacher_classrooms')
    students = models.ManyToManyField(Profile, through='ClassroomStudent',
                                      related_name='as_student_classrooms')
    curriculum = models.ForeignKey(Curriculum)
    code = models.CharField(unique=True, max_length=6)

    def __str__(self):
        return '{}'.format(self.name)


class ExternalClassroom(models.Model):
    GOOGLE_CLASSROOM = 'GC'
    EXTERNAL_PROVIDER_CHOICES = (
        (GOOGLE_CLASSROOM, 'google classroom'),
    )

    external_id = models.CharField(max_length=400)
    name = models.CharField(max_length=400)
    teacher_id = models.CharField(max_length=400)
    code = models.CharField(max_length=400)
    provider = models.CharField(max_length=2, choices=EXTERNAL_PROVIDER_CHOICES, default=GOOGLE_CLASSROOM)
    classroom = models.OneToOneField(Classroom, related_name='external_classroom', blank=True, null=True)
    alternate_link = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        unique_together = ("external_id", "provider")


class ClassroomStudent(models.Model):
    code_entered_on = models.DateTimeField(blank=True, null=True)
    # leave_on = models.DateTimeField(blank=True, null=True)
    student = models.ForeignKey(Profile)
    classroom = models.ForeignKey(Classroom)

    class Meta:
        unique_together = (("student", "classroom"),)


@receiver(pre_save, sender=Classroom)
def generate_classroom_code(sender, instance, *args, **kwargs):
    if instance.code:
        return

    is_unique = False
    while not is_unique:
        code = uuid.uuid4().hex[:6]
        if sender.objects.filter(code=code).count() == 0:
            is_unique = True

    instance.code = code


class Assignment(models.Model):
    uuid = ShortUUIDField(unique=True)
    lessons = models.ManyToManyField(Lesson)
    created_on = models.DateTimeField(auto_now_add=True)
    deleted_on = models.DateTimeField(blank=True, null=True)
    updated_on = models.DateTimeField(auto_now=True)  # assigned On date
    send_email = models.BooleanField(default=True)
    start_on = models.DateTimeField()
    due_on = models.DateTimeField()
    name = models.CharField(max_length=200)
    classroom = models.ForeignKey(Classroom, related_name='assignments')
    denormalized_image = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        ordering = ['-start_on']


# TODO move signals to signals.py
@receiver(post_save, sender=Assignment)
# @on_transaction_commit
def add_denormalized_lesson_image(sender, instance, *args, **kwargs):
    first_lesson = instance.lessons.first()
    if first_lesson:
        if first_lesson.image:
            sender.objects.filter(pk=instance.pk).update(denormalized_image=first_lesson.image.name)


class AssignmentProgressManager(models.Manager):

    def __process__assignment_progress_list(self, assignment_progress_list):
        for assignment_progress in assignment_progress_list:
            student_completed_lessons = Lesson.objects.filter(
                progress__profile=assignment_progress.student,
                progress__status=30)
            need_complete_lessons = assignment_progress.assignment.lessons.all()

            if need_complete_lessons.exclude(id__in=student_completed_lessons).count() == 0:
                # student already passed all lessons
                if timezone.now() < assignment_progress.assignment.due_on.replace():
                    assignment_progress.completed_on = timezone.now()
                else:
                    assignment_progress.delayed_on = timezone.now()
            else:
                # reset completed if find uncompleted lessons
                assignment_progress.completed_on = None
                assignment_progress.delayed_on = None

            # save all lessons completed in Curriculum into classroom progress
            assignment_progress.completed_lessons = student_completed_lessons.filter(
                id__in=assignment_progress.assignment.lessons.all())

            assignment_progress.save()

    def recalculate_status_by_assignemnt(self, assignment):
        assignment_progress_list = AssignmentProgress.objects.filter(assignment=assignment)

        self.__process__assignment_progress_list(assignment_progress_list)

    def recalculate_status_by_classroom(self, classroom, user):
        assignment_progress_list = AssignmentProgress.objects.filter(assignment__in=classroom.assignments.all(),
                                                                     student=user)

        self.__process__assignment_progress_list(assignment_progress_list)

    def recalculate_status_by_lesson(self, lesson, user):
        # from classroom.models import Assignment, AssignmentProgress
        assignments = Assignment.objects.filter(lessons__id=lesson.id)
        assignment_progress_list = AssignmentProgress.objects.filter(assignment__in=assignments,
                                                                     student__user=user,
                                                                     completed_on__isnull=True)

        self.__process__assignment_progress_list(assignment_progress_list)

        # for assignment_progress in assignment_progress_list:
        #     # user can have several assignments (from different classroom e.g.) to one lesson
        #     try:
        #         assignment_progress.completed_lessons.add(lesson)
        #
        #         # do not support by mysql db
        #         # if assignment_progress.assignment.lessons.difference(assignment_progress.completed_lessons.all())\
        #         #        .count() == 0:
        #         completed_lessons_ids = []
        #         [completed_lessons_ids.append(lesson.id) for lesson in assignment_progress.completed_lessons.all()]
        #         difference = assignment_progress.assignment.lessons.exclude(id__in=completed_lessons_ids)
        #         if difference.count() == 0:
        #             if timezone.now() < assignment_progress.assignment.due_on.replace():
        #                 assignment_progress.completed_on = timezone.now()
        #             else:
        #                 assignment_progress.delayed_on = timezone.now()
        #
        #         assignment_progress.save()  # update updated_on date
        #
        #     except AssignmentProgress.DoesNotExist:
        #         pass


class AssignmentProgress(models.Model):
    assignment = models.ForeignKey(Assignment, related_name='assignment_progress')
    uuid = ShortUUIDField(unique=True)
    completed_lessons = models.ManyToManyField(Lesson, related_name='assignment_progress_completed_lessons')
    updated_on = models.DateTimeField(auto_now=True)
    # assigned_on = assignment.start_on
    start_on = models.DateTimeField(blank=True, null=True)  # 1st lesson has been requested by student
    completed_on = models.DateTimeField(blank=True, null=True)
    delayed_on = models.DateTimeField(blank=True, null=True)  # Assignment completed but after due_on datetime
    student = models.ForeignKey(Profile, related_name='as_students_assignment_progress')

    objects = AssignmentProgressManager()

    class Meta:
        ordering = ['-start_on']
        unique_together = (("assignment", "student"), )  # one progress per user and  assignment


# class OAuthUserToken(models.Model):
#     token = models.CharField(max_length=200)
#     refresh_token = models.CharField(max_length=200)
