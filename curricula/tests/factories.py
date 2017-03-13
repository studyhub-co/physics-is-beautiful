from factory import DjangoModelFactory, SubFactory, Sequence, fuzzy

from profiles.tests.factories import Profile
from curricula import models


class Curriculum(DjangoModelFactory):

    class Meta:
        model = models.Curriculum


class Unit(DjangoModelFactory):

    class Meta:
        model = models.Unit

    curriculum = SubFactory(Curriculum)


class Module(DjangoModelFactory):

    class Meta:
        model = models.Module

    unit = SubFactory(Unit)
    name = Sequence(lambda n: 'Module {}'.format(n))
    position = Sequence(lambda n: n)


class Lesson(DjangoModelFactory):

    class Meta:
        model = models.Lesson

    module = SubFactory(Module)
    name = Sequence(lambda n: 'Lesson {}'.format(n))
    position = Sequence(lambda n: n)


class Vector(DjangoModelFactory):

    class Meta:
        model = models.Vector

    magnitude = fuzzy.FuzzyInteger(0)
    angle = fuzzy.FuzzyInteger(0, 359)
    x_component = fuzzy.FuzzyInteger(0)
    y_component = fuzzy.FuzzyInteger(0)


class MagnitudeVector(Vector):

    angle = None
    x_component = None
    y_component = None


class AngleVector(Vector):

    magnitude = None
    x_component = None
    y_component = None


class ComponentVector(Vector):

    angle = None
    magnitude = None


class NullVector(Vector):

    magnitude = None
    angle = None
    x_component = None
    y_component = None


class Text(DjangoModelFactory):

    class Meta:
        model = models.Text

    text = Sequence(lambda n: 'Text of question: {}'.format(n))


class Question(DjangoModelFactory):

    class Meta:
        model = models.Question

    lesson = SubFactory(Lesson)
    text = Sequence(lambda n: 'Is this question {}?'.format(n))
    position = Sequence(lambda n: n)


class SingleAnswerQuestion(Question):

    question_type = models.Question.QuestionType.SINGLE_ANSWER


class MultipleChoiceQuestion(Question):

    question_type = models.Question.QuestionType.MULTIPLE_CHOICE


class Answer(DjangoModelFactory):

    class Meta:
        model = models.Answer

    question = SubFactory(SingleAnswerQuestion)


class TextAnswer(Answer):

    content = SubFactory(Text)


class VectorAnswer(Answer):

    content = SubFactory(Vector)


class LessonProgress(DjangoModelFactory):

    class Meta:
        model = models.LessonProgress

    lesson = SubFactory(Lesson)
    profile = SubFactory(Profile)
