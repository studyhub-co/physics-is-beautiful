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

    def clone_children(self, to_unit):
        with connection.cursor() as cursor:
            cursor.execute("""
        DO $$
        DECLARE
            module_row record;
            lesson_row record;
            question_row record;
        BEGIN
        RAISE NOTICE 'Start unit forking...';
            FOR module_row IN
                SELECT * FROM "clone_modules"(%s, %s)
            LOOP
                FOR lesson_row IN
                    SELECT * FROM "clone_lessons"(module_row.module_id_from, module_row.module_id_to)
                LOOP
                    FOR question_row IN
                        SELECT * FROM "clone_questions"(lesson_row.lesson_id_from, lesson_row.lesson_id_to)
                    LOOP
                        -- clone quesion vectors
                        PERFORM "clone_question_vectors"(question_row.question_id_from, question_row.question_id_to);
                        PERFORM "clone_answers"(question_row.question_id_from, question_row.question_id_to);
                    END LOOP;
                END LOOP;
            END LOOP;
        END $$;
        """, [self.pk, to_unit.pk])
