import os

from django.db import models
from django.conf import settings
from django.dispatch import receiver
# from django.utils.text import slugify

from django.core.validators import MinValueValidator
from django.contrib.postgres.fields import JSONField
from django.core.serializers.json import DjangoJSONEncoder
from django.core.exceptions import ImproperlyConfigured

from slugify import Slugify
from shortuuidfield import ShortUUIDField

from vote.models import VoteModel
from profiles.models import Profile
from djeddit.models import Thread

from .validators import validate_pdf_extension, max_value_current_year

# from moderation.db import ModeratedModel
# from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

slugify = Slugify()
slugify.safe_chars = '.'
slugify.to_lower = True

try:
    textbook_resource_thread_related_name = settings.DJEDDIT_RELATED_FIELDS['textbook_resource']
except (KeyError, AttributeError):
    raise ImproperlyConfigured("Can't find settings.DJEDDIT_RELATED_FIELDS['textbook_resource'] settings")

try:
    textbook_problem_thread_related_name = settings.DJEDDIT_RELATED_FIELDS['textbook_problem']
except (KeyError, AttributeError):
    raise ImproperlyConfigured("Can't find settings.DJEDDIT_RELATED_FIELDS['textbook_problem'] settings")

try:
    textbook_solution_thread_related_name = settings.DJEDDIT_RELATED_FIELDS['textbook_solution']
except (KeyError, AttributeError):
    raise ImproperlyConfigured("Can't find settings.DJEDDIT_RELATED_FIELDS['textbook_solution'] settings")


# class Resource(ModeratedModel):
class Resource(models.Model):
    TEXTBOOK = 'TB'
    ONLINE = 'OL'
    TEST = 'TS'
    COURSE = 'CR'

    RESOURCE_TYPE_CHOICES = (
        (TEXTBOOK, 'textbook'),
        # (ONLINE, 'online learning resource'),
        (TEST, 'standardized test'),
        # (COURSE, 'course')
    )

    uuid = ShortUUIDField(unique=True)

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    deleted_on = models.DateTimeField(blank=True, null=True)
    resource_type = models.CharField(max_length=2, choices=RESOURCE_TYPE_CHOICES, default=TEXTBOOK)
    owner = models.ForeignKey(Profile, related_name='resources', on_delete=models.CASCADE)
    count_views = models.IntegerField(default=0)
    thread = models.OneToOneField(Thread, related_name=textbook_resource_thread_related_name, null=True,
                                  on_delete=models.CASCADE)
    title = models.CharField(max_length=512, blank=True, null=True, help_text='title in the admin site')

    def __str__(self):
        return 'Resource: {}'.format(self.title)

    def get_frontend_url(self):
        # return '/resources/{}/{}/'.format(slugify(self.title), self.uuid)
        try:
            return '/resources/{}/{}/'.\
                format(slugify(self.metadata.data['volumeInfo']['title'])
                       , self.uuid)
        except (KeyError, ResourceMetaData.DoesNotExist, AttributeError):
            return '/resources/{}/{}/'.format('unknown-resource', self.uuid)

    class Moderator:
        notify_moderator = True
        auto_approve_for_superusers = True
        fields_exclude = ['count_views', ]


# metadata are created by another serializer
# this signal only for update in admin site
@receiver(models.signals.post_save, sender=Resource)
def save_title(sender, instance, *args, **kwargs):
    """ add denorm title field """
    if not instance.title:
        if instance.resource_type == Resource.TEXTBOOK and hasattr(instance, 'metadata'):
            instance.title = instance.metadata.data['volumeInfo']['title']
            instance.save()
        elif instance.resource_type == Resource.TEST and hasattr(instance, 'standardized_test_info'):
            # Physics GRE 2008 - test 9677
            instance.title = 'Physics GRE {} - test {}'\
                .format(instance.standardized_test_info.test_year, instance.test_number.test_number)
            instance.save()


# TODO signal for remove comments Topic onDelete resource
class StandardizedTestResource(models.Model):
    resource = models.OneToOneField(Resource, related_name='standardized_test_info', on_delete=models.CASCADE)
    test_number = models.CharField(max_length=100)
    test_year = models.PositiveIntegerField(validators=[MinValueValidator(1900), max_value_current_year])
    pdf_of_exam = models.FileField(upload_to="resources/standardized_test/%Y/%m/%d",
                                   validators=[validate_pdf_extension],
                                   null=True
                                   )


class RecentUserResource(models.Model):
    user = models.ForeignKey(Profile, related_name='recent_resources', on_delete=models.CASCADE)
    resource = models.ForeignKey(Resource, related_name='user_recent_list', on_delete=models.CASCADE)
    last_access_date = models.DateTimeField(auto_now=True)


class ResourceMetaData(models.Model):
    resource = models.OneToOneField(Resource, related_name='metadata', on_delete=models.CASCADE)
    data = JSONField(encoder=DjangoJSONEncoder)


class TextBookChapter(models.Model):
    title = models.CharField(max_length=400)
    position = models.PositiveSmallIntegerField("Position")
    resource = models.ForeignKey(Resource, related_name='sections', on_delete=models.CASCADE)
    posted_by = models.ForeignKey(Profile, related_name='resources_chapter', null=True, on_delete=models.CASCADE)
    show_ad = models.NullBooleanField()

    class Meta:
        ordering = ['position']


# class TextBookProblem(models.Model):
class ResourceProblem(models.Model):
    uuid = ShortUUIDField(unique=True)
    title = models.CharField(max_length=400)
    position = models.PositiveSmallIntegerField("Position")
    textbook_section = models.ForeignKey(TextBookChapter, related_name='problems', null=True, on_delete=models.CASCADE)
    resource = models.ForeignKey(Resource, related_name='problems', null=True, on_delete=models.CASCADE)
    posted_by = models.ForeignKey(Profile, related_name='resources_problems', null=True, on_delete=models.CASCADE)
    count_views = models.IntegerField(default=0)
    thread = models.OneToOneField(Thread, related_name=textbook_problem_thread_related_name, null=True,
                                  on_delete=models.CASCADE)
    # resource used in StandardizedTestResource
    # resource = models.ForeignKey(Resource, related_name='problems')

    def get_frontend_url(self):
        # TODO check resource type
        try:
            return '/resources/{}/problems/{}/{}/'.format(
                slugify(self.textbook_section.resource.metadata.data['volumeInfo']['title']),
                slugify(self.title),
                self.uuid)
        except (KeyError, ResourceMetaData.DoesNotExist, AttributeError):
            return '/resources/{}/problems/{}/{}/'.format(
                'unknown-resource',
                slugify(self.title),
                self.uuid)


class TextBookSolutionPDF(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to="resources/%Y/%m/%d", validators=[validate_pdf_extension])
    external_url = models.URLField(max_length=255, blank=True, null=True)


# signal to remove file onDelete
@receiver(models.signals.post_delete, sender=TextBookSolutionPDF)
def delete_file(sender, instance, *args, **kwargs):
    """ Deletes pdfs on `post_delete` """
    if instance.file:
        instance.file.delete(save=False)


class TextBookSolution(VoteModel, models.Model):
    uuid = ShortUUIDField(unique=True)
    pdf = models.OneToOneField(TextBookSolutionPDF, related_name='solution', on_delete=models.CASCADE)
    _title = models.CharField(max_length=400, blank=True, default='', db_column='title')
    position = models.PositiveSmallIntegerField("Position")
    textbook_problem = models.ForeignKey(ResourceProblem, related_name='solutions', on_delete=models.CASCADE)
    posted_by = models.ForeignKey(Profile, related_name='resources_solutions', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    count_views = models.IntegerField(default=0)
    thread = models.OneToOneField(Thread, related_name=textbook_solution_thread_related_name, null=True,
                                  on_delete=models.CASCADE)

    @property
    def title(self):
        if self._title:
            return self._title
        else:
            if self.pdf:
                return os.path.basename(self.pdf.file.name)
            else:
                return ''

    @title.setter
    def title(self, value):
        self._title = value

    def get_frontend_url(self):
        # return '/resources/{}/problems/{}/solutions/{}/{}/'.format(
        #     slugify(self.textbook_problem.textbook_section.resource.title),
        #     slugify(self.textbook_problem.title),
        #     slugify(self.title),
        #     self.uuid)
        try:
            return '/resources/{}/problems/{}/solutions/{}/{}/'.format(
                slugify(self.textbook_problem.textbook_section.resource.metadata.data['volumeInfo']['title']),
                slugify(self.textbook_problem.title),
                slugify(self.title),
                self.uuid)
        except (KeyError, ResourceMetaData.DoesNotExist, AttributeError):
            return '/resources/{}/problems/{}/solutions/{}/{}/'.format(
                'unknown-resource',
                slugify(self.textbook_problem.title),
                slugify(self.title),
                self.uuid)

    class Meta:
        ordering = ['-vote_score']


# class GoogleAd(models.Model):
#     # TODO move to GoogleAds application
#     content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
#     object_id = models.PositiveIntegerField()
#     content_object = GenericForeignKey()
#     client = models.CharField(max_length=255)
#     slot = models.CharField(max_length=255)
#     title = models.CharField(max_length=255)

