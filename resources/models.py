from django.db import models

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


class TextBookSolution(models.Model):
    pdf = models.OneToOneField(TextBookProblem, related_name='solution')
    title = models.CharField(max_length=400)
    position = models.PositiveSmallIntegerField("Position")
    textbook_problem = models.ForeignKey(TextBookProblem, related_name='solutions')

