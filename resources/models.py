import os

from django.db import models
from django.dispatch import receiver
from django.utils import timezone

from django.contrib.postgres.fields import JSONField
from django.core.serializers.json import DjangoJSONEncoder

from shortuuidfield import ShortUUIDField

from vote.models import VoteModel

from profiles.models import Profile
from djeddit.models import Thread

from .validators import validate_pdf_extension

# from moderation.db import ModeratedModel


# class Resource(ModeratedModel):
class Resource(models.Model):
    TEXTBOOK = 'TB'
    ONLINE = 'OL'
    TEST = 'TS'
    COURSE = 'CR'

    RESOURCE_TYPE_CHOICES = (
        (TEXTBOOK, 'textbook'),
        # (ONLINE, 'online learning resource'),
        # (TEST, 'standardized test'),
        # (COURSE, 'course')
    )

    uuid = ShortUUIDField(unique=True)

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    deleted_on = models.DateTimeField(blank=True, null=True)
    resource_type = models.CharField(max_length=2, choices=RESOURCE_TYPE_CHOICES, default=TEXTBOOK)
    owner = models.ForeignKey(Profile, related_name='resources')
    count_views = models.IntegerField(default=0)

    class Moderator:
        notify_moderator = True
        auto_approve_for_superusers = True
        fields_exclude = ['count_views', ]

# TODO signal for remove djedit Topic onDelete resource


class RecentUserResource(models.Model):
    user = models.ForeignKey(Profile, related_name='recent_resources')
    resource = models.ForeignKey(Resource, related_name='user_recent_list')
    last_access_date = models.DateTimeField(auto_now=True)


class ResourceMetaData(models.Model):
    resource = models.OneToOneField(Resource, related_name='metadata')
    data = JSONField(encoder=DjangoJSONEncoder)


class TextBookChapter(models.Model):
    title = models.CharField(max_length=400)
    position = models.PositiveSmallIntegerField("Position")
    resource = models.ForeignKey(Resource, related_name='sections')

    class Meta:
        ordering = ['position']


class TextBookProblem(models.Model):
    uuid = ShortUUIDField(unique=True)
    title = models.CharField(max_length=400)
    position = models.PositiveSmallIntegerField("Position")
    textbook_section = models.ForeignKey(TextBookChapter, related_name='problems')
    posted_by = models.ForeignKey(Profile, related_name='resources_problems', null=True)

    class Meta:
        ordering = ['position']


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
    pdf = models.OneToOneField(TextBookSolutionPDF, related_name='solution')
    _title = models.CharField(max_length=400, blank=True, default='', db_column='title')
    position = models.PositiveSmallIntegerField("Position")
    textbook_problem = models.ForeignKey(TextBookProblem, related_name='solutions')
    posted_by = models.ForeignKey(Profile, related_name='resources_solutions')
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    count_views = models.IntegerField(default=0)
    thread = models.OneToOneField(Thread, related_name='textbook_solution', null=True)

    @property
    def title(self):
        if self._title:
            return self._title
        else:
            if self.pdf:
                return os.path.basename(self.pdf.file.name)
            else:
                return ''

    class Meta:
        ordering = ['position']

