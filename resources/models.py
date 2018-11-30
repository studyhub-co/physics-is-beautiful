import os

from django.db import models
from django.dispatch import receiver
from django.conf import settings

from django.contrib.postgres.fields import JSONField
from django.core.serializers.json import DjangoJSONEncoder

from shortuuidfield import ShortUUIDField

from .validators import validate_pdf_extension


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


class ResourceMetaData(models.Model):
    resource = models.OneToOneField(Resource, related_name='metadata')
    data = JSONField(encoder=DjangoJSONEncoder)


class TextBookChapter(models.Model):
    title = models.CharField(max_length=400)
    position = models.PositiveSmallIntegerField("Position")
    resource = models.ForeignKey(Resource, related_name='sections')


class TextBookProblem(models.Model):
    title = models.CharField(max_length=400)
    position = models.PositiveSmallIntegerField("Position")
    textbook_section = models.ForeignKey(TextBookChapter, related_name='problems')


class TextBookSolutionPDF(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to="resources/%Y/%m/%d", validators=[validate_pdf_extension])


# signal to remove file onDelete
@receiver(models.signals.post_delete, sender=TextBookSolutionPDF)
def delete_file(sender, instance, *args, **kwargs):
    """ Deletes pdfs on `post_delete` """
    if instance.file:
        instance.file.delete(save=False)


class TextBookSolution(models.Model):
    pdf = models.OneToOneField(TextBookSolutionPDF, related_name='solution')
    _title = models.CharField(max_length=400, blank=True, default='', db_column='title')
    position = models.PositiveSmallIntegerField("Position")
    textbook_problem = models.ForeignKey(TextBookProblem, related_name='solutions')
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='resources_solutions')

    @property
    def title(self):
        if self._title:
            return self._title
        else:
            return self.pdf.file.filename


