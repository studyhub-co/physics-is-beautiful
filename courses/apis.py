import datetime

from django.utils import timezone

# from django.db.models import Q
from django.db.models import F

from rest_framework import serializers, status, permissions, mixins
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Course, Unit, Module, Lesson, Material, MaterialProblemType
from .services import get_progress_service, LessonLocked, LessonProgress

from .serializers import MaterialSerializer, UserReactionSerializer, \
    LessonSerializer, ScoreBoardSerializer, ModuleSerializer, UnitSerializer,\
    CourseSerializer, LessonProgressSerializer

from .djeddit import create_thread


def check_classroom_progress(service, user):
    if user.is_authenticated and service.current_lesson_progress.score >= service.COMPLETION_THRESHOLD:
        from classroom.models import AssignmentProgress

        AssignmentProgress.objects.recalculate_status_by_lesson(service.current_lesson, user)


class MaterialViewSet(ModelViewSet):

    serializer_class = MaterialSerializer
    queryset = Material.objects.all()
    permission_classes = []  # TODO
    lookup_field = 'uuid'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # see also LessonViewSet.get_next_question
        new_thread = create_thread(instance)
        if new_thread:
            Material.objects.filter(pk=instance.pk).update(thread=new_thread)

        # increment view count TODO
        # if new_thread:
        #     # save new thread in probllem
        #     Question.objects.filter(pk=instance.pk).update(count_views=F('count_views') + 1, thread=new_thread)
        # else:
        #     Question.objects.filter(pk=instance.pk).update(count_views=F('count_views') + 1)

        return super(MaterialViewSet, self).retrieve(request, *args, **kwargs)

    def user_reaction(self, request, uuid):
        material = self.get_object()  # self is an instance of the material with the matching uuid
        data = {'material': material.pk, 'answered_on': timezone.now()}
        data.update(request.data)

        # kwargs = {}
        # authenticated user
        if request.user.is_authenticated:
            # kwargs['profile'] = request.user.profile
            data['profile'] = request.user.profile.pk
        else:
            # anon user
            if not request.session.session_key:
                request.session.create()
            session = request.session
            # kwargs['anon_session_key'] = session.session_key
            data['anon_session_key'] = session.session_key

        user_reaction_serializer = UserReactionSerializer(data=data)
        user_reaction_serializer.is_valid(raise_exception=True)
        # user_reaction = user_reaction_serializer.get_response(**kwargs)
        user_reaction = user_reaction_serializer.save()
        service = get_progress_service(request, material.lesson)
        try:
            is_correct = service.check_user_reaction(user_reaction)
        except LessonLocked as e:
            raise serializers.ValidationError(e)

        if is_correct is None:
            raise serializers.NotFound('validate.js for this material problem type was not found')

        data = LessonProgressSerializer(service.current_lesson_progress).data

        check_classroom_progress(service, self.request.user)

        data['required_score'] = service.COMPLETION_THRESHOLD
        data['was_correct'] = is_correct
        if not is_correct:
            data['correct_data'] = material.data
            # if user_reaction.content:
            #     data['correct_data'] = AnswerSerializer(user_reaction.get_correct_data()).data
            # elif user_reaction.answers_list:
            #     data['correct_data'] = AnswerSerializer(user_reaction.get_correct_data(), many=True).data
        return Response(data)

    def service_request(self, request, uuid):
        if 'type' in request.query_params and request.query_params['type'] == 'execute_mysql':
            question = self.get_object()
            if question.answer_type != Material.AnswerType.MYSQL or 'value' not in request.data:
                raise ValidationError({'error': 'Initial data validation error'})
            answer = question.answers.first()
            try:
                return Response({
                    'json_mysql_result': answer.content.get_json_from_sql(str(request.data['value']))
                })
            except Exception as e:
                raise ValidationError({'error': '{}'.format(e)})

        else:
            raise NotFound


def remove_hidden_data(data):
    if not isinstance(data, dict):
        return data

    # remove 'hiddenFields' from data
    for key in data.keys():
        if isinstance(data[key], list):
            # replace fields in lists
            for index, sub_data in enumerate(data[key]):
                data[key][index] = remove_hidden_data(sub_data)
        # replace fields in child object
        data[key] = remove_hidden_data(data[key])

    if 'hiddenFields' in data:
        # dict with key / default (reseted) value
        if isinstance(data['hiddenFields'], dict):
            for key in data['hiddenFields'].keys():
                # replace date with reseted value
                data[key] = data['hiddenFields'][key]
                # data[hidden_field] = None
    return data


class LessonViewSet(ModelViewSet):

    serializer_class = LessonSerializer
    queryset = Lesson.objects.all()
    lookup_field = 'uuid'

    def get_serializer_context(self):
        context = super(LessonViewSet, self).get_serializer_context()
        context['progress_service'] = get_progress_service(context['request'])
        return context

    def get_next_material(self, request, uuid):
        lesson = self.get_object()
        service = get_progress_service(request, lesson)
        previous_material = None
        previous_material_uuid = request.query_params.get('previous_material')
        if previous_material_uuid:
            previous_material = Material.objects.filter(uuid=previous_material_uuid).first()
        try:
            material = service.get_next_material(previous_material)
        except LessonLocked as e:
            raise serializers.ValidationError(e)
        if material:
            new_thread = create_thread(material)
            if new_thread:
                Material.objects.filter(pk=material.pk).update(thread=new_thread)
                material.thread = new_thread
            # data = {}
            data = MaterialSerializer(material, context={'progress_service': service}).data
            # TODO: it might make more sense for these fields to be on the
            # lesson. Or a separate lesson_progress object.
            data.update(LessonProgressSerializer(service.current_lesson_progress).data)
            data['required_score'] = service.COMPLETION_THRESHOLD
            # remove hidden fields data (i.g. selected choice) from JSON DATA
            data['data'] = remove_hidden_data(data['data'])
            return Response(data)
        return Response(status=status.HTTP_204_NO_CONTENT)


# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_unit_conversion_units(request):
#     return Response(UnitConversion.UnitConversionUnits)
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def game_success(request, uuid):
#     try:
#         game = Game.objects.get(lesson__uuid=uuid)
#     except Game.DoesNotExist:
#         raise NotFound()
#
#     service = get_progress_service(request, game.lesson)
#
#     n = 10  # max number of results to show
#
#     duration_ms = request.data.get('duration', None)
#     score = request.data.get('score', None)
#     if duration_ms:
#         dur = datetime.timedelta(milliseconds=duration_ms)
#     else:
#         dur = None
#
#     service.game_success(game, dur, score)
#
#     check_classroom_progress(service, request.user)
#
#     if game.slug == 'unit-conversion' or game.slug == 'vector-game':  # temp fix
#         # get score list for
#         # try:
#         scores = service.get_score_board_qs(game.lesson).exclude(duration__isnull=True)
#         data_scores_list = []
#         user_already_in_score_list = False
#
#         for row_num, row in enumerate(scores[:10]):
#             # add score if user in top 10
#             # current registered user
#             if request.user.is_authenticated:
#                 if request.user.profile.id == row.profile_id:
#                     current_user_score = service.get_score_board_qs(game.lesson).\
#                                                  get(profile__user=request.user)
#                     setattr(current_user_score, 'row_num', row_num + 1)
#                     data_scores_list.append(current_user_score)
#                     user_already_in_score_list = True
#                     continue
#             # current anon user
#             else:
#                 if row.duration > dur:
#                     if not user_already_in_score_list:
#                         current_user_score = LessonProgress(score=score, duration=dur, lesson=game.lesson)
#                         setattr(current_user_score, 'row_num', row_num + 1)
#                         data_scores_list.append(current_user_score)
#                         user_already_in_score_list = True
#                         continue
#
#             setattr(row, 'row_num', row_num + 1)
#
#             if row.duration:
#                 data_scores_list.append(row)
#
#         # add score if user not in top 10
#         if not user_already_in_score_list:
#             if request.user.is_authenticated:
#                 current_user_score = service.get_score_board_qs(game.lesson).get(profile__user=request.user)
#             else:
#                 current_user_score = LessonProgress(score=score, duration=dur, lesson=game.lesson)
#
#             position = service.get_score_board_qs(game.lesson).filter(duration__lt=current_user_score.duration).count()
#             setattr(current_user_score, 'row_num', position + 1)
#             data_scores_list.append(current_user_score)
#
#         data = ScoreBoardSerializer(data_scores_list[:n], many=True).data
#         return Response(data)
#
#     return Response(status=status.HTTP_204_NO_CONTENT)


class ModuleViewSet(ModelViewSet):

    serializer_class = ModuleSerializer
    queryset = Module.objects.all()
    lookup_field = 'uuid'

    def get_serializer_context(self):
        context = super(ModuleViewSet, self).get_serializer_context()
        context['progress_service'] = get_progress_service(context['request'])
        return context


class UnitViewSet(ModelViewSet):

    def get_serializer_context(self):
        context = super(UnitViewSet, self).get_serializer_context()
        context['progress_service'] = get_progress_service(context['request'])
        return context

    serializer_class = UnitSerializer
    queryset = Unit.objects.all()
    lookup_field = 'uuid'


class CourseViewSet(ModelViewSet):

    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    lookup_field = 'uuid'

    def get_queryset(self):
        queryset = self.queryset
        filter_by = self.request.query_params.get('filter', None)
        if filter_by and self.request.user.is_authenticated:
            if filter_by == 'my':
                # todo do we need to get courses of user classrooms?
                queryset = queryset.filter(author=self.request.user)
            elif filter_by == 'other':
                queryset = queryset.exclude(author=self.request.user)
            elif filter_by == 'default':
                # we have
                # queryset = queryset.filter(author__pk=2)
                queryset = queryset.filter(is_default=True)

        return queryset

    def get_serializer_context(self):
        context = super(CourseViewSet, self).get_serializer_context()
        context['progress_service'] = get_progress_service(context['request'])
        return context

    def get_object(self):
        lookup_id = self.kwargs.get(self.lookup_url_kwarg or self.lookup_field)
        # if lookup_id and lookup_id.lower() == 'default':
        # let's UUID('00000000-0000-0000-0000-000000000000') will be default
        if lookup_id and lookup_id.int == 0:
            user = None
            if self.request.user.is_authenticated:
                user = self.request.user
            return Course.objects.get_default(user=user)
        return super(CourseViewSet, self).get_object()
