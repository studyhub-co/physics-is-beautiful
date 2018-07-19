from rest_framework.viewsets import ModelViewSet

from .models import Profile
from .serializers import ProfileSerializer


class ProfileViewSet(ModelViewSet):

    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = []

    def get_object(self):
        if self.request.user.is_authenticated():
            return self.request.user.profile
        return self.request.user
