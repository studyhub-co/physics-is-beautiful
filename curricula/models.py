from django.db import models
from django.core import urlresolvers
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

    def get_next_question(self):
        return self.questions.first()

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

    def __str__(self):
        return 'Question: '.format(self.text)


class Answer(BaseModel):

    class Meta:
        ordering = ['position']
        db_table = 'curricula_answers'

    uuid = ShortUUIDField()
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    position = models.PositiveSmallIntegerField('Position', null=True, blank=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content = GenericForeignKey('content_type', 'object_id')
    is_correct = models.BooleanField(default=False)


class Text(BaseModel):

    class Meta:
        db_table = 'curricula_text_answers'

    text = models.CharField(max_length=200)

    def __str__(self):
        return 'Text: {}'.format(self.text)


class Vector(BaseModel):

    class Meta:
        db_table = 'curricula_vector_answers'

    magnitude = models.PositiveSmallIntegerField("Magnitude", null=True, blank=True)
    angle = models.PositiveSmallIntegerField("Angle", null=True, blank=True)
    x_component = models.SmallIntegerField("x-Component", null=True, blank=True)
    y_component = models.SmallIntegerField("y-Component", null=True, blank=True)

    def __str__(self):
        if self.magnitude and self.angle:
            return 'Vector: ({}, {}°)'.format(self.magnitude, self.angle)
        else:
            return 'Vector: {}x + {}y'.format(self.x_component, self.y_component)
