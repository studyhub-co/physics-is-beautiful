from builtins import setattr

from django.db import models, connection
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver

from taggit.managers import TaggableManager

from profiles.models import Profile
from .. import BaseItemModel
from ..utils import UUIDTaggedItem


class CourseQuerySet(models.QuerySet):

    def get_default(self, user=None):
        # try to find course in last classrooms
        # if user and user.profile.as_student_classrooms.count() > 0:
        #     TODO it seems we have not student classrooms order now
        #     TODO 'the last' should mean - the last classroom that a student took a part?
        #     if user.profile.as_student_classrooms.last().course:
        #         return user.profile.as_student_classrooms.last().course
        #     return user.profile.as_student_classrooms.last().curriculum

        # we moved from classroom last to profile.selected_course
        if user and user.profile.selected_course:
            return user.profile.selected_course

        # this is return null if we have no is_default
        return self.filter(is_default=True).first()  # get first default


class Course(BaseItemModel):

    class Meta:
        verbose_name_plural = "courses"

    # class CloneMeta:
    #     children_field = 'units'

    objects = CourseQuerySet.as_manager()

    # name = models.CharField(max_length=200, db_index=True)
    published_on = models.DateTimeField('date published', null=True, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to='courses_images')
    cover_photo = models.ImageField(null=True, blank=True, upload_to='courses_covers')
    description = models.TextField(blank=True, null=True, default='')
    number_of_learners_denormalized = models.IntegerField(default=0, null=True, blank=True)

    # author already exist in BaseItemModel
    # author = models.ForeignKey(Profile, on_delete=models.CASCADE)
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
        for attr in ('image', 'description', 'cover_photo', 'author_id'):
            to_course.name = '{} forked'.format(self.name)
            setattr(to_course, attr, getattr(self, attr))
            to_course.save()

        # FIXME:
        # 1. DOCS: only posgresql support for now
        # 2. Create a test for check that this query will be correct with added/removed fields in models
        # 3. Use ClonMeta fields (add copied fields list) / we can make this script more dynamic (dynamic fields, etc)
        # 4. User should be superuser of db to first create uuid-ossp extension (or superuser should run command
        #    before user will be use this script)
        with connection.cursor() as cursor:
            cursor.execute("""
                DO $$
                DECLARE 
                    unit_row record;
                    module_row record;
                    lesson_row record;
                    material_row record;
                BEGIN
                RAISE NOTICE 'Start forking...';
                FOR unit_row IN
                    SELECT * FROM "courses_clone_units"(%s, %s)
                LOOP
                    PERFORM "courses_clone_tags"('unit', unit_row.unit_id_from, unit_row.unit_id_to);
                    FOR module_row IN
                        SELECT * FROM "courses_clone_modules"(unit_row.unit_id_from, unit_row.unit_id_to)
                    LOOP
                        PERFORM "courses_clone_tags"('module', module_row.module_id_from, module_row.module_id_to);
                        FOR lesson_row IN
                            SELECT * FROM "courses_clone_lessons"(module_row.module_id_from, module_row.module_id_to)
                        LOOP
                            PERFORM "courses_clone_tags"('lesson', lesson_row.lesson_id_from, lesson_row.lesson_id_to);
                            FOR material_row IN
                                SELECT * FROM "courses_clone_materials"(lesson_row.lesson_id_from, lesson_row.lesson_id_to)
                            LOOP
                                PERFORM "courses_clone_tags"('material', material_row.material_id_from, material_row.material_id_to);
                            END LOOP;
                        END LOOP;
                    END LOOP;
                END LOOP;
                END $$;
                """, [self.pk, to_course.pk])

    def __str__(self):
        return 'Course: {}'.format(self.name)


@receiver(post_delete, sender=Course)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    # TODO check that file is now used by another courses, we can have forked version with the same image
    instance.cover_photo.delete(save=False)
    instance.image.delete(save=False)


@receiver(pre_save, sender=Course)
def auto_delete_file_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return False

    # TODO check that file is now used by another courses, we can have forked version with the same image
    try:
        old_instance = Course.objects.get(pk=instance.pk)
        if not old_instance.cover_photo == instance.cover_photo:
            old_instance.cover_photo.delete(save=False)
        if not old_instance.image == instance.image:
            old_instance.image.delete(save=False)
    except Course.DoesNotExist:
        pass
