# from django.db import transaction

from django.utils import timezone
from datetime import timedelta

from django.db.models import F, Count, Prefetch

from django.db import transaction

from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import permissions, status, mixins, filters
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser, FileUploadParser
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import NotFound, NotAcceptable

from djeddit.models import Topic, Thread, Post

# from django_filters.rest_framework import DjangoFilterBackend

# from profiles.models import Profile

from piblib.drf.views_set_mixins import SeparateListObjectSerializerMixin

from .models import Thread, Post

from .serializers import ThreadSerializer, PostSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10  # TODO get it from the project settings


class ThreadViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = ThreadSerializer
    queryset = Thread.objects.all()
    lookup_field = 'id'


class PostViewSet(mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  GenericViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    lookup_field = 'uid'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)




