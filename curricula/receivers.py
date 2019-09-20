from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver

from allauth.account.signals import user_signed_up

# from .services import AnonymousProgressService
# from .services import ProgressService
from .models import Lesson, UserResponse, Answer, LessonProgress, CurriculumUserDashboard


@receiver(user_signed_up)
def transfer_lesson_progress(request, user, **kwargs):
    """
    Method for transitioning all the tracking data from the session to the
    tracking models.
    """
    if request.session.session_key:
        with transaction.atomic():
            UserResponse.objects\
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


# @receiver(user_signed_up)
# def transfer_lesson_progress(request, user, **kwargs):
#     """
#     Method for transitioning all the tracking data from the session to the
#     tracking models.
#     """
#     # TODO: optimize for bulk create queries.
#     profile = user.profile
#     lessons = Lesson.objects.filter(pk__in=request.session.get('lessons', {}).keys())
#     service = AnonymousProgressService(request, session=request.session)
#     for lesson in lessons:
#         lesson_progress = service.get_lesson_progress(lesson)
#         lesson_progress.profile = profile
#         lesson_progress.save()
#
#         content_classes = {}
#         for response in service.get_lesson_responses_store(lesson):
#             content_type = response['content_type']
#             content_class = (
#                 content_classes.get(content_type) or
#                 ContentType.objects.get(pk=content_type).model_class()
#             )
#             content_classes[content_type] = content_class
#             if content_class == Answer:
#                 # ???
#                 content = Answer.objects.get(**response['content'])
#             else:
#                 # create user response (answer) from session store
#                 content = content_class.objects.create(**response['content'])
#
#             UserResponse.objects.create(
#                 profile=profile,
#                 question_id=response['question'],
#                 # content_type=response.content_type,
#                 content=content,
#                 is_correct=response['is_correct'],
#                 answered_on=response['answered_on'],
#             )
#         # TODO check unlocked lessons
#     # clear the session
#     request.session['lessons'] = {}


@receiver(post_save, sender=LessonProgress)
def count_the_number_of_learners(sender, instance, created, **kwargs):
    if instance.status == LessonProgress.Status.COMPLETE:
        instance.lesson.module.unit.curriculum.count_number_of_learners(sender)


@receiver(post_save, sender=LessonProgress)
def update_curriculum_user_dashboard(sender, instance, created, **kwargs):
    if instance.status == LessonProgress.Status.COMPLETE and instance.profile:
        # try to find CurriculumUserDashboard
        curriculum = instance.lesson.module.unit.curriculum
        curriculum_user_dashboard, created = CurriculumUserDashboard.objects.get_or_create(
            profile=instance.profile,
            curriculum=curriculum
        )
        if not created:
            curriculum_user_dashboard.save(update_fields=["updated_on"])

