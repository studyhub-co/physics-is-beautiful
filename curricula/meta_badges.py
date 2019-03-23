from badges.utils import MetaBadge

from .models import LessonProgress, ModuleBadges, LessonBadges


class ModuleFinished(MetaBadge):
    id = "module-finished﻿"
    model = LessonProgress
    one_time_only = False

    title = "Module Finished"
    description = "Finishes a module"
    level = "1"
    # ("1", "Bronze"),
    # ("2", "Silver"),
    # ("3", "Gold"),
    # ("4", "Diamond"),

    def check_module_finished(self, instance):
        # count lessons in parent module
        # count passed lesson
        lessons_count = instance.lesson.module.lessons.count()
        lessons_completed_count = \
            LessonProgress.objects.filter(profile=instance.profile,
                                          status=LessonProgress.Status.COMPLETE,
                                          lesson=instance.lesson
                                          )\
            .count()

        try:
            ModuleBadges.objects.get(user=instance.profile.user, module=instance.lesson.module)
            return False
        except ModuleBadges.DoesNotExist:
            if lessons_count == lessons_completed_count:
                ModuleBadges.objects.create(user=instance.profile.user, module=instance.lesson.module)
            return lessons_count == lessons_completed_count

    def get_user(self, instance):
        return instance.profile.user


class LessonFinished(MetaBadge):
    id = "lesson-finished﻿"
    model = LessonProgress
    one_time_only = False

    title = "Lesson Finished"
    description = "Finishes a lesson"
    level = "1"
    # ("1", "Bronze"),
    # ("2", "Silver"),
    # ("3", "Gold"),
    # ("4", "Diamond"),

    def check_lesson_finished(self, instance):
        try:
            LessonBadges.objects.get(user=instance.profile.user, lesson=instance.lesson)
            return False
        except LessonBadges.DoesNotExist:
            if instance.status == LessonProgress.Status.COMPLETE:
                LessonBadges.objects.create(user=instance.profile.user, lesson=instance.lesson)
            return instance.status == LessonProgress.Status.COMPLETE

    def get_user(self, instance):
        return instance.profile.user
