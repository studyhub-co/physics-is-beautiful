from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from pib_auth.models import User
from .models import Profile

from django_gravatar.helpers import get_gravatar_url, has_gravatar


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.get_or_create(user=instance)


@receiver(pre_save, sender=Profile)
def save_gravatar_url(sender, instance, *args, **kwargs):
    # if has_gravatar(instance.user.email):
    instance.gravatar_url = get_gravatar_url(instance.user.email, default='identicon')
