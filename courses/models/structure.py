from enum import Enum
from builtins import setattr

from django.db import models, connection
from taggit.managers import TaggableManager

from profiles.models import Profile

from . import BaseItemModel, get_earliest_gap
from .utils import UUIDTaggedItem


class CourseQuerySet(models.QuerySet):

    def get_default(self, user=None):
        # try to find course in last classrooms
        if user and user.profile.as_student_classrooms.count() > 0:
            return user.profile.as_student_classrooms.last().course

        return self.filter(is_default=True).first()  # get first default


class Course(BaseItemModel):

    class Meta:
        verbose_name_plural = "courses"

    class CloneMeta:
        children_field = 'units'

    objects = CourseQuerySet.as_manager()

    # name = models.CharField(max_length=200, db_index=True)
    published_on = models.DateTimeField('date published', null=True, blank=True)
    image = models.ImageField(blank=True)
    cover_photo = models.ImageField(blank=True)
    description = models.TextField(blank=True, null=True, default='')
    number_of_learners_denormalized = models.IntegerField(default=0, null=True, blank=True)

    # TODO replace with null on delete?
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    collaborators = models.ManyToManyField(Profile, related_name='coauthored_courses')

    # settings
    setting_units_unlocked = models.BooleanField(default=False, blank=True)
    setting_modules_unlocked = models.BooleanField(default=False, blank=True)
    setting_lessons_unlocked = models.BooleanField(default=False, blank=True)
    setting_publically = models.BooleanField(default=False, blank=True)
    is_default = models.BooleanField(default=False, blank=True)

    tags = TaggableManager(through=UUIDTaggedItem, related_name='courses_coursess')

    def count_number_of_learners(self, LessonProgressClass):
        lps_count = LessonProgressClass.objects.filter(status=30,  # LessonProgressStatus.COMPLETE
                                                       lesson__module__unit__course=self). \
            values('profile').distinct().count()

        self.number_of_learners_denormalized = lps_count
        self.save(update_fields=['number_of_learners_denormalized'])

    def clone(self, to_course):
        # copy name, image, description, cover_photo from self to to_course
        for attr in ('image', 'description', 'cover_photo'):
            # 'name', don't copy name due default issue
            setattr(to_course, attr, getattr(self, attr))
            to_course.save()

        # FIXME:
        # 1. DOCS: only posgresql support for now
        # 2. Create a test for check that this query will be correct with added/removed fields in models
        # 3. Add checking that uuid is unique
        # 4. Use ClonMeta fields (add copied fields list) / we can make this script more dynamic (dynamic fields, etc)
        # 5. User should be superuser of db to first create uuid-ossp extension (or superuser should run command
        #    before user will be use this sript)
        with connection.cursor() as cursor:
            cursor.execute("""
                DO $$
                DECLARE 
                    unit_row record;
                    module_row record;
                    lesson_row record;
                    question_row record;
                BEGIN
                RAISE NOTICE 'Start forking...';
                FOR unit_row IN
                    SELECT * FROM "clone_units"(%s, %s)
                LOOP
                    PERFORM "clone_tags"('unit', unit_row.unit_id_from, unit_row.unit_id_to);
                    FOR module_row IN
                        SELECT * FROM "clone_modules"(unit_row.unit_id_from, unit_row.unit_id_to)
                    LOOP
                        PERFORM "clone_tags"('module', module_row.module_id_from, module_row.module_id_to);
                        FOR lesson_row IN
                            SELECT * FROM "clone_lessons"(module_row.module_id_from, module_row.module_id_to)
                        LOOP
                            PERFORM "clone_tags"('lesson', lesson_row.lesson_id_from, lesson_row.lesson_id_to);
                            FOR question_row IN
                                SELECT * FROM "clone_questions"(lesson_row.lesson_id_from, lesson_row.lesson_id_to)
                            LOOP
                                PERFORM "clone_tags"('question', question_row.question_id_from, question_row.question_id_to);
                                -- clone quesion vectors
                                PERFORM "clone_question_vectors"(question_row.question_id_from, question_row.question_id_to);
                                PERFORM "clone_answers"(question_row.question_id_from, question_row.question_id_to);
                            END LOOP;
                        END LOOP;
                    END LOOP;
                END LOOP;
                END $$;
                """, [self.id, to_course.id])

    def __str__(self):
        return 'Course: {}'.format(self.name)


class Unit(BaseItemModel):

    class Meta:
        ordering = ['position']

    class CloneMeta:
        parent_field = 'course'
        children_field = 'modules'

    course = models.ForeignKey(Course, related_name='units', on_delete=models.CASCADE)
    # name = models.CharField(max_length=200)
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
        """, [self.id, to_unit.id])


class Module(BaseItemModel):

    class Meta:
        ordering = ['position']

    unit = models.ForeignKey(Unit, related_name='modules', on_delete=models.CASCADE)
    # name = models.CharField(max_length=200)
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
                SELECT * FROM "clone_lessons"(%s, %s)
            LOOP
                FOR question_row IN
                    SELECT * FROM "clone_questions"(lesson_row.lesson_id_from, lesson_row.lesson_id_to)
                LOOP
                    -- clone quesion vectors
                    PERFORM "clone_question_vectors"(question_row.question_id_from, question_row.question_id_to);
                    PERFORM "clone_answers"(question_row.question_id_from, question_row.question_id_to);
                END LOOP;
            END LOOP;
        END $$;
        """, [self.id, to_module.id])

    def __str__(self):
        return 'Module: {}'.format(self.name)


class Lesson(BaseItemModel):

    class Meta:
        ordering = ['position']

    module = models.ForeignKey(Module, related_name='lessons', on_delete=models.CASCADE)
    # name = models.CharField(max_length=200)
    published_on = models.DateTimeField('date published', null=True, blank=True)
    image = models.ImageField(blank=True)
    position = models.PositiveSmallIntegerField("Position", null=True, blank=True)

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


# class Game(BaseItemModel):
#
#     lesson = models.OneToOneField(Lesson, related_name='game', on_delete=models.CASCADE)
#     slug = models.SlugField(null=True, blank=True)
#
#     def __str__(self):
#         return 'Game: {}'.format(self.slug)
