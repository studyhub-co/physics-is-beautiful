import math

from django.db import models
from django.core import urlresolvers
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.utils.functional import cached_property
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

from django_light_enums import enum
from shortuuidfield import ShortUUIDField


class BaseModel(models.Model):

    class Meta:
        abstract = True

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def get_admin_url(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        return urlresolvers.reverse(
            'admin:{}_{}_change'.format(
                content_type.app_label,
                content_type.model
            ),
            args=[self.id]
        )


class CurriculumQuerySet(models.QuerySet):

    def get_default(self):
        return self.get(name=Curriculum.Name.DEFAULT)


class Curriculum(BaseModel):

    class Meta:
        verbose_name_plural = "curricula"
        db_table = 'curricula_curricula'

    class Name:
        DEFAULT = 'Default Curriculum'

    objects = CurriculumQuerySet.as_manager()

    uuid = ShortUUIDField()
    name = models.CharField(max_length=200, db_index=True)
    published_on = models.DateTimeField('date published', null=True, blank=True)
    image = models.ImageField(blank=True)

    def __str__(self):
        return 'Curriculum: {}'.format(self.name)


class Unit(BaseModel):

    class Meta:
        ordering = ['position']
        db_table = 'curricula_units'

    uuid = ShortUUIDField()
    curriculum = models.ForeignKey(Curriculum, related_name='units', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    published_on = models.DateTimeField('date published', null=True, blank=True)
    image = models.ImageField(blank=True)
    position = models.PositiveSmallIntegerField("Position", null=True, blank=True)

    def __str__(self):
        return 'Unit: {}'.format(self.name)


class Module(BaseModel):

    class Meta:
        ordering = ['position']
        db_table = 'curricula_modules'

    uuid = ShortUUIDField()
    unit = models.ForeignKey(Unit, related_name='modules', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    published_on = models.DateTimeField('date published', null=True, blank=True)
    image = models.ImageField()
    position = models.PositiveSmallIntegerField("Position", null=True, blank=True)

    def __str__(self):
        return 'Module: {}'.format(self.name)


class Lesson(BaseModel):

    class Meta:
        ordering = ['position']
        db_table = 'curricula_lessons'

    uuid = ShortUUIDField()
    module = models.ForeignKey(Module, related_name='lessons', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    published_on = models.DateTimeField('date published', null=True, blank=True)
    image = models.ImageField()
    position = models.PositiveSmallIntegerField("Position", null=True, blank=True)

    def __str__(self):
        return 'Lesson: {}'.format(self.name)


class Question(BaseModel):

    class Meta:
        ordering = ['position']
        db_table = 'curricula_questions'

    class QuestionType(enum.Enum):
        SINGLE_ANSWER = 10
        MULTIPLE_CHOICE = 20

    class AnswerType(enum.Enum):
        TEXT = 10
        VECTOR = 20
        IMAGE = 30

    uuid = ShortUUIDField()
    lesson = models.ForeignKey(Lesson, related_name='questions', on_delete=models.CASCADE)
    text = models.CharField(max_length=255, db_index=True)
    hint = models.CharField(max_length=1024, blank=True)
    published_on = models.DateTimeField('date published', null=True, blank=True)
    image = models.ImageField(blank=True)
    question_type = enum.EnumField(QuestionType)
    # answer_type = enum.EnumField(AnswerType)
    position = models.PositiveSmallIntegerField("Position", null=True, blank=True)

    @property
    def question_type_name(self):
        return self.QuestionType.get_name(self.question_type)

    @property
    def is_choice_question(self):
        return self.question_type in {self.QuestionType.MULTIPLE_CHOICE}

    @cached_property
    def correct_answer(self):
        return self.answers.correct()

    def __str__(self):
        return 'Question: {}'.format(self.text)


class AnswerQuerySet(models.QuerySet):

    def correct(self):
        # Right now we assume there to only be a single correct answer to a
        # question.
        return super(AnswerQuerySet, self).get(is_correct=True)


class Answer(BaseModel):

    class Meta:
        ordering = ['position']
        db_table = 'curricula_answers'

    objects = AnswerQuerySet.as_manager()

    uuid = ShortUUIDField()
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    position = models.PositiveSmallIntegerField('Position', null=True, blank=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content = GenericForeignKey('content_type', 'object_id')
    is_correct = models.BooleanField(default=False)

    def matches(self, answer):
        if isinstance(answer, Answer):
            return self == answer
        else:
            return self.content.matches(answer)


class Text(BaseModel):

    class Meta:
        db_table = 'curricula_texts'

    text = models.CharField(max_length=200)

    def matches(self, obj):
        if isinstance(obj, Answer):
            return self.matches(obj.content)
        try:
            return self.text.lower() == obj.text.lower()
        except AttributeError:
            return False

    def __str__(self):
        return 'Text: {}'.format(self.text)


class Vector(BaseModel):

    class Meta:
        # TODO: rename
        db_table = 'curricula_vectors'

    magnitude = models.FloatField("Magnitude", null=True, blank=True)
    angle = models.FloatField("Angle", null=True, blank=True)
    x_component = models.FloatField("x-Component", null=True, blank=True)
    y_component = models.FloatField("y-Component", null=True, blank=True)

    def _fill_out_fields(self):
        if self.magnitude is None:
            self.magnitude = self._calculate_magnitude()
        if self.angle is None:
            self.angle = self._calculate_angle()
        if self.x_component is None:
            self.x_component = self._calculate_x()
        if self.y_component is None:
            self.y_component = self._calculate_y()

    def matches(self, obj):
        if isinstance(obj, Answer):
            return self.matches(obj.content)
        try:
            obj._fill_out_fields()
            for field in ['magnitude', 'angle', 'x_component', 'y_component']:
                value = getattr(self, field, None)
                if value is not None and value != getattr(obj, field):
                    return False
            return True
        except AttributeError:
            return False

    def for_display(self):
        angle = self.angle
        mag = self.magnitude
        x = self.x_component
        y = self.y_component

        if angle is not None or mag is not None or x is not None or y is not None:
            if angle is None and mag is not None:
                angle = 0
            elif mag is None and angle is not None:
                mag = 1
            elif angle is None and mag is None:
                angle = self._calculate_angle()
                mag = self._calculate_magnitude()

            if x is None and y is None:
                x = self._calculate_x()
                y = self._calculate_y()

        return {
            'angle': angle,
            'magnitude': mag,
            'x_component': x,
            'y_component': y,
        }


    def _calculate_magnitude(self):
        return math.sqrt(self.x_component ** 2 + self.y_component ** 2)

    def _calculate_angle(self):
        x = int(self.x_component)
        y = int(self.y_component)
        if x:
            calculated_angle = math.degrees(math.atan(self.y_component / self.x_component))
        elif y > 0:
            calculated_angle = 90
        else:
            calculated_angle = -90
        if x < 0 and y < 0:
            calculated_angle += 180
        elif x < 0:
            calculated_angle += 180
        elif y < 0:
            calculated_angle += 360
        return calculated_angle

    def _calculate_x(self):
        return self.magnitude * math.cos(self.angle)

    def _calculate_y(self):
        return self.magnitude * math.sin(self.angle)

    def validate_fields(self):
        if (self.x_component is None and self.y_component is not None or
                self.y_component is None and self.x_component is not None):
            raise ValidationError('If you specify an X component or a Y component, you must specify both!')

    def save(self, *args, **kwargs):
        self.validate_fields()
        super(Vector, self).save(*args, **kwargs)

    def __str__(self):
        return 'Vector: {}x + {}y ({}, {}°)'.format(
            self.x_component, self.y_component, self.magnitude, self.angle
        )


class UserResponseQuerySet(models.QuerySet):

    def create(self, *args, **kwargs):
        kwargs.setdefault('answered_on', timezone.now())
        return super(UserResponseQuerySet, self).create(*args, **kwargs)

    def bulk_create(self, objs, batch_size=None):
        for o in objs:
            if o.answered_on is None:
                o.answered_on = timezone.now()
        return super(UserResponseQuerySet, self).bulk_create(objs, batch_size)


class UserResponse(BaseModel):

    class Meta:
        db_table = 'curricula_user_responses'

    objects = UserResponseQuerySet.as_manager()

    profile = models.ForeignKey(
        'profiles.Profile', related_name='responses', on_delete=models.CASCADE
    )
    question = models.ForeignKey(Question, related_name='responses', on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content = GenericForeignKey('content_type', 'object_id')
    answered_on = models.DateTimeField()
    is_correct = models.BooleanField(default=False)

    def check_response(self):
        if isinstance(self.content, Answer):
            self.is_correct = self.content.is_correct
        else:
            if self.question.correct_answer.matches(self.content):
                self.is_correct = True
        return self.is_correct

    def get_correct_answer(self):
        return self.question.correct_answer


class LessonProgress(BaseModel):

    class Meta:
        db_table = 'curricula_lesson_progress'

    profile = models.ForeignKey(
        'profiles.Profile', related_name='lesson_progress', on_delete=models.CASCADE
    )
    lesson = models.ForeignKey(Lesson, related_name='progress', on_delete=models.CASCADE)
    score = models.SmallIntegerField(default=0)
    completed_on = models.DateTimeField(null=True, blank=True)
