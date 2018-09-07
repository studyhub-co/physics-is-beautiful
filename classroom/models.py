import uuid

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
    GOOGLE_CLASSRROM = 'GC'
    EXTERNAL_PROVIDER_CHOICES = (
        (GOOGLE_CLASSRROM, 'google classrrrom'),
    )

    external_id = models.CharField(max_length=400)
    name = models.CharField(max_length=400)
    teacher_id = models.CharField(max_length=400)
    code = models.CharField(max_length=400)
    provider = models.CharField(max_length=2, choices=EXTERNAL_PROVIDER_CHOICES, default=GOOGLE_CLASSRROM)
    classroom = models.OneToOneField(Classroom, related_name='external_classroom', blank=True, null=True)

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

    class Meta:
        ordering = ['-start_on']
        unique_together = (("assignment", "student"), )  # one progress per user and  assignment


# class OAuthUserToken(models.Model):
#     token = models.CharField(max_length=200)
#     refresh_token = models.CharField(max_length=200)
