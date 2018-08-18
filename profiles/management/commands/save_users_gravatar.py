from django.core.management.base import BaseCommand

from profiles.models import Profile

from django_gravatar.helpers import get_gravatar_url, has_gravatar


class Command(BaseCommand):
    help = 'Save users gravatars urls'

    def handle(self, *args, **options):
        for profile in Profile.objects.all():  # can't bulk update
            if has_gravatar(profile.user.email):
                profile.gravatar_url = get_gravatar_url(profile.user.email)
                profile.save()
