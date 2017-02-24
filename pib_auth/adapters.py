from allauth.socialaccount.adapter import DefaultSocialAccountAdapter


class SocialLoginAdapter(DefaultSocialAccountAdapter):

    def pre_social_login(self, request, sociallogin):
        try:
            user = User.objects.get(email=sociallogin.account.user.email)
            sociallogin.connect(request, user)
            # Create a response object
            response = HttpResponse()
            raise ImmediateHttpResponse(response)
        except Exception:
            pass
