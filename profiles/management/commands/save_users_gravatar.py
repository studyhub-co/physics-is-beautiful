from django.core.management.base import BaseCommand

from profiles.models import Profile
from pib_auth.models import User

from django_gravatar.helpers import get_gravatar_url, has_gravatar


class Command(BaseCommand):
    help = 'Save users gravatars urls'

    def handle(self, *args, **options):
        for user in User.objects.all():  # can't bulk update
            profile, created = Profile.objects.get_or_create(user=user)
            # if has_gravatar(profile.user.email):
            profile.gravatar_url = get_gravatar_url(profile.user.email)
            profile.save()
