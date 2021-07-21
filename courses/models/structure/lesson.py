from django.db import models, connection

from taggit.managers import TaggableManager

from .module import Module
from .. import BaseItemModel, get_earliest_gap
from ...settings import LESSON_COMPLETE_BOUNDARY
from ..utils import UUIDTaggedItem

class Lesson(BaseItemModel):

    class Meta:
        ordering = ['position']

    module = models.ForeignKey(Module, related_name='lessons', on_delete=models.CASCADE)
    # name = models.CharField(max_length=200)
    published_on = models.DateTimeField('date published', null=True, blank=True)
    image = models.ImageField(blank=True)
    position = models.PositiveSmallIntegerField("Position", null=True, blank=True)
    complete_boundary = models.PositiveSmallIntegerField("Lesson complete boundary (percent)",
                                                         default=LESSON_COMPLETE_BOUNDARY)

    tags = TaggableManager(through=UUIDTaggedItem, related_name='courses_lessons')

    @property
    def is_start(self):
        return self.position == 0 and self.module.position == 0 and self.module.unit.position == 0

    def get_previous_lesson(self):
        return Lesson.objects.filter(
            models.Q(position__lt=self.position, module=self.module) |
            models.Q(module__position__lt=self.module.position, module__unit=self.module.unit) |
            models.Q(
                module__unit__position__lt=self.module.unit.position,
                module__unit__course=self.module.unit.course
            )
        ).order_by('-module__unit__position', '-module__position', '-position').first()

    def get_next_lesson(self):
        return Lesson.objects.filter(
            models.Q(position__gt=self.position, module=self.module) |
            models.Q(module__position__gt=self.module.position, module__unit=self.module.unit) |
            models.Q(
                module__unit__position__gt=self.module.unit.position,
                module__unit__course=self.module.unit.course
            )
        ).order_by('module__unit__position', 'module__position', 'position').first()

    def save(self, *args, **kwargs):
        if self.position is None:
            taken_positions = list(
                Lesson.objects.filter(module=self.module).values_list('position', flat=True)
            )
            self.position = get_earliest_gap(taken_positions)
        super(Lesson, self).save(*args, **kwargs)

    def clone_children(self, to_lesson):
        with connection.cursor() as cursor:
            cursor.execute("""
        DO $$
        DECLARE 
            question_row record;
        BEGIN
        RAISE NOTICE 'Start lesson forking...';
            FOR question_row IN
                SELECT * FROM "clone_questions"(%s, %s)
            LOOP
                -- clone quesion vectors
                PERFORM "clone_question_vectors"(question_row.question_id_from, question_row.question_id_to);
                PERFORM "clone_answers"(question_row.question_id_from, question_row.question_id_to);
            END LOOP;
        END $$;
        """, [self.id, to_lesson.id])

    def __str__(self):
        return 'Lesson: {}'.format(self.name)
