from rest_framework.viewsets import GenericViewSet
from rest_framework import permissions, status, mixins, filters
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from .models import Notification
from .serializers import NotificationSerializer
from .permissions import AccessByOwnerOrStaff


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20  # TODO get it from the project settings


class ReadUnreadFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if request.user.is_authenticated:
            filter_param = request.query_params.get('filter')
            if filter_param and filter_param == 'read':
                queryset = queryset.read()
            if filter_param and filter_param == 'unread':
                queryset = queryset.unread()

        return queryset


class NotificationViewSet(mixins.ListModelMixin,
                          mixins.RetrieveModelMixin,
                          GenericViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()
    pagination_class = StandardResultsSetPagination
    filter_backends = (ReadUnreadFilterBackend,)
    lookup_field = 'id'

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(recipient=user)

    @action(methods=['POST'],
            detail=True,
            permission_classes=[permissions.IsAuthenticated, AccessByOwnerOrStaff], )
    def mark_as_read(self, request, id):
        try:
            notification = Notification.objects.get(id=id)
        except Notification.DoesNotExist:
            raise NotFound()

        notification.mark_as_read()

        return Response(status=status.HTTP_202_ACCEPTED)

    @action(methods=['POST'],
            detail=True,
            permission_classes=[permissions.IsAuthenticated, AccessByOwnerOrStaff], )
    def mark_as_unread(self, request, id):
        try:
            notification = Notification.objects.get(id=id)
        except Notification.DoesNotExist:
            raise NotFound()

        notification.mark_as_unread()

        return Response(status=status.HTTP_202_ACCEPTED)

    @action(methods=['GET'],
            detail=False,
            permission_classes=[permissions.IsAuthenticated, AccessByOwnerOrStaff], )
    def unread_count(self, request):
        unread_count = self.get_queryset().unread().count()
        return Response({'count': unread_count})
