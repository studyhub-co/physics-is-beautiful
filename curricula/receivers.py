from django.dispatch import receiver
from django.contrib.contenttypes.models import ContentType

from allauth.account.signals import user_signed_up

from .services import AnonymousProgressService
from .models import Lesson, UserResponse, Answer


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
            content_class = (
                content_classes.get(content_type) or
                ContentType.objects.get(pk=content_type).model_class()
            )
            content_classes[content_type] = content_class
            if content_class == Answer:
                content = Answer.objects.get(**response['content'])
            else:
                content = content_class.objects.create(**response['content'])
            UserResponse.objects.create(
                profile=profile,
                question_id=response['question'],
                # content_type=response.content_type,
                content=content,
                is_correct=response['is_correct'],
                answered_on=response['answered_on'],
            )
    # clear the session
    request.session['lessons'] = {}
