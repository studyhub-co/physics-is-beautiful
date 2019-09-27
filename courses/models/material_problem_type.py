from django.db import models
from django.utils.translation import gettext_lazy as _

from . import BaseItemModel


class MaterialProblemType(BaseItemModel):

    title = models.CharField(_('Problem type title'), max_length=2048, db_index=True)
    # TODO js code,  resourses links, etc
