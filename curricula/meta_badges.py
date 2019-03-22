from badges.utils import MetaBadge

from .models import LessonProgress


class ModuleFinished(MetaBadge):
    id = "module-finished﻿"
    model = LessonProgress
    one_time_only = False

    title = "First Post"
    description = "Makes their first post in Discussion"
    level = "1"
    # ("1", "Bronze"),
    # ("2", "Silver"),
    # ("3", "Gold"),
    # ("4", "Diamond"),

    # TODO fix it
    # def check_module_finished(self, instance):
    #     # count lessons in parent module
    #     # count passed lesson
    #     lesson_count = instance.lesson.module.lessons.count()
    #     lesson_completed_count = \
    #         LessonProgress.objects.filter(profile=instance.profile,
    #                                       status=LessonProgress.Status.COMPLETE,
    #                                       lesson=instance.lesson
    #                                       )\
    #         .count()
    #     return lesson_count == lesson_completed_count

    def get_user(self, instance):
        return instance.profile.user
