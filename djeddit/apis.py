from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import permissions, mixins
from rest_framework.pagination import PageNumberPagination

from .permissions import EditDeleteByOwnerOrStaff
from .models import Thread, Post
from .serializers import ThreadSerializer, PostSerializer

from notifications.signals import notify


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10  # TODO get it from the project settings


class ThreadViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = ThreadSerializer
    queryset = Thread.objects.all()
    lookup_field = 'id'


class PostViewSet(mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  GenericViewSet):
    permission_classes = (permissions.IsAuthenticated, EditDeleteByOwnerOrStaff)
    serializer_class = PostSerializer
    queryset = Post.objects.select_related('created_by__profile').all()
    lookup_field = 'uid'

    def perform_create(self, serializer):
        post = serializer.save(created_by=self.request.user)
        if post.parent and post.parent.level > 0:
            if self.request.user != post.parent.created_by:
                notify.send(self.request.user, recipient=post.parent.created_by,
                            verb='replied to your comment in thread',
                            target=post.parent.thread, action_object=post)




