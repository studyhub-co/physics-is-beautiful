from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import permissions, status, mixins, filters
from rest_framework.pagination import PageNumberPagination

from .models import Notification

from .serializers import NotificationSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20  # TODO get it from the project settings


class NotificationViewSet(mixins.ListModelMixin,
                          mixins.RetrieveModelMixin,
                          GenericViewSet):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(recipient=user)
