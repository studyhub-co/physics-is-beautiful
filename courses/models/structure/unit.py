from django.db import models, connection

from taggit.managers import TaggableManager

from .course import Course
from .. import BaseItemModel, get_earliest_gap
from ..utils import UUIDTaggedItem


class Unit(BaseItemModel):

    class Meta:
        ordering = ['position']

    # class CloneMeta:
    #     parent_field = 'course'
    #     children_field = 'modules'

    course = models.ForeignKey(Course, related_name='units', on_delete=models.CASCADE)
    published_on = models.DateTimeField('date published', null=True, blank=True)
    image = models.ImageField(blank=True)
    position = models.PositiveSmallIntegerField("Position", null=True, blank=True)

    tags = TaggableManager(through=UUIDTaggedItem, related_name='courses_units')

    def save(self, *args, **kwargs):
        if self.position is None:
            taken_positions = list(
                Unit.objects.filter(course=self.course).values_list('position', flat=True)
            )
            self.position = get_earliest_gap(taken_positions)
        super(Unit, self).save(*args, **kwargs)

    def __str__(self):
        return 'Unit: {}'.format(self.name)

    def clone(self, to_parent_course):
        copy = self.instance_from_db()
        # reset uuid, so Django will save the new object
        copy.uuid = None
        copy.thread_id = None
        copy.name = '{} forked'.format(copy.name)
        # attach to selected module
        copy.course = to_parent_course
        copy.save()
        self.clone_children(copy)
        return copy

    def clone_children(self, to_unit):
        with connection.cursor() as cursor:
            cursor.execute("""
        DO $$
        DECLARE
            module_row record;
            lesson_row record;
            material_row record;
        BEGIN
        RAISE NOTICE 'Start unit forking...';
            PERFORM "courses_clone_tags"('unit', %s, %s);
            FOR module_row IN
                SELECT * FROM "courses_clone_modules"(%s, %s)
            LOOP
                PERFORM "courses_clone_tags"('module', module_row.module_id_from, module_row.module_id_to);
                FOR lesson_row IN
                    SELECT * FROM "courses_clone_lessons"(module_row.module_id_from, module_row.module_id_to)
                LOOP
                    -- PERFORM "courses_clone_materials"(lesson_row.lesson_id_from, lesson_row.lesson_id_to);
                    PERFORM "courses_clone_tags"('lesson', lesson_row.lesson_id_from, lesson_row.lesson_id_to);
                    FOR material_row IN
                        SELECT * FROM "courses_clone_materials"(lesson_row.lesson_id_from, lesson_row.lesson_id_to)
                    LOOP
                        -- clone tags
                        PERFORM "courses_clone_tags"('material', material_row.material_id_from, material_row.material_id_to);
                    END LOOP;
                END LOOP;
            END LOOP;
        END $$;
        """, [self.pk, to_unit.pk, self.pk, to_unit.pk])
