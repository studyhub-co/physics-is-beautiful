from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.utils import timezone
import datetime


class Curriculum(models.Model):
    curriculum_name = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    curriculum_image = models.ImageField

    def __str__(self):
        return self.curriculum_name

    class Meta:
        verbose_name_plural = "curricula"


class Unit(models.Model):
    curriculum = models.ForeignKey(Curriculum, on_delete=models.CASCADE)
    unit_name = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    unit_image = models.ImageField
    position = models.PositiveSmallIntegerField("Position", null=True)

    def __str__(self):
        return self.unit_name

    class Meta:
        ordering = ['position']


class Module(models.Model):
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE)
    module_name = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    module_image = models.ImageField(blank=True)
    position = models.PositiveSmallIntegerField("Position", null=True)

    def __str__(self):
        return self.module_name

    class Meta:
        ordering = ['position']


class Lesson(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    lesson_name = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    lesson_image = models.ImageField(blank=True)
    position = models.PositiveSmallIntegerField("Position", null=True)

    def __str__(self):
        return self.lesson_name

    class Meta:
        ordering = ['position']



class Question(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    image = models.ImageField(blank=True)
    position = models.PositiveSmallIntegerField("Position", null=True)

    def __str__(self):
        return self.question_text

    class Meta:
        ordering = ['position']


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    position = models.PositiveSmallIntegerField("Position", null=True)

    def __str__(self):
        return self.choice_text

    class Meta:
        ordering = ['position']


class DrawVector(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    question_text = models.CharField(max_length=200)
    magnitude = models.PositiveSmallIntegerField("Magnitude", null=True, blank=True)
    angle = models.PositiveSmallIntegerField("Angle", null=True, blank=True)
    xComponent = models.SmallIntegerField("x-Component", null=True, blank=True)
    yComponent = models.SmallIntegerField("y-Component", null=True, blank=True)
    pub_date = models.DateTimeField('date published')
    image = models.ImageField(blank=True)
    position = models.PositiveSmallIntegerField("Position", null=True)

    def __str__(self):
        return self.question_text

    class Meta:
        ordering = ['position']