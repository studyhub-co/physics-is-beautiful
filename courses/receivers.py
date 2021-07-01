from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver

from allauth.account.signals import user_signed_up

from .models import UserReaction, LessonProgress, CourseUserDashboard, LessonProgressStatus


@receiver(user_signed_up)
def transfer_lesson_progress(request, user, **kwargs):
    """
    Method for transitioning all the tracking data from the session to the
    tracking models.
    """
    if request.session.session_key:
        with transaction.atomic():
            # copy reactions
            UserReaction.objects\
                .filter(anon_session_key=request.session.session_key) \
                .update(anon_session_key=None, profile=user.profile)

            lesson_progresses = LessonProgress.objects\
                .filter(anon_session_key=request.session.session_key)
                # .update(anon_session_key=None, profile=user.profile)

            for lesson_progress in lesson_progresses:
                lesson_progress.anon_session_key = None
                lesson_progress.profile = user.profile
                # execute save to call LessonFinished(MetaBadge).check_lesson_finished FIXME: reduce sql
                lesson_progress.save()


@receiver(post_save, sender=LessonProgress)
def count_the_number_of_learners(sender, instance, created, **kwargs):
    if instance.status == LessonProgressStatus.COMPLETE:
        instance.lesson.module.unit.course.count_number_of_learners(sender)


@receiver(post_save, sender=LessonProgress)
def update_courses_user_dashboard(sender, instance, created, **kwargs):
    if instance.status == LessonProgressStatus.COMPLETE and instance.profile:
        # try to find CourseUserDashboard
        course = instance.lesson.module.unit.course
        course_user_dashboard, created = CourseUserDashboard.objects.get_or_create(
            profile=instance.profile,
            course=course
        )
        if not created:
            course_user_dashboard.save(update_fields=["updated_on"])

