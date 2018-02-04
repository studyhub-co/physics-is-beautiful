from django.db import models
from django.utils.functional import cached_property

from django_light_enums import enum
from shortuuidfield import ShortUUIDField

from . import BaseModel, get_earliest_gap
from . import Lesson


class Question(BaseModel):

    class Meta:
        ordering = ['position']
        db_table = 'curricula_questions'

    class QuestionType(enum.Enum):
        UNDEFINED = 0
        SINGLE_ANSWER = 10
        MULTIPLE_CHOICE = 20
        MULTISELECT_CHOICE = 40

    class AnswerType(enum.Enum):
        UNDEFINED = 0  # FIXME we really need this?
        # SINGLE_ANSWER = 90
        MULTIPLE_CHOICE = 100
        MULTISELECT_CHOICE = 110
        TEXT = 10  # TODO remove
        VECTOR = 20
        NULLABLE_VECTOR = 30
        IMAGE = 40  # TODO remove
        MATHEMATICAL_EXPRESSION = 50
        VECTOR_COMPONENTS = 60
        UNIT_CONVERSION = 70
        # IMAGE_WITH_TEXT = 80

    uuid = ShortUUIDField()
    lesson = models.ForeignKey(Lesson, related_name='questions', on_delete=models.CASCADE)
    text = models.CharField(max_length=255, db_index=True)
    additional_text = models.CharField(max_length=255,
                                       db_index=True,
                                       null=True,
                                       blank=True,
                                       help_text="Not used field")
    hint = models.CharField(max_length=1024, blank=True)
    published_on = models.DateTimeField('date published', null=True, blank=True)
    image = models.ImageField(blank=True)
    question_type = enum.EnumField(QuestionType, null=True, blank=True)
    answer_type = enum.EnumField(AnswerType)
    position = models.PositiveSmallIntegerField('Position', null=True, blank=True)
    vectors = models.ManyToManyField('Vector', related_name='questions')

    @property
    def question_type_name(self):
        return self.QuestionType.get_name(self.question_type)

    @property
    def answer_type_name(self):
        return self.AnswerType.get_name(self.answer_type)

    @property
    def is_choice_question(self):
        return self.question_type in {self.QuestionType.MULTIPLE_CHOICE}

    @cached_property
    def correct_answer(self):
        return self.answers.get_correct()

    def save(self, *args, **kwargs):
        if self.position is None:
            taken_positions = list(
                Question.objects.filter(lesson=self.lesson).values_list('position', flat=True)
            )
            self.position = get_earliest_gap(taken_positions)
        if self.pk:
            db_instance = self.instance_from_db()
            if db_instance.answer_type != self.answer_type:
                self.answers.all().delete()
                if db_instance.answer_type == self.AnswerType.VECTOR_COMPONENTS:
                    self.vectors.all().delete()
            if (db_instance.question_type != self.question_type and
                    self.question_type == self.QuestionType.SINGLE_ANSWER):
                self.answers.filter(position__gt=0).delete()
                answer = self.answers.first()
                if answer and not answer.is_correct:
                    answer.is_correct = True
                    answer.save()
        super(Question, self).save(*args, **kwargs)

    def __str__(self):
        return 'Question: {}'.format(self.text)
