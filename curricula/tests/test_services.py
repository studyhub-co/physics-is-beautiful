from unittest.mock import Mock

from django.test.testcases import TestCase
from django.utils import timezone

from curricula.services import get_progress_service, ProgressService, AnonymousProgressService
from curricula.models import UserResponse, LessonProgress

from profiles.tests import factories as profile_factories
from . import factories


class ProgressServiceGetTests(TestCase):

    def test_get_progress_service(self):
        mock_request = Mock()

        mock_request.user.is_authenticated.return_value = False
        service = get_progress_service(mock_request, Mock())
        self.assertIsInstance(service, AnonymousProgressService)

        mock_request.user.is_authenticated.return_value = True
        service = get_progress_service(mock_request, Mock())
        self.assertIsInstance(service, ProgressService)


class ProgressServiceTests(TestCase):

    def setUp(self):
        self.lesson = factories.Lesson(position=0, module__position=0)
        self.questions = factories.Question.create_batch(4, lesson=self.lesson)
        for q in self.questions:
            factories.TextAnswer(question=q, is_correct=True)
        self.profile = None

    def _run_service_test(self, service):
        prev_question = None
        for q in self.questions:
            self.assertEqual(q, service.get_next_question(prev_question))
            user_response = UserResponse(
                question=q,
                content=q.answers.first().content,
                profile=self.profile,
                answered_on=timezone.now()
            )
            service.check_user_response(user_response)
            prev_question = q
        prev_question = None
        for q in self.questions:
            self.assertEqual(q, service.get_next_question(prev_question))
            user_response = UserResponse(
                question=q,
                content=q.answers.first().content,
                profile=self.profile,
                answered_on=timezone.now()
            )
            service.check_user_response(user_response)
            prev_question = q

    def test_get_next_question_anonymouse_user(self):
        mock_session = {}
        service = AnonymousProgressService(Mock(), session=mock_session, current_lesson=self.lesson)
        self._run_service_test(service)

    def test_get_next_question_authed_user(self):
        mock_request = Mock()
        mock_request.user = profile_factories.User()
        self.profile = mock_request.user.profile
        service = ProgressService(mock_request, current_lesson=self.lesson)
        service.unlock_lesson(self.lesson)
        self._run_service_test(service)
        # we responded to each question twice
        self.assertEqual(UserResponse.objects.count(), len(self.questions) * 2)

    def _run_completion_test(self, service, second_service, second_lesson):
        # first lesson gets unlocked automagically
        self.assertEqual(service.get_lesson_status(self.lesson), LessonProgress.Status.UNLOCKED)

        # other lesson
        self.assertEqual(
            second_service.get_lesson_status(second_lesson), LessonProgress.Status.LOCKED
        )

        second_service.unlock_lesson(second_lesson)
        self.assertEqual(
            second_service.get_lesson_status(second_lesson), LessonProgress.Status.UNLOCKED
        )

        q = self.questions[0]
        user_response = UserResponse(
            question=q,
            content=q.answers.first().content,
            profile=self.profile,
            answered_on=timezone.now()
        )
        second_service.check_user_response(user_response)
        second_service.save()
        self.assertEqual(
            second_service.get_lesson_status(second_lesson), LessonProgress.Status.UNLOCKED
        )

        # let's complte this lesson
        for _ in range(10):
            second_service.check_user_response(user_response)
            second_service.save()

        self.assertEqual(
            second_service.get_lesson_status(second_lesson), LessonProgress.Status.COMPLETE
        )

    def test_lesson_locking_completion_anonymous_user(self):
        mock_session = {}
        service = AnonymousProgressService(Mock(), session=mock_session, current_lesson=self.lesson)
        lesson = factories.Lesson(module=self.lesson.module)
        second_service = AnonymousProgressService(
            Mock(), session=mock_session, current_lesson=lesson
        )
        self._run_completion_test(service, second_service, lesson)

    def test_lesson_locking_completion_authed_user(self):
        mock_request = Mock()
        mock_request.user = profile_factories.User()
        self.profile = mock_request.user.profile
        service = ProgressService(mock_request, current_lesson=self.lesson)
        lesson = factories.Lesson(module=self.lesson.module)
        second_service = ProgressService(mock_request, current_lesson=lesson)
        self._run_completion_test(service, second_service, lesson)

    def run_insertion_test(self, service):
        # complete and unlock the first 2 lessons
        lesson_one = factories.Lesson()
        lesson_two = factories.Lesson(module=lesson_one.module)
        service.unlock_lesson(lesson_one)
        service.get_lesson_progress(lesson_one).complete()
        service.unlock_lesson(lesson_two)
        service.save()

        # now insert a new lesson between lesson 1 and 2
        lesson_two.position = 3
        lesson_two.save()
        new_lesson = factories.Lesson(module=lesson_one.module, position=2)
        self.assertEqual(service.get_lesson_status(new_lesson), LessonProgress.Status.NEW)

    def test_inserting_new_lesson_anonymous_user(self):
        mock_session = {}
        service = AnonymousProgressService(Mock(), session=mock_session)
        self.run_insertion_test(service)

    def test_inserting_new_lesson_authed_user(self):
        mock_request = Mock()
        mock_request.user = profile_factories.User()
        service = ProgressService(mock_request, current_lesson=self.lesson)
        self.run_insertion_test(service)
