from django.utils import timezone

from django_webtest import WebTest

from curricula.models import Curriculum, Question
from curricula.services import ProgressServiceBase

import profiles.tests.factories as profile_factories
from curricula.tests import factories


class ValidateQuestionsMixin(object):

    def validate_question(self, question_response, question):
        self.assertEqual(question_response.pop('uuid'), question.uuid)
        self.assertEqual(question_response.pop('text'), question.text)
        self.assertEqual(question_response.pop('hint'), question.hint)
        self.assertEqual(question_response.pop('image'), question.image if question.image else None)
        self.assertEqual(
            question_response.pop('required_score'),
            ProgressServiceBase.COMPLETION_THRESHOLD
        )
        question_type = question_response.pop('question_type')
        self.assertEqual(question_type, Question.QuestionType.get_name(question.question_type))
        self.assertEqual(
            question_response.pop('answer_type'),
            Question.QuestionType.get_name(question.answer_type)
        )
        if question_type == Question.QuestionType.MULTIPLE_CHOICE:
            self.assertEqual(
                question_response.pop('choices'),
                question.answers.all().values_list('uuid', flat=True)
            )
        else:
            self.assertIsNone(question_response.pop('choices'))
        # score tracking is tested in the services tests.
        question_response.pop('score')
        self.assertFalse(question_response)


class ValidateLessonsMixin(object):

    def validate_lesson(self, lesson_response, lesson):
        self.assertEqual(lesson_response.pop('uuid'), lesson.uuid)
        self.assertEqual(lesson_response.pop('name'), lesson.name)
        self.assertEqual(lesson_response.pop('image'), lesson.image if lesson.image else None)
        self.assertEqual(lesson_response.pop('module'), lesson.module.uuid)
        # These fields cannot be verified without the request. This logic is
        # tested in the services tests. And in Module API tests that
        # specifically test these values.
        lesson_response.pop('is_complete')
        lesson_response.pop('is_locked')
        self.assertFalse(lesson_response)


class ValidateModulesMixin(object):

    def validate_module(self, module_response, module):
        self.assertEqual(module_response.pop('uuid'), module.uuid)
        self.assertEqual(module_response.pop('name'), module.name)
        self.assertEqual(module_response.pop('image'), module.image if module.image else None)
        self.assertEqual(module_response.pop('lesson_count'), module.lessons.count())
        # These fields cannot be verified without the request. This logic is
        # tested in the services tests. And in Module API tests that
        # specifically test these values.
        module_response.pop('lesson_completed_count')
        module_response.pop('is_complete')
        module_response.pop('is_locked')
        self.assertFalse(module_response)


class ValidateUnitsMixin(object):
    """
    Mixin to provide validation of unit response format.
    """

    def validate_unit(self, unit_response, unit):
        self.assertEqual(unit_response.pop('uuid'), unit.uuid)
        self.assertEqual(unit_response.pop('name'), unit.name)
        self.assertEqual(unit_response.pop('image'), unit.image if unit.image else None)
        self.assertFalse(unit_response)


class CurriculumViewSetTests(ValidateModulesMixin, ValidateUnitsMixin, WebTest):

    def setUp(self):
        super(CurriculumViewSetTests, self).setUp()
        self.curriculum = factories.Curriculum()
        self.units = factories.Unit.create_batch(2, curriculum=self.curriculum)
        self.modules = []
        for unit in self.units:
            self.modules += factories.Module.create_batch(2, unit=unit)
        self.modules_per_unit = int(len(self.modules) / len(self.units))
        self.url = '/api/v1/curricula/curricula/{}'

    def validate_curriculum(self, c):
        self.assertEqual(c.pop('uuid'), self.curriculum.uuid)
        self.assertEqual(c.pop('name'), self.curriculum.name)
        self.assertFalse(c)

    def test_get_curriculum(self):
        r = self.app.get(self.url.format(self.curriculum.uuid))
        self.validate_curriculum(r.json)

    def test_get_curriculum_with_units(self):
        r = self.app.get(self.url.format(self.curriculum.uuid), {'expand': 'units'})
        c = r.json
        units = c.pop('units')
        self.assertIsInstance(units, list)
        for unit_response, unit in zip(units, self.units):
            self.validate_unit(unit_response, unit)
        self.validate_curriculum(c)

    def test_get_curriculum_with_units_and_modules(self):
        r = self.app.get(self.url.format(self.curriculum.uuid), {'expand': 'units.modules'})
        c = r.json
        units = c.pop('units')
        self.assertIsInstance(units, list)
        for index, (unit_response, unit) in enumerate(zip(units, self.units)):
            range_start = index * self.modules_per_unit
            range_end = (index + 1) * self.modules_per_unit
            modules = unit_response.pop('modules')
            self.assertIsInstance(modules, list)
            for module_response, module in zip(
                    modules,
                    self.modules[range_start:range_end]):
                self.validate_module(module_response, module)
            self.validate_unit(unit_response, unit)
        self.validate_curriculum(c)

    def test_get_default_curriculum(self):
        self.curriculum.name = Curriculum.Name.DEFAULT
        self.curriculum.save()
        r = self.app.get(self.url.format('default'))
        self.validate_curriculum(r.json)


class ModuleViewSetTests(ValidateLessonsMixin, ValidateModulesMixin, WebTest):

    # TODO: Test THESE:
    # lesson_completed_count
    # is_complete
    # is_locked

    def setUp(self):
        self.module = factories.Module()
        self.lessons = factories.Lesson.create_batch(2, module=self.module)
        self.url = '/api/v1/curricula/modules/{}'

    def test_get_module(self):
        r = self.app.get(self.url.format(self.module.uuid))
        self.validate_module(r.json, self.module)

    def test_get_module_with_lessons(self):
        r = self.app.get(self.url.format(self.module.uuid), {'expand': 'lessons'})
        m = r.json
        lessons = m.pop('lessons')
        for lesson_response, lesson in zip(lessons, self.lessons):
            self.validate_lesson(lesson_response, lesson)
        self.validate_module(m, self.module)

    def test_get_module_with_lessons_lock_complete(self):
        user = profile_factories.User()
        # try with no unlocks / completions
        r = self.app.get(self.url.format(self.module.uuid), {'expand': 'lessons'}, user=user)
        m = r.json
        lessons = m.pop('lessons')
        self.assertTrue(m['is_locked'])
        self.assertFalse(m['is_complete'])
        self.assertEqual(m['lesson_completed_count'], 0)
        for lesson_response, lesson in zip(lessons, self.lessons):
            self.assertTrue(lesson_response['is_locked'])
            self.assertFalse(lesson_response['is_complete'])
            self.validate_lesson(lesson_response, lesson)
        self.validate_module(m, self.module)

        # Now let's unlock the first lesson
        lp1 = factories.LessonProgress(lesson=self.lessons[0], profile=user.profile)
        r = self.app.get(self.url.format(self.module.uuid), {'expand': 'lessons'}, user=user)
        m = r.json
        lessons = m.pop('lessons')
        self.assertFalse(m['is_locked'])
        self.assertFalse(m['is_complete'])
        self.assertEqual(m['lesson_completed_count'], 0)
        self.assertFalse(lessons[0]['is_locked'])
        self.assertFalse(lessons[0]['is_complete'])
        self.assertTrue(lessons[1]['is_locked'])
        self.assertFalse(lessons[1]['is_complete'])

        lp1.completed_on = timezone.now()
        lp1.save()
        lp2 = factories.LessonProgress(lesson=self.lessons[1], profile=user.profile)
        r = self.app.get(self.url.format(self.module.uuid), {'expand': 'lessons'}, user=user)
        m = r.json
        lessons = m.pop('lessons')
        self.assertFalse(m['is_locked'])
        self.assertFalse(m['is_complete'])
        self.assertEqual(m['lesson_completed_count'], 1)
        self.assertFalse(lessons[0]['is_locked'])
        self.assertTrue(lessons[0]['is_complete'])
        self.assertFalse(lessons[1]['is_locked'])
        self.assertFalse(lessons[1]['is_complete'])

        lp2.completed_on = timezone.now()
        lp2.save()
        r = self.app.get(self.url.format(self.module.uuid), {'expand': 'lessons'}, user=user)
        m = r.json
        lessons = m.pop('lessons')
        self.assertFalse(m['is_locked'])
        self.assertTrue(m['is_complete'])
        self.assertEqual(m['lesson_completed_count'], 2)
        self.assertFalse(lessons[0]['is_locked'])
        self.assertTrue(lessons[0]['is_complete'])
        self.assertFalse(lessons[1]['is_locked'])
        self.assertTrue(lessons[1]['is_complete'])


class LessonViewSetTests(ValidateLessonsMixin, ValidateQuestionsMixin, WebTest):

    def setUp(self):
        super(LessonViewSetTests, self).setUp()
        self.lesson = factories.Lesson()
        self.url = '/api/v1/curricula/lessons/{}/next-question'
        self.questions = factories.Question.create_batch(3, lesson=self.lesson)

    def test_get_next_question(self):
        user = profile_factories.User()
        # can't get question because lesson is locked
        r = self.app.get(self.url.format(self.lesson.uuid), user=user, status=400)
        factories.LessonProgress(profile=user.profile, lesson=self.lesson)
        r = self.app.get(self.url.format(self.lesson.uuid), user=user)
        q = r.json
        self.validate_lesson(q.pop('lesson'), self.lesson)
        self.validate_question(q, self.questions[0])

        # if we call again without providing the previous question uuid, we get
        # the same question back
        r = self.app.get(self.url.format(self.lesson.uuid), user=user)
        q = r.json
        self.validate_lesson(q.pop('lesson'), self.lesson)
        self.validate_question(q, self.questions[0])

        # but if we provide the previous uuid, we progress
        r = self.app.get(
            self.url.format(self.lesson.uuid),
            {'previous_question': self.questions[0].uuid},
            user=user
        )
        q = r.json
        self.validate_lesson(q.pop('lesson'), self.lesson)
        self.validate_question(q, self.questions[1])

        # but if we provide the previous uuid, we progress
        r = self.app.get(
            self.url.format(self.lesson.uuid),
            {'previous_question': self.questions[1].uuid},
            user=user
        )
        q = r.json
        self.validate_lesson(q.pop('lesson'), self.lesson)
        self.validate_question(q, self.questions[2])

        # and now we loop around
        # but if we provide the previous uuid, we progress
        r = self.app.get(
            self.url.format(self.lesson.uuid),
            {'previous_question': self.questions[2].uuid},
            user=user
        )
        q = r.json
        self.validate_lesson(q.pop('lesson'), self.lesson)
        self.validate_question(q, self.questions[0])


class QuestionViewSetTests(WebTest):

    csrf_checks = False

    def setUp(self):
        super(QuestionViewSetTests, self).setUp()
        self.question = factories.Question(
            question_type=Question.QuestionType.SINGLE_ANSWER,
            answer_type=Question.AnswerType.VECTOR
        )
        self.answer = factories.VectorAnswer(
            question=self.question,
            content=factories.AngleVector(angle=90)
        )
        self.url = '/api/v1/curricula/questions/{}/response'

    def test_response(self):
        user = profile_factories.User()
        data = {
            'vector': {'x_component': 0, 'y_component': 1}
        }
        last_score = 0
        # lesson locked
        r = self.app.post_json(self.url.format(self.question.uuid), data, user=user, status=400)

        factories.LessonProgress(lesson=self.question.lesson, profile=user.profile)
        r = self.app.post_json(self.url.format(self.question.uuid), data, user=user)
        self.assertTrue(r.json['was_correct'])
        self.assertEqual(r.json['score'], last_score + ProgressServiceBase.CORRECT_RESPONSE_VALUE)
        self.assertNotIn('correct_answer', r.json)
        last_score = r.json['score']

        # now incorrect answer
        data['vector']['x_component'] = 1
        r = self.app.post_json(self.url.format(self.question.uuid), data, user=user)
        self.assertFalse(r.json['was_correct'])
        self.assertEqual(r.json['score'], last_score + ProgressServiceBase.INCORRECT_RESPONSE_VALUE)
        self.assertIn('correct_answer', r.json)
