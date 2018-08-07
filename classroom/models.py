import uuid

# from django.contrib.auth import get_user_model
from django.db import models

from django.db.models.signals import pre_save
from django.dispatch import receiver

from shortuuidfield import ShortUUIDField

from curricula.models import Curriculum, Lesson
from profiles.models import Profile

# ASSIGNMENT_TYPE = (
#     ('TI', 'Time'),
#     ('XP', 'Experience'),
# )


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

    def less_students(self):
        # TODO no so good for lists queries
        return self.students.order_by("-id")[:10]

    def __str__(self):
        return '{}'.format(self.name)


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
    updated_on = models.DateTimeField(auto_now=True)
    start_on = models.DateTimeField()
    due_on = models.DateTimeField()
    name = models.CharField(max_length=200)
    classroom = models.ForeignKey(Classroom, related_name='assignments')
    # TODO add image?

    class Meta:
        ordering = ['-start_on']


class AssignmentProgress(models.Model):
    assignment = models.ForeignKey(Assignment, related_name='assignment_progress')
    uuid = ShortUUIDField(unique=True)
    completed_lessons = models.ManyToManyField(Lesson)
    updated_on = models.DateTimeField(auto_now=True)
    start_on = models.DateTimeField(auto_now_add=True)
    completed_on = models.DateTimeField(blank=True, null=True)
    student = models.ForeignKey(Profile, related_name='as_students_assignment_progress')

    class Meta:
        ordering = ['-start_on']
        unique_together = (("assignment", "student"), )  # one progress per user and  assignment