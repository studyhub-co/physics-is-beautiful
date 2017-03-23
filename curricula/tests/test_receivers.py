from unittest.mock import Mock

from django.test import TestCase
from django.utils import timezone

from curricula.receivers import transfer_lesson_progress
from curricula.models import UserResponse, LessonProgress

from curricula.tests import factories
from profiles.tests import factories as profile_factories


class ReceiverTests(TestCase):

    def test_transfer_lesson_progress_nothing_done(self):
        mock_session = {}
        self.assertFalse(LessonProgress.objects.exists())
        self.assertFalse(UserResponse.objects.exists())
        request = Mock(session=mock_session)
        user = profile_factories.User()
        transfer_lesson_progress(request, user)
        self.assertFalse(LessonProgress.objects.exists())
        self.assertFalse(UserResponse.objects.exists())

    def test_transfer_lesson_progress_some_actions(self):
        mock_session = {'lessons': {}}
        lessons = factories.Lesson.create_batch(2)
        for l in lessons:
            questions = factories.Question.create_batch(2)
            responses = [
                {
                    'question': q.pk,
                    'content_type': 14,
                    'content': {'text': 'Random Text'},
                    'is_correct': True,
                    'answered_on': timezone.now().isoformat()
                } for q in questions
            ]
            mock_session['lessons'][str(l.pk)] = {
                'score': 0,
                'status': 0,
                'completed_on': None,
                'responses': responses,
            }
        self.assertFalse(LessonProgress.objects.exists())
        self.assertFalse(UserResponse.objects.exists())
        request = Mock(session=mock_session)
        user = profile_factories.User()
        transfer_lesson_progress(request, user)
        self.assertEqual(LessonProgress.objects.count(), 2)
        self.assertEqual(UserResponse.objects.count(), 4)
