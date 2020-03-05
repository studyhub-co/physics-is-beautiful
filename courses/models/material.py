from enum import Enum

from django.db import models
from django.contrib.postgres.fields import JSONField
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured

from taggit.managers import TaggableManager
from djeddit.models import Thread

from . import Lesson, BaseItemModel, MaterialProblemType
from .utils import UUIDTaggedItem

try:
    course_question_thread_related_name = settings.DJEDDIT_RELATED_FIELDS['course_material']
except (KeyError, AttributeError):
    raise ImproperlyConfigured("Can't find settings.DJEDDIT_RELATED_FIELDS['course_material'] settings")


class MaterialWorkflowType(Enum):
    # TODO create validation schema for all types
    COMMON = 10  # by defaut
    GAME = 20
    QA_COMMON = 80
    QA_MYSQL = 90


class Material(BaseItemModel):

    # class MaterialWorkflowType(models.IntegerChoices): # Django 3.0
    lesson = models.ForeignKey(Lesson, related_name='materials', on_delete=models.CASCADE)
    # material_workflow_type = models.IntegerField(choices=MaterialWorkflowType.choices) # Django 3.0
    material_workflow_type = models.IntegerField(
        default=MaterialWorkflowType.COMMON.value,
        choices=[(type, type.value) for type in MaterialWorkflowType]
    )
    position = models.PositiveSmallIntegerField('Position', null=True, blank=True)
    material_problem_type = models.ForeignKey(
        MaterialProblemType, related_name='materials', on_delete=models.CASCADE,
        null=True, blank=True  # we can create empty Material w/o type selected
                                              )
    # this is a data that uses by material_problem_type
    data = JSONField(default=dict)  # only Postgresql support!

    thread = models.OneToOneField(Thread, related_name=course_question_thread_related_name, null=True,
                                  on_delete=models.CASCADE)
    tags = TaggableManager(through=UUIDTaggedItem, related_name='courses_materials')

    def get_correct_data(self):
        # TODO return correct data
        return []

    class Meta:
        ordering = ['position']

