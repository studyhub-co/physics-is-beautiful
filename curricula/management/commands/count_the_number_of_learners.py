from django.core.management.base import BaseCommand

from curricula.models import Curriculum, LessonProgress


class Command(BaseCommand):
    help = 'count the number of curriculum learners'

    def handle(self, *args, **options):
        for curriculum in Curriculum.objects.all():
            curriculum.count_number_of_learners(LessonProgress)




