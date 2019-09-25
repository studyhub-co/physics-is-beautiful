from django.db import models
from django.contrib.postgres.fields import JSONField
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from . import Material


class UserReaction(models.Model):

    profile = models.ForeignKey(
        'profiles.Profile', related_name='material_reactions', on_delete=models.CASCADE,
        null=True, blank=True
    )
    anon_session_key = models.CharField(_('session key'), max_length=40, null=True, blank=True)
    material = models.ForeignKey(Material, related_name='users_reaction', on_delete=models.CASCADE)
    data = JSONField()  # only Postgresql support!
    answered_on = models.DateTimeField(auto_now_add=True)
    is_correct = models.BooleanField(default=False)

    def check_reaction(self):
        # TODO
        return True

    def get_correct_data(self):
        return self.material.get_correct_data()


