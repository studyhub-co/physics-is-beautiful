from enum import Enum

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from . import Lesson


class LessonProgressStatus(Enum):
    LOCKED = 0
    NEW = 10
    UNLOCKED = 20
    COMPLETE = 30


class LessonProgress(models.Model):

    class Meta:
        unique_together = [('profile', 'lesson')]

    # class Status(models.IntegerChoices):  # Django 3.0

    profile = models.ForeignKey(
        'profiles.Profile', related_name='courses_lessons_progress', on_delete=models.CASCADE,
        null=True, blank=True
    )
    anon_session_key = models.CharField(_('session key'), max_length=40, null=True, blank=True)
    lesson = models.ForeignKey(Lesson, related_name='courses_lessons_progress', on_delete=models.CASCADE)
    # score = models.SmallIntegerField(default=0)  # it's progress in % for now (denormalization of correct user reactions)
    # rename to lesson_progress to exclude collisions with UserReaction score, it's confusing
    lesson_progress = models.SmallIntegerField(
        default=0)  # it's progress in % for now (denormalization of correct user reactions)
    completed_on = models.DateTimeField(null=True, blank=True)
    duration = models.DurationField(null=True, blank=True)
    # status = models.IntegerField(choices=Status.choices) # Django 3.0
    status = models.IntegerField(
        default=LessonProgressStatus.LOCKED.value,
        choices=[(status, status.value) for status in LessonProgressStatus]
    )

    def complete(self, duration=None):
        self.status = LessonProgressStatus.COMPLETE.value
        self.completed_on = timezone.now()
        # no need we save it every step
        # self.lesson_progress = lesson_progress

        if duration:
            self.duration = duration

    # def complete(self, duration=None, lesson_progress=None):
    #     self.status = self.Status.COMPLETE
    #     self.completed_on = timezone.now()
    #     self.lesson_progress = lesson_progress
    #
    #     if duration:
    #         self.duration = duration
