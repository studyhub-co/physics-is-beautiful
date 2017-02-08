import math

from django.db import models
from django.core import urlresolvers
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

    uuid = ShortUUIDField()
    lesson = models.ForeignKey(Lesson, related_name='questions', on_delete=models.CASCADE)
    text = models.CharField(max_length=200)
    published_on = models.DateTimeField('date published', null=True, blank=True)
    image = models.ImageField(blank=True)
    question_type = enum.EnumField(QuestionType)
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
        # TODO: rename
        db_table = 'curricula_text_answers'

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
        db_table = 'curricula_vector_answers'

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
            self._fill_out_fields()
            obj._fill_out_fields()
            return (
                self.magnitude == obj.magnitude and
                self.angle == obj.angle and
                self.x_component == obj.x_component and
                self.y_component == obj.y_component
            )
        except AttributeError:
            return False

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

    def save(self, *args, **kwargs):
        diff = {'magnitude', 'angle', 'x_component', 'y_component'}
        if self.pk:
            db_instance = Vector.objects.get(pk=self.pk)
            diff = {
                f for f in diff
                if getattr(self, f) != getattr(db_instance, f)
            }
        if (self.x_component is not None and self.y_component is not None and
                'x_component' in diff or 'y_component' in diff):
            calculated_magnitude = self._calculate_magnitude()
            calculated_angle = self._calculate_angle()
            if 'magnitude' in diff and self.magnitude is not None and self.magnitude != calculated_magnitude:
                raise ValidationError('Provided magnitude is not consistent!')
            else:
                self.magnitude = calculated_magnitude
            if 'angle' in diff and self.angle is not None and self.angle != calculated_angle:
                raise ValidationError('Provided angle is not consistent!')
            else:
                self.angle = calculated_angle
        elif (self.magnitude is not None and self.angle is not None and
              'magnitude' in diff or 'angle' in diff):
            calculated_x = self._calculate_x()
            calculated_y = self._calculate_y()
            if 'x_component' in diff and self.x_component is not None and self.x_component != calculated_x:
                raise ValidationError('Provided x_component is not consistent!')
            else:
                self.x_component = calculated_x
            if 'y_component' in diff and self.y_component is not None and self.y_component != calculated_y:
                raise ValidationError('Provided y_component is not consistent!')
            else:
                self.y_component = calculated_y
        elif diff:
            raise ValidationError('Must provide an x and y component or an angle and magnitude')
        super(Vector, self).save(*args, **kwargs)

    def __str__(self):
        return 'Vector: {}x + {}y ({}, {}°)'.format(
            self.x_component, self.y_component, self.magnitude, self.angle
        )


class UserResponse(BaseModel):

    class Meta:
        db_table = 'curricula_user_responses'

    profile = models.ForeignKey(
        'profiles.Profile', related_name='responses', on_delete=models.CASCADE
    )
    question = models.ForeignKey(Question, related_name='responses', on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content = GenericForeignKey('content_type', 'object_id')
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
