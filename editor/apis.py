from django.db.models import Q, Count, Max, F

from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import permissions, status, generics
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework import filters

from django_filters.rest_framework import DjangoFilterBackend


from curricula.models import Curriculum, Unit, Module, Lesson, Question, Answer, CurriculumUserDashboard

from editor.serializers import MiniCurriculumSerializer, CurriculumSerializer, UnitSerializer, \
    ModuleSerializer, LessonSerializer, QuestionSerializer, AnswerSerializer

from editor.permissions import IsOwnerOrCollaboratorBase, IsUnitOwnerOrCollaborator, IsModuleOwnerOrCollaborator, \
    IsLessonOwnerOrCollaborator, IsQuestionOwnerOrCollaborator, IsAnswerOwnerOrCollaborator


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10


class RecentlyFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        filter_param = request.query_params.get('filter')
        if filter_param and filter_param == 'recent':
                # filter for recently Curricula for current user
                # queryset = queryset. \
                #     filter(units__modules__lessons__progress__profile__user=request.user). \
                #     annotate(updated_on_lastest=Max('units__modules__lessons__progress__updated_on')). \
                #     filter(units__modules__lessons__progress__updated_on=F('updated_on_lastest')). \
                #     order_by('-updated_on_lastest').distinct()
                queryset = queryset.filter(curricula_user_dashboard__profile__user=request.user)
        return queryset


class AllCurriculaView(generics.ListAPIView,):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = MiniCurriculumSerializer
    # serializer_class = CurriculumSerializer
    pagination_class = StandardResultsSetPagination

    filter_backends = (filters.OrderingFilter, DjangoFilterBackend, RecentlyFilterBackend)  # ordering and search support
    ordering_fields = ('number_of_learners_denormalized', 'published_on', 'created_on',
                       'units__modules__lessons__progress__updated_on')
    # ordering = ('-number_of_learners_denormalized',)

    def get_queryset(self):
        return Curriculum.objects.\
            select_related('author').\
            annotate(count_lessons=Count('units__modules__lessons', distinct=True)).distinct()


class RetrieveCurriculumView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = MiniCurriculumSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Curriculum.objects.filter(Q(setting_publically=True)
                                         | Q(author=self.request.user)
                                         | Q(collaborators=self.request.user.profile)).select_related('author').\
            annotate(count_lessons=Count('units__modules__lessons', distinct=True))


class CurriculumViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrCollaboratorBase)    
    serializer_class = CurriculumSerializer
    lookup_field = 'uuid'

    @action(methods=['POST'], detail=True, permission_classes=[permissions.IsAuthenticated, ])
    def add_to_dashboard(self, request, uuid):
        try:
            curriculum = Curriculum.objects.get(uuid=uuid)
        except Curriculum.DoesNotExist:
            raise NotFound()
        CurriculumUserDashboard.objects.get_or_create(
            profile=request.user.profile,
            curriculum=curriculum
        )

        return Response(status=status.HTTP_201_CREATED)

    @action(methods=['POST'], detail=True, permission_classes=[permissions.IsAuthenticated, ])
    def remove_from_dashboard(self, request, uuid):
        try:
            curriculum_user_dashboard = CurriculumUserDashboard.objects.get(profile=request.user.profile, curriculum__uuid=uuid)
        except CurriculumUserDashboard.DoesNotExist:
            raise NotFound()

        curriculum_user_dashboard.delete()

        return Response(status=status.HTTP_201_CREATED)

    def get_queryset(self):
        return Curriculum.objects.filter(Q(author=self.request.user)
                                         | Q(collaborators=self.request.user.profile)
                                         | Q(classroom__students__user=self.request.user)).\
               select_related('author').\
               annotate(count_lessons=Count('units__modules__lessons', distinct=True))

    def perform_create(self, serializer):
        new_curriculum = serializer.save(author=self.request.user)

        if 'prototype' in self.request.data and self.request.data['prototype']:
            prototype = Curriculum.objects.get(uuid=self.request.data['prototype'])
            prototype.clone(new_curriculum)

    class Meta:
        ordering = ['-published_on']

    
class UnitViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsUnitOwnerOrCollaborator)
    serializer_class = UnitSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Unit.objects.filter(Q(curriculum__author=self.request.user) |
                                   Q(curriculum__collaborators=self.request.user))

    
class ModuleViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsModuleOwnerOrCollaborator)
    serializer_class = ModuleSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Module.objects.filter(Q(unit__curriculum__author=self.request.user) |
                                     Q(unit__curriculum__collaborators=self.request.user))

    
class LessonViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsLessonOwnerOrCollaborator)
    serializer_class = LessonSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Lesson.objects.filter(Q(module__unit__curriculum__author=self.request.user) |
                                     Q(module__unit__curriculum__collaborators=self.request.user))


class QuestionViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsQuestionOwnerOrCollaborator)
    serializer_class = QuestionSerializer
    lookup_field = 'uuid'
    
    def get_queryset(self):
        return Question.objects.filter(Q(lesson__module__unit__curriculum__author=self.request.user) |
                                       Q(lesson__module__unit__curriculum__collaborators=self.request.user))

    
class AnswerViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsAnswerOwnerOrCollaborator)
    serializer_class = AnswerSerializer
    lookup_field = 'uuid'

    def get_queryset(self):
        return Answer.objects.filter(Q(question__lesson__module__unit__curriculum__author=self.request.user) |
                                     Q(question__lesson__module__unit__curriculum__collaborators=self.request.user))
