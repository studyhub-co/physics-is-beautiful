from allauth.socialaccount.adapter import DefaultSocialAccountAdapter

from .models import User


class SocialAccountAdapter(DefaultSocialAccountAdapter):

    def pre_social_login(self, request, sociallogin):
        """
        Override in order to merge accounts that are email verified.
        """

        # Already exists
        if sociallogin.is_existing:
            return

        # we need the email for login
        if 'email' not in sociallogin.account.extra_data:
            return

        try:
            user = User.objects.get(
                emailaddress__email__iexact=sociallogin.account.extra_data['email'],
                emailaddress__verified=True,
            )
        except User.DoesNotExist:
            return

        sociallogin.connect(request, user)
