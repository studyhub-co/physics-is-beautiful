from django.dispatch import receiver
from django.contrib.contenttypes.models import ContentType

from allauth.account.signals import user_signed_up

from django.db.models.signals import post_save

from .services import AnonymousProgressService
from .models import Lesson, UserResponse, Answer, LessonProgress, CurriculumUserDashboard


@receiver(user_signed_up)
def transfer_lesson_progress(request, user, **kwargs):
    """
    Method for transitioning all the tracking data from the session to the
    tracking models.
    """
    # TODO: optimize for bulk create queries.
    profile = user.profile
    lessons = Lesson.objects.filter(pk__in=request.session.get('lessons', {}).keys())
    service = AnonymousProgressService(request, session=request.session)
    for lesson in lessons:
        lesson_progress = service.get_lesson_progress(lesson)
        lesson_progress.profile = profile
        lesson_progress.save()

        content_classes = {}
        for response in service.get_lesson_responses_store(lesson):
            content_type = response['content_type']
            try:
                content_class = (
                    content_classes.get(content_type) or
                    ContentType.objects.get(pk=content_type).model_class()
                )
            except ContentType.DoesNotExist:
                continue  # fix for sentry 1603959048

            content_classes[content_type] = content_class
            if content_class == Answer:
                content = Answer.objects.get(**response['content'])
            else:
                content = content_class.objects.create(**response['content'])
            UserResponse.objects.create(
                profile=profile,
                question_id=response['question'],
                content_type=ContentType.objects.get(pk=content_type),
                content=content,
                is_correct=response['is_correct'],
                answered_on=response['answered_on'],
            )
    # clear the session
    request.session['lessons'] = {}


@receiver(post_save, sender=LessonProgress)
def count_the_number_of_learners(sender, instance, created, **kwargs):
    if instance.status == LessonProgress.Status.COMPLETE:
        instance.lesson.module.unit.curriculum.count_number_of_learners(sender)


@receiver(post_save, sender=LessonProgress)
def update_curriculum_user_dashboard(sender, instance, created, **kwargs):
    if instance.status == LessonProgress.Status.COMPLETE:
        # try to find CurriculumUserDashboard
        curriculum = instance.lesson.module.unit.curriculum
        curriculum_user_dashboard, created = CurriculumUserDashboard.objects.get_or_create(
            profile=instance.profile,
            curriculum=curriculum
        )
        if not created:
            curriculum_user_dashboard.save(update_fields=["updated_on"])

