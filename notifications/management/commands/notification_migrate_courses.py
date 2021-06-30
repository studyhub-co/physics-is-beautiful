from django.core.management.base import BaseCommand
from django.contrib.contenttypes.models import ContentType

from curricula.models import Lesson as LessonC, Module as ModuleC

from ...models import Notification


class Command(BaseCommand):
    help = 'migrate courses notification'

    def handle(self, *args, **options):
        # Get post type id
        react_comments_post_type = ContentType.objects.get(app_label='react_comments_django', model='post')
        react_comments_thread_type = ContentType.objects.get(app_label='react_comments_django', model='thread')

        for notification in Notification.objects.all():
            if notification.action_object_content_type and \
                    notification.action_object_content_type.app_label == 'djeddit':

                if notification.action_object_content_type.model == 'post':
                    notification.action_object_content_type = react_comments_post_type
                    notification.save()

                if notification.action_object_content_type.model == 'thread':
                    notification.action_object_content_type = react_comments_thread_type
                    notification.save()

            if notification.target_content_type and \
                    notification.target_content_type.app_label == 'djeddit':

                if notification.target_content_type.model == 'post':
                    notification.target_content_type = react_comments_post_type
                    notification.save()

                if notification.target_content_type.model == 'thread':
                    notification.target_content_type = react_comments_thread_type
                    notification.save()

            if isinstance(notification.action_object, ModuleC):
                # we do not know the new uuid of a module, so just remove notification
                notification.delete()

            if isinstance(notification.action_object, LessonC):
                # we do not know the new uuid of a lesson, so just remove notification
                notification.delete()


