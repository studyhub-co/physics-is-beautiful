# from django.db import transaction
#
# from django.db.models import Q, F, Count, Prefetch, Case, When, Sum, IntegerField, Value, CharField
#
from django.utils import timezone
from datetime import timedelta

from django.db.models import F

from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser, FileUploadParser
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import NotFound, NotAcceptable
from rest_framework import filters

from django_filters.rest_framework import DjangoFilterBackend

# from profiles.models import Profile

from piblib.drf.views_set_mixins import SeparateListObjectSerializerMixin

from .models import Resource, TextBookSolutionPDF, RecentUserResource
from .serializers import ResourceBaseSerializer, ResourceListSerializer, TextBookSolutionPDFSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10  # TODO get it from the project settings


class RecentlyFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        filter_param = request.query_params.get('filter')
        if filter_param and filter_param == 'recent':
            queryset = queryset.\
                filter(user_recent_list__user__user=request.user).\
                order_by('-user_recent_list__last_access_date')
            # queryset = queryset.filter(curricula_user_dashboard__profile__user=request.user\)
        return queryset


class ResourceViewSet(SeparateListObjectSerializerMixin, ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)  # TODO add more
    serializer_class = ResourceBaseSerializer
    list_serializer_class = ResourceListSerializer
    pagination_class = StandardResultsSetPagination
    queryset = Resource.objects.all().\
        order_by('-created_on').\
        select_related('metadata').\
        prefetch_related('sections__problems__solutions')

    filter_backends = (filters.OrderingFilter, RecentlyFilterBackend)  # DjangoFilterBackend,
    lookup_field = 'uuid'

    @action(methods=['POST'],
            detail=False,
            permission_classes=[permissions.IsAuthenticated, ],
            parser_classes=(FormParser, MultiPartParser, FileUploadParser))
    def upload_solution_pdf(self, request):
        # remove pdfs without related TextBookSolution
        month_ago = timezone.now() - timedelta(30)
        TextBookSolutionPDF.objects.filter(created_on__lt=month_ago, solution__isnull=True).delete()

        serializer = TextBookSolutionPDFSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.profile)

    def retrieve(self, request, *args, **kwargs):
        # try to find user last access date
        instance = self.get_object()
        try:
            user_access = RecentUserResource.objects.get(user=request.user.profile, resource=instance)
            user_access.last_access_date = timezone.now()
            user_access.save()
        except RecentUserResource.DoesNotExist:
            RecentUserResource.objects.create(user=request.user.profile, resource=instance)

        # increment view count
        if instance:
            # instance.count_views += 1
            # instance.save(update_fields=['count_views', ])
            Resource.unmoderated_objects.filter(pk=instance.pk).update(count_views=F('count_views') + 1)

        return super(ResourceViewSet, self).retrieve(request, *args, **kwargs)



