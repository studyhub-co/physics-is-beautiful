from enum import Enum

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from . import Lesson


class LessonProgress(models.Model):

    class Meta:
        unique_together = [('profile', 'lesson')]

    # class Status(models.IntegerChoices):  # Django 3.0
    class Status(Enum):
        LOCKED = 0
        NEW = 10
        UNLOCKED = 20
        COMPLETE = 30

    profile = models.ForeignKey(
        'profiles.Profile', related_name='courses_lessons_progress', on_delete=models.CASCADE,
        null=True, blank=True
    )
    anon_session_key = models.CharField(_('session key'), max_length=40, null=True, blank=True)
    lesson = models.ForeignKey(Lesson, related_name='courses_lessons_progress', on_delete=models.CASCADE)
    score = models.SmallIntegerField(default=0)
    completed_on = models.DateTimeField(null=True, blank=True)
    duration = models.DurationField(null=True, blank=True)
    # status = models.IntegerField(choices=Status.choices) # Django 3.0
    status = models.IntegerField(choices=[(status, status.value) for status in Status])

    def complete(self, duration=None, score=None):
        self.status = self.Status.COMPLETE
        self.completed_on = timezone.now()
        self.score = score

        if duration:
            self.duration = duration
