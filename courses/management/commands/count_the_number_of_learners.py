from django.core.management.base import BaseCommand

from ...models import Course, LessonProgress


class Command(BaseCommand):
    help = 'count the number of course learners'

    def handle(self, *args, **options):
        for course in Course.objects.all():
            course.count_number_of_learners(LessonProgress)




