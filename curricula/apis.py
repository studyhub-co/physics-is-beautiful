import datetime

from django.utils import timezone

from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view, permission_classes

from rest_framework.permissions import AllowAny

from .models import Curriculum, Unit, Module, Lesson, Question, Game, UnitConversion
from .services import get_progress_service, LessonLocked, LessonProgress

from .serializers import QuestionSerializer, UserResponseSerializer, AnswerSerializer,\
    LessonSerializer, ScoreBoardSerializer, ModuleSerializer, UnitSerializer,\
    CurriculumSerializer, LessonProgressSerializer


class QuestionViewSet(ModelViewSet):

    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    permission_classes = []
    lookup_field = 'uuid'

    def user_response(self, request, uuid):
        question = self.get_object()
        data = {'question': question.pk, 'answered_on': timezone.now()}
        data.update(request.data)
        sr = UserResponseSerializer(data=data)
        sr.is_valid(raise_exception=True)
        kwargs = {}
        if request.user.is_authenticated():
            kwargs['profile'] = request.user.profile
        user_response = sr.get_response(**kwargs)
        service = get_progress_service(request, question.lesson)
        try:
            is_correct = service.check_user_response(user_response)
        except LessonLocked as e:
            raise serializers.ValidationError(e)
        data = LessonProgressSerializer(service.current_lesson_progress).data
        data['required_score'] = service.COMPLETION_THRESHOLD
        data['was_correct'] = is_correct
        if not is_correct:
            if user_response.content:
                data['correct_answer'] = AnswerSerializer(user_response.get_correct_answer()).data
            elif user_response.answers_list:
                data['correct_answer'] = AnswerSerializer(user_response.get_correct_answer(), many=True).data
        return Response(data)


class LessonViewSet(ModelViewSet):

    serializer_class = LessonSerializer
    queryset = Lesson.objects.all()
    lookup_field = 'uuid'

    def get_serializer_context(self):
        context = super(LessonViewSet, self).get_serializer_context()
        context['progress_service'] = get_progress_service(context['request'])
        return context

    def get_next_question(self, request, uuid):
        lesson = self.get_object()
        service = get_progress_service(request, lesson)
        previous_question = None
        previous_question_uuid = request.query_params.get('previous_question')
        if previous_question_uuid:
            previous_question = Question.objects.filter(uuid=previous_question_uuid).first()
        try:
            question = service.get_next_question(previous_question)
        except LessonLocked as e:
            raise serializers.ValidationError(e)
        if question:
            data = QuestionSerializer(question, context={'progress_service': service}).data
            # TODO: it might make more sense for these fields to be on the
            # lesson. Or a separate lesson_profress object.
            data.update(LessonProgressSerializer(service.current_lesson_progress).data)
            data['required_score'] = service.COMPLETION_THRESHOLD
            return Response(data)
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_unit_conversion_units(request):
    return Response(UnitConversion.UnitConversionUnits)


@api_view(['POST'])
@permission_classes([AllowAny])
def game_success(request, slug):
    game = Game.objects.get(slug=slug)  # TODO here is raise exception is game not found by slug and if if more than one
    service = get_progress_service(request, game.lesson)

    duration_ms = request.data.get('duration', None)
    score = request.data.get('score', None)
    if duration_ms:
        dur = datetime.timedelta(milliseconds=duration_ms)
    else:
        dur = None

    service.game_success(game, dur, score)

    if game.slug == 'unit-conversion' or game.slug == 'vector-game':  # temp fix
        # get score list for
        # try:
        scores = service.get_score_board_qs(game.lesson)
        data_scores_list = []
        current_user_in_score_list = False

        already_anon_insert = False

        for row_num, row in enumerate(scores[:10]):
            if request.user.is_authenticated:
                if request.user.profile.id == row.profile_id:
                    current_user_in_score_list = True
            else:
                if row.duration > dur or row_num == len(scores[:10])-1:
                    if not already_anon_insert:
                        currrent_user_score = LessonProgress(score=score, duration=dur, lesson=game.lesson)
                        setattr(currrent_user_score, 'row_num', row_num + 1)
                        data_scores_list.append(currrent_user_score)
                        already_anon_insert = True

                if not already_anon_insert:
                    setattr(row, 'row_num', row_num + 1)
                else:
                    setattr(row, 'row_num', row_num + 2)

            data_scores_list.append(row)

        if request.user.is_authenticated:
            if not current_user_in_score_list:
                currrent_user_score = service.get_score_board_qs(game.lesson).get(profile__user=request.user)
                position = service.get_score_board_qs(game.lesson).filter(duration__lt=currrent_user_score.duration).count()
                setattr(currrent_user_score, 'row_num', position + 1)
                data_scores_list.append(currrent_user_score)

        data = ScoreBoardSerializer(data_scores_list, many=True).data
        return Response(data)
        # except NotImplementedError:
        #     pass

    return Response(status=status.HTTP_204_NO_CONTENT)


class ModuleViewSet(ModelViewSet):

    serializer_class = ModuleSerializer
    queryset = Module.objects.all()
    lookup_field = 'uuid'

    def get_serializer_context(self):
        context = super(ModuleViewSet, self).get_serializer_context()
        context['progress_service'] = get_progress_service(context['request'])
        return context


class UnitViewSet(ModelViewSet):

    serializer_class = UnitSerializer
    queryset = Unit.objects.all()
    lookup_field = 'uuid'


class CurriculaViewSet(ModelViewSet):

    serializer_class = CurriculumSerializer
    queryset = Curriculum.objects.all()
    lookup_field = 'uuid'

    def get_serializer_context(self):
        context = super(CurriculaViewSet, self).get_serializer_context()
        context['progress_service'] = get_progress_service(context['request'])
        return context

    def get_object(self):
        lookup_id = self.kwargs.get(self.lookup_url_kwarg or self.lookup_field)
        if lookup_id and lookup_id.lower() == 'default':
            return Curriculum.objects.get_default()
        return super(CurriculaViewSet, self).get_object()
