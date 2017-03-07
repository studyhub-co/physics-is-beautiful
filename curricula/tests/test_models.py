import math

from django.test import TestCase

from curricula.models import Curriculum, Unit, Module, Lesson, Question, Answer, UserResponse

from curricula.tests import factories
import profiles.tests.factories as profile_factories


class CurriculumTests(TestCase):

    def test_get_default(self):
        with self.assertRaises(Curriculum.DoesNotExist):
            self.assertIsNone(Curriculum.objects.get_default())
        c = factories.Curriculum()
        with self.assertRaises(Curriculum.DoesNotExist):
            self.assertIsNone(Curriculum.objects.get_default())
        c = factories.Curriculum(name=Curriculum.Name.DEFAULT)
        self.assertEqual(c, Curriculum.objects.get_default())


class PositionTestMixin(object):

    def _test_position_save(self, Class, **kwargs):
        # create various scenarios for testing
        Class.objects.create(position=1, **kwargs)
        Class.objects.create(position=3, **kwargs)
        Class.objects.create(position=4, **kwargs)

        # first object crated without specifying should fill the 0 spot
        o = Class.objects.create(**kwargs)
        self.assertEqual(o.position, 0)

        # second object should take index 2
        o = Class.objects.create(**kwargs)
        self.assertEqual(o.position, 2)

        # third object should take index 5
        o = Class.objects.create(**kwargs)
        self.assertEqual(o.position, 5)


class UnitTests(PositionTestMixin, TestCase):

    def test_position_save(self):
        self._test_position_save(Unit, curriculum=factories.Curriculum())


class ModuleTests(PositionTestMixin, TestCase):

    def test_position_save(self):
        self._test_position_save(Module, unit=factories.Unit())


class LessonTests(PositionTestMixin, TestCase):

    def test_position_save(self):
        self._test_position_save(Lesson, module=factories.Module())


class QuestionTests(PositionTestMixin, TestCase):

    def test_position_save(self):
        self._test_position_save(Question, lesson=factories.Lesson())

    def test_answer_type_switch(self):
        q = factories.Question(
            answer_type=Question.AnswerType.TEXT,
            question_type=Question.QuestionType.MULTIPLE_CHOICE
        )
        factories.TextAnswer.create_batch(4, question=q)
        self.assertEqual(q.answers.count(), 4)
        q.answer_type = Question.AnswerType.TEXT
        q.save()
        self.assertEqual(q.answers.count(), 4)
        q.answer_type = Question.AnswerType.VECTOR
        q.save()
        self.assertFalse(q.answers.exists())

    def test_question_type_switch(self):
        q = factories.Question(
            answer_type=Question.AnswerType.TEXT,
            question_type=Question.QuestionType.MULTIPLE_CHOICE,
        )
        # create sequentially to have positions assigned properly.
        factories.TextAnswer(question=q, position=0)
        factories.TextAnswer(question=q, position=1)
        factories.TextAnswer(question=q, position=2)
        factories.TextAnswer(question=q, position=3)
        self.assertEqual(q.answers.count(), 4)
        q.question_type = Question.QuestionType.MULTIPLE_CHOICE
        q.save()
        self.assertEqual(q.answers.count(), 4)
        q.question_type = Question.QuestionType.SINGLE_ANSWER
        q.save()
        self.assertEqual(q.answers.count(), 1)
        a = q.answers.first()
        self.assertTrue(a.is_correct)

    def test_question_type_switch_no_answer(self):
        q = factories.Question(
            answer_type=Question.AnswerType.TEXT,
            question_type=Question.QuestionType.MULTIPLE_CHOICE,
        )
        q.question_type = Question.QuestionType.SINGLE_ANSWER
        q.save()
        q.refresh_from_db()
        self.assertEqual(q.question_type, Question.QuestionType.SINGLE_ANSWER)


class AnswerTests(TestCase):

    def test_get_correct(self):
        q = factories.Question(question_type=Question.QuestionType.MULTIPLE_CHOICE)
        with self.assertRaises(Answer.DoesNotExist):
            q.answers.get_correct()
        a = factories.TextAnswer(question=q, is_correct=False)
        with self.assertRaises(Answer.DoesNotExist):
            q.answers.get_correct()
        a = factories.TextAnswer(question=q, is_correct=True)
        self.assertEqual(a, q.answers.get_correct())

    def test_save_is_correct(self):
        q = factories.Question(question_type=Question.QuestionType.SINGLE_ANSWER)
        a = factories.TextAnswer(question=q, is_correct=False)
        self.assertTrue(a.is_correct)
        q = factories.Question(question_type=Question.QuestionType.MULTIPLE_CHOICE)
        a = factories.TextAnswer(question=q, is_correct=False)
        self.assertFalse(a.is_correct)


class TextTests(TestCase):

    def test_matches_text(self):
        t1 = factories.Text(text='Test One')
        t2 = factories.Text(text='Test Two')
        t3 = factories.Text(text='test one')
        self.assertTrue(t1.matches(t1))
        self.assertTrue(t2.matches(t2))
        self.assertTrue(t3.matches(t3))
        self.assertTrue(t1.matches(t3))

        self.assertFalse(t1.matches(t2))
        self.assertFalse(t2.matches(t3))

    def test_matches_answer(self):
        t1 = factories.Text(text='Test One')
        t2 = factories.Text(text='Test Two')
        t3 = factories.Text(text='test one')
        a1 = factories.TextAnswer(content=t1)
        a2 = factories.TextAnswer(content=t2)
        a3 = factories.TextAnswer(content=t3)
        self.assertTrue(t1.matches(a1))
        self.assertTrue(t2.matches(a2))
        self.assertTrue(t3.matches(a3))
        self.assertTrue(t1.matches(a3))

        self.assertFalse(t1.matches(a2))
        self.assertFalse(t2.matches(a3))


class VectorTests(TestCase):

    def test_matches_angle_vector(self):
        angle_vectors = [
            factories.AngleVector(angle=0),
            factories.AngleVector(angle=90),
            factories.AngleVector(angle=180),
            factories.AngleVector(angle=270),
        ]

        component_vectors = [
            factories.ComponentVector(x_component=1, y_component=0),
            factories.ComponentVector(x_component=0, y_component=1),
            factories.ComponentVector(x_component=-1, y_component=0),
            factories.ComponentVector(x_component=0, y_component=-1),
        ]

        for i, av in enumerate(angle_vectors):
            for j, cv in enumerate(component_vectors):
                if i == j:
                    self.assertTrue(av.matches(cv), '{} != {} unexpectedly.'.format(av, cv))
                else:
                    self.assertFalse(av.matches(cv), '{} == {} unexpectedly.'.format(av, cv))

        answers = [
            factories.VectorAnswer(content=component_vectors[0]),
            factories.VectorAnswer(content=component_vectors[1]),
            factories.VectorAnswer(content=component_vectors[2]),
            factories.VectorAnswer(content=component_vectors[3]),
        ]

        for i, av in enumerate(angle_vectors):
            for j, ans in enumerate(answers):
                if i == j:
                    self.assertTrue(av.matches(ans), '{} != {} unexpectedly.'.format(av, ans))
                else:
                    self.assertFalse(av.matches(ans), '{} == {} unexpectedly.'.format(av, ans))

    def test_matches_magnitude_vector(self):
        magnitude_vectors = [
            factories.MagnitudeVector(magnitude=1),
            factories.MagnitudeVector(magnitude=2),
            factories.MagnitudeVector(magnitude=3),
        ]

        component_vectors = [
            [
                factories.ComponentVector(x_component=0, y_component=1),
                factories.ComponentVector(x_component=1, y_component=0),
            ],
            [
                factories.ComponentVector(x_component=0, y_component=2),
                factories.ComponentVector(x_component=2, y_component=0),
            ],
            [
                factories.ComponentVector(x_component=0, y_component=3),
                factories.ComponentVector(x_component=3, y_component=0),
            ],
        ]

        for i, mv in enumerate(magnitude_vectors):
            for j, cvs in enumerate(component_vectors):
                for cv in cvs:
                    if i == j:
                        self.assertTrue(mv.matches(cv))
                    else:
                        self.assertFalse(mv.matches(cv))

        [
            [
                factories.VectorAnswer(content=component_vectors[0][0]),
                factories.VectorAnswer(content=component_vectors[0][1]),
            ],
            [
                factories.VectorAnswer(content=component_vectors[1][0]),
                factories.VectorAnswer(content=component_vectors[1][1]),
            ],
            [
                factories.VectorAnswer(content=component_vectors[2][0]),
                factories.VectorAnswer(content=component_vectors[2][1]),
            ],
        ]

    def test_matches_null(self):
        null_vector = factories.NullVector()

        null_like_vectors = [
            factories.MagnitudeVector(magnitude=0),
            factories.ComponentVector(x_component=0, y_component=0),
        ]

        for v in null_like_vectors:
            self.assertTrue(v.is_null)
            self.assertTrue(null_vector.matches(v)), '{} != {}'.format(null_vector, v)
            self.assertTrue(v.matches(null_vector), '{} != {}'.format(v, null_vector))

    def test_angle_vector_for_display(self):
        av = factories.AngleVector(angle=0)
        self.assertEqual(av.angle, 0)
        self.assertIsNone(av.magnitude)
        self.assertIsNone(av.x_component)
        self.assertIsNone(av.y_component)
        v = av.for_display()
        self.assertEqual(v['angle'], 0)
        self.assertEqual(v['magnitude'], 1)
        self.assertEqual(v['x_component'], 1)
        self.assertEqual(v['y_component'], 0)

        av = factories.AngleVector(angle=90)
        self.assertEqual(av.angle, 90)
        self.assertIsNone(av.magnitude)
        self.assertIsNone(av.x_component)
        self.assertIsNone(av.y_component)

        v = av.for_display()
        self.assertEqual(v['angle'], 90)
        self.assertEqual(v['magnitude'], 1)
        self.assertEqual(int(v['x_component']), 0)
        self.assertEqual(int(v['y_component']), 1)

        av = factories.AngleVector(angle=180)
        self.assertEqual(av.angle, 180)
        self.assertIsNone(av.magnitude)
        self.assertIsNone(av.x_component)
        self.assertIsNone(av.y_component)
        v = av.for_display()
        self.assertEqual(v['angle'], 180)
        self.assertEqual(v['magnitude'], 1)
        self.assertEqual(int(v['x_component']), -1)
        self.assertEqual(int(v['y_component']), 0)

        av = factories.AngleVector(angle=270)
        self.assertEqual(av.angle, 270)
        self.assertIsNone(av.magnitude)
        self.assertIsNone(av.x_component)
        self.assertIsNone(av.y_component)
        v = av.for_display()
        self.assertEqual(v['angle'], 270)
        self.assertEqual(v['magnitude'], 1)
        self.assertEqual(int(v['x_component']), 0)
        self.assertEqual(int(v['y_component']), -1)

    def test_magnitude_vector_for_display(self):
        mv = factories.MagnitudeVector(magnitude=0.0)
        self.assertTrue(mv.is_null)

        mv = factories.MagnitudeVector(magnitude=1.0)
        self.assertIsNone(mv.angle)
        self.assertIsNone(mv.x_component)
        self.assertIsNone(mv.y_component)
        v = mv.for_display()
        self.assertEqual(v['magnitude'], 1)
        self.assertEqual(v['angle'], 0)
        self.assertEqual(int(v['x_component']), 1)
        self.assertEqual(int(v['y_component']), 0)

        mv = factories.MagnitudeVector(magnitude=2.0)
        self.assertIsNone(mv.angle)
        self.assertIsNone(mv.x_component)
        self.assertIsNone(mv.y_component)
        v = mv.for_display()
        self.assertEqual(v['magnitude'], 2)
        self.assertEqual(v['angle'], 0)
        self.assertEqual(int(v['x_component']), 2)
        self.assertEqual(int(v['y_component']), 0)

    def test_component_vector_for_display(self):
        cv = factories.ComponentVector(x_component=0, y_component=0)
        self.assertTrue(cv.is_null)

        cv = factories.ComponentVector(x_component=1, y_component=0)
        self.assertIsNone(cv.angle)
        self.assertIsNone(cv.magnitude)
        self.assertIsNotNone(cv.x_component)
        self.assertIsNotNone(cv.y_component)
        v = cv.for_display()
        self.assertEqual(int(v['angle']), 0)
        self.assertEqual(int(v['magnitude']), 1)
        self.assertEqual(int(v['x_component']), 1)
        self.assertEqual(int(v['y_component']), 0)

        cv = factories.ComponentVector(x_component=0, y_component=1)
        self.assertIsNone(cv.angle)
        self.assertIsNone(cv.magnitude)
        self.assertIsNotNone(cv.x_component)
        self.assertIsNotNone(cv.y_component)
        v = cv.for_display()
        self.assertEqual(int(v['angle']), 90)
        self.assertEqual(int(v['magnitude']), 1)
        self.assertEqual(int(v['x_component']), 0)
        self.assertEqual(int(v['y_component']), 1)

        cv = factories.ComponentVector(x_component=-1, y_component=0)
        self.assertIsNone(cv.angle)
        self.assertIsNone(cv.magnitude)
        self.assertIsNotNone(cv.x_component)
        self.assertIsNotNone(cv.y_component)
        v = cv.for_display()
        self.assertEqual(int(v['angle']), 180)
        self.assertEqual(int(v['magnitude']), 1)
        self.assertEqual(int(v['x_component']), -1)
        self.assertEqual(int(v['y_component']), 0)

        cv = factories.ComponentVector(x_component=0, y_component=-1)
        self.assertIsNone(cv.angle)
        self.assertIsNone(cv.magnitude)
        self.assertIsNotNone(cv.x_component)
        self.assertIsNotNone(cv.y_component)
        v = cv.for_display()
        self.assertEqual(int(v['angle']), 270)
        self.assertEqual(int(v['magnitude']), 1)
        self.assertEqual(int(v['x_component']), 0)
        self.assertEqual(int(v['y_component']), -1)

        cv = factories.ComponentVector(x_component=1, y_component=1)
        self.assertIsNone(cv.angle)
        self.assertIsNone(cv.magnitude)
        self.assertIsNotNone(cv.x_component)
        self.assertIsNotNone(cv.y_component)
        v = cv.for_display()
        self.assertEqual(v['angle'], 45)
        self.assertEqual(v['magnitude'], math.sqrt(2))
        self.assertEqual(int(v['x_component']), 1)
        self.assertEqual(int(v['y_component']), 1)


class UserResponseTest(TestCase):

    def test_single_answer(self):
        question = factories.Question(
            question_type=Question.QuestionType.SINGLE_ANSWER,
            answer_type=Question.AnswerType.VECTOR,
        )
        factories.VectorAnswer(question=question, content__angle=90)
        wrong = factories.Vector(angle=10)
        right = factories.Vector(angle=90)
        wrong_response = UserResponse.objects.create(
            profile=profile_factories.User().profile,
            question=question,
            content=wrong
        )
        self.assertFalse(wrong_response.check_response())
        self.assertFalse(wrong_response.is_correct)
        self.assertIsNotNone(wrong_response.answered_on)
        right_response = UserResponse.objects.create(
            profile=profile_factories.User().profile,
            question=question,
            content=right
        )
        self.assertTrue(right_response.check_response())
        self.assertTrue(right_response.is_correct)
        self.assertIsNotNone(right_response.answered_on)

    def test_multiple_choice(self):
        question = factories.Question(
            question_type=Question.QuestionType.MULTIPLE_CHOICE,
            answer_type=Question.AnswerType.TEXT,
        )
        a1 = factories.TextAnswer(question=question, content__text='One', is_correct=True)
        a2 = factories.TextAnswer(question=question, content__text='Two')
        a3 = factories.TextAnswer(question=question, content__text='Three')
        a4 = factories.TextAnswer(question=question, content__text='Four')
        wrong_responses = [
            UserResponse.objects.create(
                profile=profile_factories.User().profile,
                question=question,
                content=a,
            ) for a in [a2, a3, a4]
        ]
        right_response = UserResponse.objects.create(
            profile=profile_factories.User().profile,
            question=question,
            content=a1,
        )
        for r in wrong_responses:
            self.assertFalse(r.check_response())
            self.assertFalse(r.is_correct)
            self.assertIsNotNone(r.answered_on)

        self.assertTrue(right_response.check_response())
        self.assertTrue(right_response.is_correct)
        self.assertIsNotNone(right_response.answered_on)
