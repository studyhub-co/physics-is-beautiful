from django.db import models

from pib_auth.models import User

from . import Module, Lesson


class ModuleAwards(models.Model):
    # we need to save awarded badges due user can replay module
    # (and curricula service proccess resave LessonProgress several times)
    user = models.ForeignKey(User)
    module = models.ForeignKey(Module)
    module_finished_badge = models.BooleanField(default=False)
    module_completed_award = models.BooleanField(default=False)


class LessonAwards(models.Model):
    # we need to save awarded badges due user can replay lesson
    # (and curricula service proccess resave LessonProgress several times)
    user = models.ForeignKey(User)
    lesson = models.ForeignKey(Lesson)
    # lesson_finished_badge = models.BooleanField(default=False)
    lesson_completed_award = models.BooleanField(default=False)
