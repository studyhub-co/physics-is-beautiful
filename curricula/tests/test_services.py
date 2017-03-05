from unittest.mock import Mock

from django.test.testcases import TestCase
from django.utils import timezone

from curricula.services import get_progress_service, ProgressService, AnonymousProgressService
from curricula.models import UserResponse

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
        self.assertFalse(service.check_lesson_locked(self.lesson))
        self.assertFalse(service.check_lesson_completed(self.lesson))

        # other lesson
        self.assertTrue(second_service.check_lesson_locked(second_lesson))
        self.assertFalse(second_service.check_lesson_completed(second_lesson))

        second_service.unlock_lesson(second_lesson)
        self.assertFalse(second_service.check_lesson_locked(second_lesson))
        self.assertFalse(second_service.check_lesson_completed(second_lesson))

        q = self.questions[0]
        user_response = UserResponse(
            question=q,
            content=q.answers.first().content,
            profile=self.profile,
            answered_on=timezone.now()
        )
        second_service.check_user_response(user_response)
        second_service.save()
        self.assertFalse(second_service.check_lesson_locked(second_lesson))
        self.assertFalse(second_service.check_lesson_completed(second_lesson))

        # let's complte this lesson
        for _ in range(10):
            second_service.check_user_response(user_response)
            second_service.save()

        self.assertFalse(second_service.check_lesson_locked(second_lesson))
        self.assertTrue(second_service.check_lesson_completed(second_lesson))

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
