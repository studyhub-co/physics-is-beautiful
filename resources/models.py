from django.db import models


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

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    deleted_on = models.DateTimeField(blank=True, null=True)
    resource_type = models.CharField(max_length=2, choices=RESOURCE_TYPE_CHOICES, default=TEXTBOOK)


class TextBookSection(models.Model):
    title = models.CharField(max_length=400)
    resource = models.ForeignKey(Resource, related_name='sections')


class TextBookProblem(models.Model):
    title = models.CharField(max_length=400)
    textbooksection = models.ForeignKey(Resource, related_name='problems')
