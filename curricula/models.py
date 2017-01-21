from django.db import models


class Curriculum(models.Model):

    class Meta:
        verbose_name_plural = "curricula"

    name = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    image = models.ImageField

    def __str__(self):
        return self.curriculum_name


class Unit(models.Model):

    class Meta:
        ordering = ['position']

    curriculum = models.ForeignKey(Curriculum, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    published_on = models.DateTimeField('date published')
    image = models.ImageField
    position = models.PositiveSmallIntegerField("Position", null=True)

    def __str__(self):
        return self.unit_name


class Module(models.Model):

    class Meta:
        ordering = ['position']

    unit = models.ForeignKey(Unit, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    published_on = models.DateTimeField('date published')
    image = models.ImageField(blank=True)
    position = models.PositiveSmallIntegerField("Position", null=True)

    def __str__(self):
        return self.module_name


class Lesson(models.Model):

    class Meta:
        ordering = ['position']

    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    published_on = models.DateTimeField('date published')
    image = models.ImageField(blank=True)
    position = models.PositiveSmallIntegerField("Position", null=True)

    def __str__(self):
        return self.lesson_name


class Question(models.Model):

    class Meta:
        ordering = ['position']

    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    text = models.CharField(max_length=200)
    published_on = models.DateTimeField('date published')
    image = models.ImageField(blank=True)
    position = models.PositiveSmallIntegerField("Position", null=True)

    def __str__(self):
        return self.question_text


class Choice(models.Model):

    class Meta:
        ordering = ['position']

    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    position = models.PositiveSmallIntegerField("Position", null=True)

    def __str__(self):
        return self.choice_text


class DrawVector(models.Model):

    class Meta:
        ordering = ['position']

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
