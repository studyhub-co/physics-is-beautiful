from django.contrib.sites.shortcuts import get_current_site

from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.account.adapter import DefaultAccountAdapter

# fixme get_user_model
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


class AccountAdapter(DefaultAccountAdapter):
    def send_confirmation_mail(self, request, emailconfirmation, signup):
        current_site = get_current_site(request)
        activate_url = self.get_email_confirmation_url(
            request,
            emailconfirmation)
        ctx = {
            "user": emailconfirmation.email_address.user,
            "activate_url": activate_url,
            "current_site": current_site,
            "key": emailconfirmation.key,
        }
        if signup:
            email_template = 'account/email/email_confirmation_signup'
        else:
            email_template = 'account/email/email_confirmation'
        self.send_mail(email_template,
                       emailconfirmation.email_address.email,
                       ctx)
