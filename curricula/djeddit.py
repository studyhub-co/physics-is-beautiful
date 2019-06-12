from django.db import transaction

from djeddit.models import Topic, Thread, Post

from .settings import QUESTIONS_TOPIC_SLUG, SYSTEM_USER_ID


def create_thread(instance):
    if instance:
        new_thread = None
        # create root problem post
        if not instance.thread:
            try:
                problems_topic = Topic.objects.get(slug=QUESTIONS_TOPIC_SLUG)
            except Topic.DoesNotExist:
                problems_topic = Topic.objects.create(title='Questions of courses', slug=QUESTIONS_TOPIC_SLUG)

            # Problem title
            with transaction.atomic():
                post = Post.objects.create(created_by_id=SYSTEM_USER_ID)
                thread_title = '{}'.format(instance.text)
                new_thread = Thread.objects.create(title=thread_title[:199], topic=problems_topic, op=post)

        return new_thread

    return None
