from django.core.management.base import BaseCommand

from curricula.models import Curriculum
from ..data_migrate.courses import copy_curricula


class Command(BaseCommand):
    help = 'migrate data from curricula to courses'

    def handle(self, *args, **options):
        for curricula in Curriculum.objects.all()[:4]:
            copy_curricula(curricula)
