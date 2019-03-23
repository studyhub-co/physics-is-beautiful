from django.db import models

from pib_auth.models import User

from . import Module, Lesson


class ModuleBadges(models.Model):
    # we need to save awarded badges due user can replay module
    user = models.ForeignKey(User)
    module = models.ForeignKey(Module)


class LessonBadges(models.Model):
    # we need to save awarded badges due user can replay lesson
    user = models.ForeignKey(User)
    lesson = models.ForeignKey(Lesson)
