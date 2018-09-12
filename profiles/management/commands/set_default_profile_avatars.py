from django.core.management.base import BaseCommand

from profiles.models import Profile
from pib_auth.models import User


class Command(BaseCommand):
    help = 'Set default users avatars'

    def handle(self, *args, **options):
        for user in User.objects.all():  # can't bulk update
            profile, created = Profile.objects.get_or_create(user=user)
            if not profile.selected_avatar:
                if profile.user_avatar:
                    profile.selected_avatar = 'u'
                elif profile.google_avatar_url:
                    profile.selected_avatar = 'g'
                elif profile.gravatar_url:
                    profile.selected_avatar = 'a'
            profile.save()


