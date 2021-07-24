from django.db import models, connection

from taggit.managers import TaggableManager

from .unit import Unit
from .. import BaseItemModel, get_earliest_gap
from ..utils import UUIDTaggedItem


class Module(BaseItemModel):

    class Meta:
        ordering = ['position']

    unit = models.ForeignKey(Unit, related_name='modules', on_delete=models.CASCADE)
    published_on = models.DateTimeField('date published', null=True, blank=True)
    image = models.ImageField(blank=True)
    position = models.PositiveSmallIntegerField("Position", null=True, blank=True)

    tags = TaggableManager(through=UUIDTaggedItem, related_name='courses_modules')

    def save(self, *args, **kwargs):
        if self.position is None:
            taken_positions = list(
                Module.objects.filter(unit=self.unit).values_list('position', flat=True)
            )
            self.position = get_earliest_gap(taken_positions)
        super(Module, self).save(*args, **kwargs)

    def clone(self, to_parent_unit):
        copy = self.instance_from_db()
        # reset uuid, so Django will save the new object
        copy.uuid = None
        copy.thread_id = None
        copy.name = '{} forked'.format(copy.name)
        # attach to selected unit
        copy.unit = to_parent_unit
        copy.save()
        self.clone_children(copy)
        return copy

    def clone_children(self, to_module):
        with connection.cursor() as cursor:
            cursor.execute("""
        DO $$
        DECLARE 
            lesson_row record;
            question_row record;
        BEGIN
        RAISE NOTICE 'Start module forking...';
            FOR lesson_row IN
                SELECT * FROM "courses_clone_lessons"(%s, %s)
            LOOP
                PERFORM "courses_clone_materials"(lesson_row.lesson_id_from, lesson_row.lesson_id_to);
            END LOOP;
        END $$;
        """, [self.pk, to_module.pk])

    def __str__(self):
        return 'Module: {}'.format(self.name)
