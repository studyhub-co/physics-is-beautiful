from django.db.models import F, Q, Value
from django.core.management.base import BaseCommand

from pib_auth.models import User

from django.db.models.functions import Concat


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def handle(self, *args, **options):

        # update user with names
        User.objects.exclude(Q(first_name__exact='') & Q(last_name__exact=''))\
            .update(display_name=Concat(F('first_name'), Value(' '), F('last_name')))

        # update users without names
        User.objects.filter(Q(first_name__exact='') & Q(last_name__exact=''))\
            .update(first_name='User',
                    last_name=F('id'),
                    display_name=Concat(Value('User '), F('id')))
