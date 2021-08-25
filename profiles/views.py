# from django.views import generic
# from .models import Profile
# from django.http import Http404
#
#
# class UserProfileView(generic.DetailView):
#     model = Profile
#     template_name = 'profiles/public_profile.html'
#
#     def get_object(self):
#         try:
#             return Profile.objects.get(user__pk=self.kwargs['pk'])
#         except Profile.DoesNotExist:
#             raise Http404()
#
#
