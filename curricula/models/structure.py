from builtins import setattr

from django.db import models, connection
from django_light_enums import enum
from shortuuidfield import ShortUUIDField

from pib_auth.models import User
from profiles.models import Profile

from . import BaseModel, get_earliest_gap


class CurriculumQuerySet(models.QuerySet):

    def get_default(self, user=None):
        # try to find curriculum in last classrooms
        if user and user.profile.as_student_classrooms.count() > 0:
            return user.profile.as_student_classrooms.last().curriculum

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
    cover_photo = models.ImageField(blank=True)
    description = models.TextField(blank=True, null=True, default='')
    number_of_learners_denormalized = models.IntegerField(default=0, null=True, blank=True)

    author = models.ForeignKey(User, on_delete=models.CASCADE)
    collaborators = models.ManyToManyField(Profile, related_name='coauthored_curricula')

    # settings
    setting_units_unlocked = models.BooleanField(default=False, blank=True)
    setting_modules_unlocked = models.BooleanField(default=False, blank=True)
    setting_lessons_unlocked = models.BooleanField(default=False, blank=True)
    setting_publically = models.BooleanField(default=False, blank=True)

    def count_number_of_learners(self, LessonProgressClass):
        lps_count = LessonProgressClass.objects.filter(status=30,  # LessonProgress.Status.COMPLETE
                                                       lesson__module__unit__curriculum=self). \
            values('profile').distinct().count()

        self.number_of_learners_denormalized = lps_count
        self.save(update_fields=['number_of_learners_denormalized'])

    def clone(self, to_curriculum):
        # copy name, image, description, cover_photo from self to to_curriculum
        for attr in ('image', 'description', 'cover_photo'):
            # 'name', don't copy name due default issue
            setattr(to_curriculum, attr, getattr(self, attr))
        to_curriculum.save()

        # from django.db import transaction
        # with transaction.atomic():
        #     for unit in self.units.all():
        #         unit.clone(to_curriculum)

        # FIXME:
        # 1. DOCS for an only posgresql support for now
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
                    FOR module_row IN
                        SELECT * FROM "clone_modules"(unit_row.unit_id_from, unit_row.unit_id_to)
                    LOOP
                        FOR lesson_row IN
                            SELECT * FROM "clone_lessons"(module_row.module_id_from, module_row.module_id_to)
                        LOOP
                            FOR question_row IN
                                SELECT * FROM "clone_questions"(lesson_row.lesson_id_from, lesson_row.lesson_id_to)
                            LOOP
                                -- clone quesion vectors
                                PERFORM "clone_quesion_vectors"(question_row.question_id_from, question_row.question_id_to);
                                PERFORM "clone_answers"(question_row.question_id_from, question_row.question_id_to);
                            END LOOP;
                        END LOOP;
                    END LOOP;
                END LOOP;
                END $$;
                """, [self.id, to_curriculum.id])

    def __str__(self):
        return 'Curriculum: {}'.format(self.name)

    def get_frontend_url(self):
        return '/curriculum/{}/'.format(self.uuid)


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
                        PERFORM "clone_quesion_vectors"(question_row.question_id_from, question_row.question_id_to);
                        PERFORM "clone_answers"(question_row.question_id_from, question_row.question_id_to);
                    END LOOP;
                END LOOP;
            END LOOP;
        END $$;
        """, [self.id, to_unit.id])


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
                    PERFORM "clone_quesion_vectors"(question_row.question_id_from, question_row.question_id_to);
                    PERFORM "clone_answers"(question_row.question_id_from, question_row.question_id_to);
                END LOOP;
            END LOOP;
        END $$;
        """, [self.id, to_module.id])

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
                PERFORM "clone_quesion_vectors"(question_row.question_id_from, question_row.question_id_to);
                PERFORM "clone_answers"(question_row.question_id_from, question_row.question_id_to);
            END LOOP;
        END $$;
        """, [self.id, to_lesson.id])

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
    lesson = models.OneToOneField(Lesson, related_name='game', on_delete=models.CASCADE)
    slug = models.SlugField(null=True, blank=True)

    def __str__(self):
        return 'Game: {}'.format(self.slug)
