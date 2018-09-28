from django.core.management.base import BaseCommand

from profiles.models import Profile
from pib_auth.models import User


class Command(BaseCommand):
    help = 'Save users google avatars urls'

    def handle(self, *args, **options):
        for user in User.objects.all():  # can't bulk update
            profile, created = Profile.objects.get_or_create(user=user)

            try:
                extra_data = profile.user.socialaccount_set.filter(provider='google')[0].extra_data
                if 'picture' in extra_data and extra_data['picture']:
                    profile.google_avatar_url = extra_data['picture']
                    profile.save()
            except IndexError:
                pass  # not found google extra_data

