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
        # run validate.js from material type
        # 1. get validate.js from material sanbox
        mpt = self.material.material_problem_type
        if not mpt:
            return None

        validate_js_module = mpt.modules.filter(name='validate.js').first()

        if not validate_js_module:
            return None

        from py_mini_racer import py_mini_racer
        ctx = py_mini_racer.MiniRacer()
        ctx.eval(validate_js_module.code)

        # call validation function
        # const validate = (correctData, userReactionData) => {
        #   ...
        # };
        try:
            validation_result = ctx.call("validate", self.material.data, self.data)
        except py_mini_racer.JSEvalException:
            # validate function not found
            return None

        return validation_result

    def get_correct_data(self):
        return self.material.get_correct_data()


