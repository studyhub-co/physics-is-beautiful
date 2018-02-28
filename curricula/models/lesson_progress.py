from django.db import models
from django.utils import timezone

from django_light_enums import enum

from . import BaseModel, Lesson


class LessonProgress(BaseModel):

    class Meta:
        db_table = 'curricula_lesson_progress'
        unique_together = [('profile', 'lesson')]

    class Status(enum.Enum):
        LOCKED = 0
        NEW = 10
        UNLOCKED = 20
        COMPLETE = 30

    profile = models.ForeignKey(
        'profiles.Profile', related_name='lesson_progress', on_delete=models.CASCADE
    )
    lesson = models.ForeignKey(Lesson, related_name='progress', on_delete=models.CASCADE)
    score = models.SmallIntegerField(default=0)
    completed_on = models.DateTimeField(null=True, blank=True)
    duration = models.DurationField(null=True, blank=True)
    status = enum.EnumField(Status)

    def complete(self, duration=None, score=None):
        self.status = self.Status.COMPLETE
        self.completed_on = timezone.now()
        self.score = score
        if duration:
            self.duration = duration
