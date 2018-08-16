from django.conf import settings
from django.db import models

from django.dispatch import receiver
from django.db.models.signals import pre_save

from django_gravatar.helpers import get_gravatar_url, has_gravatar


class BaseModel(models.Model):

    class Meta:
        abstract = True

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)


class Profile(BaseModel):

    class Meta:
        db_table = 'profiles_profiles'

    user = models.OneToOneField(settings.AUTH_USER_MODEL)
    sound_enabled = models.BooleanField(default=True)
    all_lessons_unlocked = models.BooleanField(default=False)
    gravatar_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return 'Profile: {}'.format(self.user.email)  # todo seems we need swith to username here


@receiver(pre_save, sender=Profile)
def save_gravatar_url(sender, instance, *args, **kwargs):
    if has_gravatar(instance.user.email):
        instance.gravatar_url = get_gravatar_url(instance.user.email)
