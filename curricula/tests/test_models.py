from django.test import TestCase
from django.core.exceptions import ValidationError

from curricula.models import Curriculum, Unit, Module, Lesson, Question, Answer

from curricula.tests import factories


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
        q.question_type=Question.QuestionType.SINGLE_ANSWER
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

        answers = [
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
            self.assertTrue(null_vector.matches(v))

    def test_for_display(self):
        # TODO: implement
        pass


class UserResponseTest(TestCase):

    # TODO: implement
    pass
