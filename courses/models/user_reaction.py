from django.db import models
from django.db.models import Q
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

    # When user give a reaction - we calculate last_reaction flag
    # (remove for an old reaction for current material and set a new one)
    # If we want to restart lesson - we remove the last_reaction marks for current lesson and user
    # With last_reaction we can:
    # 1) Calculate score of the current lesson
    # 2) Start lesson from following after last_reaction.material material
    last_reaction = models.BooleanField(default=True, verbose_name='Mark reaction as last for user')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['last_reaction', 'profile_id', 'material_id'],
                                    name='unique__last_reaction_user',
                                    condition=Q(profile__isnull=False, last_reaction=True)),
            models.UniqueConstraint(fields=['last_reaction', 'anon_session_key', 'material_id'],
                                    name='unique__last_reaction_anon',
                                    condition=Q(anon_session_key__isnull=False, last_reaction=True)),
        ]

    def check_reaction(self):
        # run validate.js from material type
        # 1. get validate.js from material sanbox
        mpt = self.material.material_problem_type
        if not mpt:
            return None

        validate_js_module = mpt.modules.filter(name='validate.js').first()

        if not validate_js_module:
            return None

        # TODO is this safe?
        # see https://github.com/sqreen/PyMiniRacer/issues/118 for deyails
        from py_mini_racer import py_mini_racer
        ctx = py_mini_racer.MiniRacer()
        try:
            ctx.eval(validate_js_module.code)
        except py_mini_racer.JSParseException:
            # validate.js parse exception
            return None

        # call validation function
        # const validate = (correctData, userReactionData) => {
        #   ...
        # };
        try:
            validation_result = ctx.call("validate", self.material.data, self.data)
        except py_mini_racer.JSEvalException as e:
            # validate function not found
            return None

        return validation_result

    def get_correct_data(self):
        return self.material.get_correct_data()


