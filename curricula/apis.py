import datetime

from django.utils import timezone

from django.db.models import Q

from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny

from .models import Curriculum, Unit, Module, Lesson, Question, Game, UnitConversion
from .services import get_progress_service, LessonLocked, LessonProgress

from .serializers import QuestionSerializer, UserResponseSerializer, AnswerSerializer,\
    LessonSerializer, ScoreBoardSerializer, ModuleSerializer, UnitSerializer,\
    CurriculumSerializer, LessonProgressSerializer


def check_classroom_progress(service, user):
    # TODO check start and due to date
    if user.is_authenticated and service.current_lesson_progress.score >= service.COMPLETION_THRESHOLD:
        from classroom.models import Assignment, AssignmentProgress
        assignments = Assignment.objects.filter(lessons__id=service.current_lesson.id)
        assignment_progress_list = AssignmentProgress.objects.filter(assignment__in=assignments,
                                                                     student__user=user,
                                                                     completed_on__isnull=True)
        for assignment_progress in assignment_progress_list:
            # user can have several assignments (from different classroom e.g.) to one lesson
            try:
                assignment_progress.completed_lessons.add(service.current_lesson)

                # do not support by mysql db
                # if assignment_progress.assignment.lessons.difference(assignment_progress.completed_lessons.all())\
                #        .count() == 0:
                completed_lessons_ids = []
                [completed_lessons_ids.append(lesson.id) for lesson in assignment_progress.completed_lessons.all()]
                difference = assignment_progress.assignment.lessons.exclude(id__in=completed_lessons_ids)
                if difference.count() == 0:
                    if timezone.now() < assignment_progress.assignment.due_on.replace():
                        assignment_progress.completed_on = datetime.datetime.now()
                    else:
                        assignment_progress.delayed_on = datetime.datetime.now()

                assignment_progress.save()  # update updated_on date

            except AssignmentProgress.DoesNotExist:
                pass


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

        check_classroom_progress(service, self.request.user)

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
def game_success(request, uuid):
    try:
        game = Game.objects.get(lesson__uuid=uuid)
    except Game.DoesNotExist:
        raise NotFound()

    service = get_progress_service(request, game.lesson)

    n = 10  # max number of results to show

    duration_ms = request.data.get('duration', None)
    score = request.data.get('score', None)
    if duration_ms:
        dur = datetime.timedelta(milliseconds=duration_ms)
    else:
        dur = None

    service.game_success(game, dur, score)

    check_classroom_progress(service, request.user)

    if game.slug == 'unit-conversion' or game.slug == 'vector-game':  # temp fix
        # get score list for
        # try:
        scores = service.get_score_board_qs(game.lesson).exclude(duration__isnull=True)
        data_scores_list = []
        user_already_in_score_list = False

        for row_num, row in enumerate(scores[:10]):
            # add score if user in top 10
            # current registered user
            if request.user.is_authenticated:
                if request.user.profile.id == row.profile_id:
                    current_user_score = service.get_score_board_qs(game.lesson).\
                                                 get(profile__user=request.user)
                    setattr(current_user_score, 'row_num', row_num + 1)
                    data_scores_list.append(current_user_score)
                    user_already_in_score_list = True
                    continue
            # current anon user
            else:
                if row.duration > dur:
                    if not user_already_in_score_list:
                        current_user_score = LessonProgress(score=score, duration=dur, lesson=game.lesson)
                        setattr(current_user_score, 'row_num', row_num + 1)
                        data_scores_list.append(current_user_score)
                        user_already_in_score_list = True
                        continue

            setattr(row, 'row_num', row_num + 1)

            if row.duration:
                data_scores_list.append(row)

        # add score if user not in top 10
        if not user_already_in_score_list:
            if request.user.is_authenticated:
                current_user_score = service.get_score_board_qs(game.lesson).get(profile__user=request.user)
            else:
                current_user_score = LessonProgress(score=score, duration=dur, lesson=game.lesson)

            position = service.get_score_board_qs(game.lesson).filter(duration__lt=current_user_score.duration).count()
            setattr(current_user_score, 'row_num', position + 1)
            data_scores_list.append(current_user_score)

        data = ScoreBoardSerializer(data_scores_list[:n], many=True).data
        return Response(data)

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

    def get_queryset(self):
        queryset = self.queryset
        filter_by = self.request.query_params.get('filter', None)
        if filter_by and self.request.user.is_authenticated():
            if filter_by == 'my':
                # todo do wee need to get curricula of user classrooms?
                queryset = queryset.filter(author=self.request.user)
            elif filter_by == 'other':
                queryset = queryset.exclude(author=self.request.user)
            elif filter_by == 'default':
                queryset = queryset.filter(author__pk=2)  # Physics Is Beautiful

        return queryset

    def get_serializer_context(self):
        context = super(CurriculaViewSet, self).get_serializer_context()
        context['progress_service'] = get_progress_service(context['request'])
        return context

    def get_object(self):
        lookup_id = self.kwargs.get(self.lookup_url_kwarg or self.lookup_field)
        if lookup_id and lookup_id.lower() == 'default':
            user = None
            if self.request.user.is_authenticated:
                user = self.request.user
            return Curriculum.objects.get_default(user=user)
        return super(CurriculaViewSet, self).get_object()
