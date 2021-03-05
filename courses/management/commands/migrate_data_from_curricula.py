import os

from django.core.management.base import BaseCommand

from curricula.models import Curriculum
from ..data_migrate.courses import copy_curricula


class Command(BaseCommand):
    help = 'migrate data from curricula to courses'

    def handle(self, *args, **options):
        self.stdout.write(
            self.style.WARNING(
                'You need to have all official material problem types in DataBase before running this command!'
            )
        )

        # remove old images_not_found.log file
        module_dir = os.path.dirname(__file__)
        log_file = os.path.join(module_dir, '../data_migrate', 'images_not_found.log')
        if os.path.exists(log_file):
            os.remove(log_file)

        for curricula in Curriculum.objects.all():
            copy_curricula(curricula)
