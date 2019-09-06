from rest_framework.viewsets import GenericViewSet
from rest_framework import permissions, mixins
from rest_framework.pagination import PageNumberPagination

from .models import ReputationAction
from .serializers import ReputationActionSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20  # TODO get it from the project settings


class ReputationActionViewSet(mixins.RetrieveModelMixin,
                              mixins.ListModelMixin,
                              GenericViewSet):
    # lookup_field = 'user__id'
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)  # users can upload solutions
    queryset = ReputationAction.objects.filter()
    serializer_class = ReputationActionSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user)

    # todo combine actions like in SO

