from unittest.mock import Mock

from django.test.testcases import TestCase

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
        self.lesson = factories.Lesson()
        self.questions = factories.Question.create_batch(4, lesson=self.lesson)
        for q in self.questions:
            factories.TextAnswer(question=q, is_correct=True)
        self.profile = None

    def _run_service_test(self, service):
        for q in self.questions:
            self.assertEqual(q, service.get_next_question())
            user_response = UserResponse(
                question=q, content=q.answers.first().content, profile=self.profile
            )
            service.check_answer(user_response)
        for q in self.questions:
            self.assertEqual(q, service.get_next_question())
            user_response = UserResponse(
                question=q, content=q.answers.first().content, profile=self.profile
            )
            service.check_answer(user_response)

    def test_get_next_question_anonymouse_user(self):
        mock_session = {}
        service = AnonymousProgressService(Mock(), self.lesson, session=mock_session)
        self._run_service_test(service)

    def test_get_next_question_authed_user(self):
        self.profile = profile_factories.Profile()
        service = ProgressService(self.profile.user, self.lesson)
        self._run_service_test(service)
        # we responded to each question twice
        self.assertEqual(UserResponse.objects.count(), len(self.questions) * 2)
