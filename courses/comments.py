from django.db import transaction

from react_comments_django.models import Topic, Thread, Post

from .settings import MATERIALS_TOPIC_SLUG, MATERIALS_TOPIC_TITLE, SYSTEM_USER_ID


def create_thread(instance):
    if instance:
        new_thread = None
        # create root problem post
        if not instance.thread:
            try:
                problems_topic = Topic.objects.get(slug=MATERIALS_TOPIC_SLUG)
            except Topic.DoesNotExist:
                problems_topic = Topic.objects.create(title=MATERIALS_TOPIC_TITLE)

            # thread title
            with transaction.atomic():
                post = Post.objects.create(created_by_id=SYSTEM_USER_ID)
                thread_title = '{}'.format(instance.pk)
                new_thread = Thread.objects.create(title=thread_title[:199], topic=problems_topic, op=post)

        return new_thread

    return None
