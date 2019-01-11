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

from .permissions import IsStaffOrReadOnly

from piblib.drf.views_set_mixins import SeparateListObjectSerializerMixin

from .models import Resource, TextBookSolutionPDF, RecentUserResource, TextBookProblem, TextBookSolution

from .serializers import ResourceBaseSerializer, ResourceListSerializer, TextBookSolutionPDFSerializer, \
    FullTextBookProblemSerializer, TextBookSolutionSerializer
from .settings import TEXTBOOK_PROBLEMS_SOLUTIONS_TOPIC_ID, SYSTEM_USER_ID


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


class TextBookProblemsViewSet(SeparateListObjectSerializerMixin,
                              mixins.RetrieveModelMixin,
                              GenericViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = FullTextBookProblemSerializer
    queryset = TextBookProblem.objects.all()
    lookup_field = 'uuid'


class TextBookSolutionsViewSet(mixins.RetrieveModelMixin,
                               mixins.CreateModelMixin,
                               GenericViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = TextBookSolutionSerializer
    queryset = TextBookSolution.objects.all()
    # .annotate(count_votes=Count('votes', distinct=True))
    lookup_field = 'uuid'

    @action(methods=['POST'],
            detail=True,
            permission_classes=[permissions.IsAuthenticated, ],)
    def vote(self, request, uuid):
        try:
            solution = TextBookSolution.objects.get(uuid=uuid)
        except TextBookSolution.DoesNotExist:
            raise NotFound()

        value = request.data.get('value', None)

        if not value or value not in (-1, 1):
            raise NotAcceptable()

        if value == 1:
            solution.votes.up(request.user.id)
        else:
            solution.votes.down(request.user.id)

        # TODO calculate votes for djedit

        return Response(status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        # try to find user last access date
        instance = self.get_object()

        # get or create comments solutions topic / solution thread / .
        if instance:
            new_thread = None
            try:
                solutions_topic = Topic.objects.get(id=TEXTBOOK_PROBLEMS_SOLUTIONS_TOPIC_ID)
            except Topic.DoesNotExist:
                solutions_topic = Topic.objects.create(title='Textbook problems solutions', id=TEXTBOOK_PROBLEMS_SOLUTIONS_TOPIC_ID)

            if not instance.thread:
                with transaction.atomic():
                    solutions_post = Post.objects.create(created_by_id=SYSTEM_USER_ID)
                    title = ''
                    if instance.textbook_problem.textbook_section.resource.resource_type == 'TB':
                        # get resourse title from metadata
                        if 'title' in instance.textbook_problem.textbook_section.resource.metadata.data['volumeInfo']:
                            title = '{}'.format(instance.textbook_problem.textbook_section.resource.metadata.data['volumeInfo']['title'])
                    else:
                        title = '{}'.format('Unknwon rsource name')

                    title = '{} / {}'.format(title, instance.textbook_problem.textbook_section.title)
                    title = '{} / {}'.format(title, instance.textbook_problem.title)
                    title = '{} / {}'.format(title, instance.title)

                    new_thread = Thread.objects.create(title=title[:199], topic=solutions_topic, op=solutions_post)

            # increment view count
            # Resource.unmoderated_objects.filter(pk=instance.pk).update(count_views=F('count_views') + 1)
            if new_thread:
                TextBookSolution.objects.filter(pk=instance.pk).update(count_views=F('count_views') + 1, thread=new_thread)
            else:
                TextBookSolution.objects.filter(pk=instance.pk).update(count_views=F('count_views') + 1)

        return super(TextBookSolutionsViewSet, self).retrieve(request, *args, **kwargs)

    def perform_create(self, serializer):
        with transaction.atomic():
            position = self.queryset.filter(textbook_problem=serializer.validated_data['textbook_problem']).count()
            serializer.save(posted_by=self.request.user.profile, position=position)


class ResourceViewSet(SeparateListObjectSerializerMixin, ModelViewSet):
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    permission_classes = (permissions.IsAuthenticated, IsStaffOrReadOnly)
    serializer_class = ResourceBaseSerializer
    list_serializer_class = ResourceListSerializer
    pagination_class = StandardResultsSetPagination
    queryset = Resource.objects.all().\
        order_by('-created_on').\
        select_related('metadata'). \
        prefetch_related(Prefetch('sections__problems',
                         queryset=TextBookProblem.objects.
                                  annotate(count_solutions=Count('solutions', distinct=True))
                         ))
        # prefetch_related('sections__problems__solutions')

    filter_backends = (filters.OrderingFilter, RecentlyFilterBackend)  # DjangoFilterBackend,
    lookup_field = 'uuid'

    @action(methods=['POST'],
            detail=False,
            permission_classes=[permissions.IsAuthenticated,],
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
            # Resource.unmoderated_objects.filter(pk=instance.pk).update(count_views=F('count_views') + 1)
            Resource.objects.filter(pk=instance.pk).update(count_views=F('count_views') + 1)

        return super(ResourceViewSet, self).retrieve(request, *args, **kwargs)



