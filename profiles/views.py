from django.views import generic
from .models import Profile


class UserProfileView(generic.DetailView):
    model = Profile
    template_name = 'profiles/public_profile.html'


