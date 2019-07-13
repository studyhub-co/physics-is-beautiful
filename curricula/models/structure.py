from builtins import setattr

from django.db import models
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
        for attr in ('name', 'image', 'description', 'cover_photo'):
            setattr(to_curriculum, attr, getattr(self, attr))
        to_curriculum.save()

        from django.db import connection
        # from django.db import transaction
        # with transaction.atomic():
        #     for unit in self.units.all():
        #         unit.clone(to_curriculum)

        # copy units with one query
        # FIXME:
        # 1. DOCS for an only posgresql support for now
        # 2. Create a test for check this query will be correct with added/removed fields to models
        # 3. Add checking that uuid is unique
        # 4. Use ClonMeta fields (add copied fields list)
        # with connection.cursor() as cursor:
        #         #     # units
        #         #     cursor.execute("""
        #         #      insert into public.curricula_units (created_on, updated_on, uuid,
        #         #      "name", image, "position", curriculum_id)
        #         #      SELECT NOW(), NOW(),
        #         #      SUBSTRING(REPLACE(uuid_generate_v4()::text, '-', '') for 22),
        #         #      "name", image, "position", %s
        #         #      FROM public.curricula_units
        #         #      WHERE curriculum_id=%s;
        #         #     """, [to_curriculum.id, self.id])

        with connection.cursor() as cursor:
            cursor.execute("""
                CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        
                -- clone modules
                DROP FUNCTION IF EXISTS clone_modules;
                CREATE function clone_modules(IN unit_uuid_from varchar, IN unit_uuid_to varchar) 
                    RETURNS void
                AS $body$
                begin
                RAISE NOTICE 'Hello from void function';
                RETURN;
                end;
                $body$
                language plpgsql;
                
                -- clone units
                DROP FUNCTION IF EXISTS clone_units;
                CREATE FUNCTION clone_units(IN curr_id_from INT, IN curr_id_to INT) 
                RETURNS TABLE (
                      unit_uuid_from VARCHAR,
                      unit_uuid_to VARCHAR
                ) 
                AS $body$
                BEGIN
                RETURN QUERY
                WITH sel AS (
                   SELECT id, "name", image, "position", uuid, row_number() OVER (ORDER BY id) AS rn
                   FROM public.curricula_units
                   WHERE curriculum_id=curr_id_from
                   ORDER BY id
                   )
                   , ins AS (
                   INSERT INTO public.curricula_units 
                    (created_on, updated_on, uuid, "name", image, "position", curriculum_id)
                   SELECT 
                    NOW(), NOW(), SUBSTRING(REPLACE(uuid_generate_v4()::text, '-', '') for 22), 
                    "name", image, "position", curr_id_to
                   FROM sel ORDER BY id
                   RETURNING id, uuid
                )
                SELECT i.uuid AS unit_uuid_from, s.uuid AS unit_uuid_to
                FROM (SELECT uuid, row_number() OVER (ORDER BY id) AS rn FROM ins) i
                JOIN sel s USING (rn);
                
                END;
                $body$
                language plpgsql;
                
                DO $$
                DECLARE 
                    unit_row record;
                BEGIN
                RAISE NOTICE 'Start forking...';
                FOR unit_row IN
                    SELECT * FROM "clone_units"(%s, %s)
                LOOP
                -- 	SELECT * FROM "clone_modules"(unit_row.unit_uuid_from, unit_row.unit_uuid_to);
                    PERFORM "clone_modules"(unit_row.unit_uuid_from, unit_row.unit_uuid_to);
                END LOOP;
                END $$;
                """, [self.id, to_curriculum.id])

        # TODO add lesson, etc copying functional

        # from django.db import connections
        # qs = connections['default'].queries
        # pass

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
    lesson = models.OneToOneField(Lesson, related_name='game', on_delete=models.CASCADE)
    slug = models.SlugField(null=True, blank=True)

    def __str__(self):
        return 'Game: {}'.format(self.slug)
