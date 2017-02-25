from django.test import TestCase

from curricula.models import Curriculum, Unit, Module, Lesson, Question

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
