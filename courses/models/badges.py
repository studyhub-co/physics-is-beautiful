from django.db import models

from pib_auth.models import User

from . import Module, Lesson


class ModuleAwards(models.Model):
    # we need to save awarded badges due user can replay module
    # (and course service proccess resave LessonProgress several times)
    user = models.ForeignKey(User, related_name='courses_module_awards', on_delete=models.CASCADE)
    module = models.ForeignKey(Module, related_name='courses_users_awards',  on_delete=models.CASCADE)
    module_finished_badge = models.BooleanField(default=False)
    module_completed_award = models.BooleanField(default=False)


class LessonAwards(models.Model):
    # we need to save awarded badges due user can replay lesson
    # (and courses service proccess resave LessonProgress several times)
    user = models.ForeignKey(User, related_name='courses_lesson_awards', on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, related_name='courses_users_awards', on_delete=models.CASCADE)
    # lesson_finished_badge = models.BooleanField(default=False)
    lesson_completed_award = models.BooleanField(default=False)
