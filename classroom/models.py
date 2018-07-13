import uuid

from django.contrib.auth import get_user_model
from django.db import models

from django.db.models.signals import pre_save
from django.dispatch import receiver

from shortuuidfield import ShortUUIDField

from curricula.models import Curriculum


class Classroom(models.Model):
    uuid = ShortUUIDField(unique=True)
    name = models.CharField(max_length=200)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    deleted_on = models.DateTimeField(blank=True, null=True)
    teacher = models.ForeignKey(get_user_model(), related_name='as_teacher_classrooms')
    students = models.ManyToManyField(get_user_model(), through='ClassroomStudent',
                                      related_name='as_student_classrooms')
    curriculum = models.ForeignKey(Curriculum)
    code = models.CharField(unique=True, max_length=6)


class ClassroomStudent(models.Model):
    code_entered_on = models.DateTimeField(blank=True, null=True)
    leave_on = models.DateTimeField(blank=True, null=True)
    student = models.ForeignKey(get_user_model())
    classroom = models.ForeignKey(Classroom)


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
    classroom = models.ForeignKey(Classroom, related_name='assignments')

