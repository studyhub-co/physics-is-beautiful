from notifications.signals import notify

from django.conf import settings

from user_reputation.models import Reputation
from badges.utils import MetaBadge
from badges.models import BadgeToUser

from .models import LessonProgress, ModuleAwards, LessonAwards, Curriculum


class ModuleFinished(MetaBadge):
    id = "module-finished﻿"
    model = LessonProgress
    one_time_only = False

    title = "Module finished"
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
                                          lesson__in=instance.lesson.module.lessons.all()
                                          )\
            .count()

        if lessons_count == lessons_completed_count:

            module_award, created = ModuleAwards.objects.get_or_create(user=instance.profile.user,
                                                                       module=instance.lesson.module)

            if not module_award.module_completed_award:
                # 1. award reputation
                def send_notification(user, action_value, lesson):
                    notify.send(user, recipient=user,
                                verb='earned {} points for completing a module!'.format(action_value),
                                action_object=lesson)

                # add reputation lesson points
                Reputation.objects.add_reputation_action(instance.profile.user,
                                                         settings.REPUTATION_STAGE_1_POINTS,
                                                         instance.lesson.module,
                                                         send_notification)

                module_award.module_completed_award = True
                module_award.save()

            if not module_award.module_finished_badge:
                module_award.module_finished_badge = True
                module_award.save()
                return True
        else:
            return False

    def get_user(self, instance):
        return instance.profile.user


class LessonFinished(MetaBadge):
    id = "lesson-finished﻿"
    model = LessonProgress
    one_time_only = False  # False because we need to award points for each lesson

    title = "First lesson finished"
    description = "Finishes a first lesson"
    level = "1"
    # ("1", "Bronze"),
    # ("2", "Silver"),
    # ("3", "Gold"),
    # ("4", "Diamond"),

    def check_lesson_finished(self, instance):
        if instance.status == LessonProgress.Status.COMPLETE:

            lesson_award, created = LessonAwards.objects.get_or_create(user=instance.profile.user,
                                                                       lesson=instance.lesson)

            # 1. award reputation
            if not lesson_award.lesson_completed_award:
                # send notification callback
                def send_notification(user, action_value, lesson):
                    notify.send(user, recipient=user,
                                verb='earned {} points for completing a lesson!'.format(action_value),
                                action_object=lesson)

                # add reputation lesson points
                Reputation.objects.add_reputation_action(instance.profile.user, settings.REPUTATION_STAGE_1_POINTS,
                                                         instance.lesson, send_notification)

                lesson_award.lesson_completed_award = True
                lesson_award.save()

            # 2. award badge for first lesson
            try:
                BadgeToUser.objects.get(badge__id=self.id, user=instance.profile.user)
            except BadgeToUser.MultipleObjectsReturned:
                # remove all badges, we need to save only one (first lesson)
                last = BadgeToUser.objects.filter(badge__id=self.id, user=instance.profile.user).last()
                BadgeToUser.objects.exclude(pk=last.pk).delete()
            except BadgeToUser.DoesNotExist:
                return True

            # award badge for each lesson
            # if not lesson_award.lesson_finished_badge:
            #     lesson_award.lesson_finished_badge = True
            #     return True

        return False

    def get_user(self, instance):
        return instance.profile.user


class CurriculumFinished(MetaBadge):
    id = "first-course﻿﻿"
    model = Curriculum
    one_time_only = True

    title = "Teacher"
    description = "Creates first course from scratch"
    level = "1"
    # ("1", "Bronze"),
    # ("2", "Silver"),
    # ("3", "Gold"),
    # ("4", "Diamond"),

    def check_first_course(self, instance):
        # check that course is new
        if instance.name == 'New curriculum' and instance.units.count() == 0:
            return True
        else:
            return False

    def get_user(self, instance):
        return instance.author
