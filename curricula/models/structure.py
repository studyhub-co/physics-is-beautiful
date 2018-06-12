from django.db import models
from django_light_enums import enum
from shortuuidfield import ShortUUIDField

from pib_auth.models import User

from . import BaseModel, get_earliest_gap


class CurriculumQuerySet(models.QuerySet):

    def get_default(self):
        return self.get(name=Curriculum.Name.DEFAULT)


class Curriculum(BaseModel):

    class Meta:
        verbose_name_plural = "curricula"
        db_table = 'curricula_curricula'

    class CloneMeta:
        children_field = 'units'

    class Name:
        DEFAULT = 'Default Curriculum'

    objects = CurriculumQuerySet.as_manager()

    uuid = ShortUUIDField()
    name = models.CharField(max_length=200, db_index=True)
    published_on = models.DateTimeField('date published', null=True, blank=True)
    image = models.ImageField(blank=True)

    author = models.ForeignKey(User)
    collaborators = models.ManyToManyField(User, related_name='coauthored_curricula')

    def clone(self, to_curriculum):
        for unit in self.units.all():
            unit.clone(to_curriculum)
    
    def __str__(self):
        return 'Curriculum: {}'.format(self.name)


class Unit(BaseModel):

    class Meta:
        ordering = ['position']
        db_table = 'curricula_units'

    class CloneMeta:
        parent_field = 'curriculum'
        children_field = 'modules'        

    uuid = ShortUUIDField()
    curriculum = models.ForeignKey(Curriculum, related_name='units', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    published_on = models.DateTimeField('date published', null=True, blank=True)
    image = models.ImageField(blank=True)
    position = models.PositiveSmallIntegerField("Position", null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.position is None:
            taken_positions = list(
                Unit.objects.filter(curriculum=self.curriculum).values_list('position', flat=True)
            )
            self.position = get_earliest_gap(taken_positions)
        super(Unit, self).save(*args, **kwargs)
        
    def __str__(self):
        return 'Unit: {}'.format(self.name)


class Module(BaseModel):

    class Meta:
        ordering = ['position']
        db_table = 'curricula_modules'

    class CloneMeta:
        parent_field = 'unit'
        children_field = 'lessons'

        
    uuid = ShortUUIDField()
    unit = models.ForeignKey(Unit, related_name='modules', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    published_on = models.DateTimeField('date published', null=True, blank=True)
    image = models.ImageField(blank=True)
    position = models.PositiveSmallIntegerField("Position", null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.position is None:
            taken_positions = list(
                Module.objects.filter(unit=self.unit).values_list('position', flat=True)
            )
            self.position = get_earliest_gap(taken_positions)
        super(Module, self).save(*args, **kwargs)

    def __str__(self):
        return 'Module: {}'.format(self.name)


class Lesson(BaseModel):

    class Meta:
        ordering = ['position']
        db_table = 'curricula_lessons'

    class CloneMeta:
        parent_field = 'module'
        children_field = 'questions'

    class LessonType(enum.Enum):
        DEFAULT = 0
        GAME = 1

    uuid = ShortUUIDField()
    module = models.ForeignKey(Module, related_name='lessons', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    published_on = models.DateTimeField('date published', null=True, blank=True)
    image = models.ImageField(blank=True)
    position = models.PositiveSmallIntegerField("Position", null=True, blank=True)
    lesson_type = enum.EnumField(LessonType)

    @property
    def is_start(self):
        return self.position == 0 and self.module.position == 0 and self.module.unit.position == 0

    @property
    def lesson_type_name(self):
        return self.LessonType.get_name(self.lesson_type)

    def get_previous_lesson(self):
        return Lesson.objects.filter(
            models.Q(position__lt=self.position, module=self.module) |
            models.Q(module__position__lt=self.module.position, module__unit=self.module.unit) |
            models.Q(
                module__unit__position__lt=self.module.unit.position,
                module__unit__curriculum=self.module.unit.curriculum
            )
        ).order_by('-module__unit__position', '-module__position', '-position').first()

    def get_next_lesson(self):
        return Lesson.objects.filter(
            models.Q(position__gt=self.position, module=self.module) |
            models.Q(module__position__gt=self.module.position, module__unit=self.module.unit) |
            models.Q(
                module__unit__position__gt=self.module.unit.position,
                module__unit__curriculum=self.module.unit.curriculum
            )
        ).order_by('module__unit__position', 'module__position', 'position').first()

    def save(self, *args, **kwargs):
        if self.position is None:
            taken_positions = list(
                Lesson.objects.filter(module=self.module).values_list('position', flat=True)
            )
            self.position = get_earliest_gap(taken_positions)
        super(Lesson, self).save(*args, **kwargs)
        if self.lesson_type == self.LessonType.GAME and not hasattr(self, 'game'):
            Game.objects.create(lesson=self)
        elif self.lesson_type != self.LessonType.GAME and hasattr(self, 'game'):
            self.game.delete()

    def clone(self, to_parent):
        copy = super().clone(to_parent)
        if hasattr(self, 'game'):
            copy.game.delete()
            game = self.game
            game.id = None
            game.uuid = None
            game.lesson = copy
            game.save()
        return copy
        
            
    def __str__(self):
        return 'Lesson: {}'.format(self.name)


class Game(BaseModel):

    class Meta:
        db_table = 'curricula_games'

    uuid = ShortUUIDField()
    lesson = models.OneToOneField(Lesson, related_name='game')
    slug = models.SlugField(null=True, blank=True)

    def __str__(self):
        return 'Game: {}'.format(self.slug)
