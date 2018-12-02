# from django.db import transaction
#
# from django.db.models import Q, F, Count, Prefetch, Case, When, Sum, IntegerField, Value, CharField
#
from django.utils import timezone
from datetime import timedelta

from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser, FileUploadParser
from rest_framework.exceptions import NotFound, NotAcceptable

# from profiles.models import Profile

from .models import Resource, TextBookSolutionPDF
from .serializers import ResourceBaseSerializer, ResourceListSerializer, TextBookSolutionPDFSerializer


class SeparateListObjectSerializerMixin:
    def get_serializer_class(self):
        if self.action == 'list':
            return self.list_serializer_class
        if self.action in ('retrieve', 'partial_update', 'update'):
            return self.serializer_class
        return self.list_serializer_class


class ResourceViewSet(SeparateListObjectSerializerMixin, ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)  # TODO add more
    serializer_class = ResourceBaseSerializer
    list_serializer_class = ResourceListSerializer
    queryset = Resource.objects.all()
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

    # def get_queryset(self):
    #     queryset = self.queryset. \
    #             annotate(count_students=Count('students', distinct=True))
    #     return queryset




