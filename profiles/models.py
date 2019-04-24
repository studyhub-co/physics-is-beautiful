from django.conf import settings
from django.db import models

from django.db.models.signals import pre_save
from django.dispatch import receiver

from django.urls import reverse


class BaseModel(models.Model):

    class Meta:
        abstract = True

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)


class Profile(BaseModel):

    class Meta:
        db_table = 'profiles_profiles'

    AVATAR_CHOICES = [
        ('u', 'User avatar'),
        ('g', 'Google avatar'),
        ('a', 'Gravatar')
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL)
    sound_enabled = models.BooleanField(default=True)
    all_lessons_unlocked = models.BooleanField(default=False)
    user_avatar = models.ImageField(null=True, blank=True)
    gravatar_url = models.URLField(null=True, blank=True)
    google_avatar_url = models.URLField(null=True, blank=True)
    selected_avatar = models.CharField(choices=AVATAR_CHOICES, null=True, blank=True, max_length=1)
    profile_views = models.PositiveIntegerField(null=True, blank=True)

    @property
    def get_avatar_url(self):
        if self.selected_avatar:
            if self.selected_avatar == 'u':
                return self.user_avatar.url
            elif self.selected_avatar == 'g':
                return self.google_avatar_url
            elif self.selected_avatar == 'a':
                return self.gravatar_url

    @property
    def get_absolute_url(self):
        return reverse('user-profile', kwargs={"pk": self.user.id})

    def __str__(self):
        return 'Profile: {}'.format(self.user.email)  # todo seems we need switch to username here


@receiver(pre_save, sender=Profile)
def select_default_avatar(sender, instance, *args, **kwargs):
    if not instance.selected_avatar:
        if instance.user_avatar:
            instance.selected_avatar = 'u'
        elif instance.google_avatar_url:
            instance.selected_avatar = 'g'
        elif instance.gravatar_url:
            instance.selected_avatar = 'a'

