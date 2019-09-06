from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from notifications.signals import notify

from pib_auth.models import User
from .models import Profile

from django_gravatar.helpers import get_gravatar_url, has_gravatar

# from allauth.socialaccount.signals import social_account_updated # TOO old version django-allauth
# from allauth.account.signals import user_signed_up, user_logged_in


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.get_or_create(user=instance)

        notify.send(instance, recipient=instance,
                    verb='signed up successfully! Thanks for signing up and welcome to Physics is Beautiful!',
                    )


@receiver(pre_save, sender=Profile)
def save_gravatar_url(sender, instance, *args, **kwargs):
    # if has_gravatar(instance.user.email):
    if not instance.gravatar_url:  # FIXME avatar is not will be refreshed
        instance.gravatar_url = get_gravatar_url(instance.user.email, default='identicon', size=150)


# @receiver(user_signed_up) # If we want to save image after user signed in
# def populate_google_image(request, user, **kwargs):
@receiver(post_save, sender=User)
def populate_google_image(sender, instance, created, **kwargs):
    user = instance
    # save google photo url in profile
    if user.profile and not user.profile.google_avatar_url:  # FIXME avatar is not will be refreshed
        try:
            extra_data = user.socialaccount_set.filter(provider='google')[0].extra_data
            if 'picture' in extra_data and extra_data['picture']:
                user.profile.google_avatar_url = extra_data['picture']
                user.profile.save()
        except IndexError:
            pass  # not found google extra_data
