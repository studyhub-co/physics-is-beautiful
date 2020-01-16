from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.postgres.fields import JSONField

from .material_problem_type_sandbox import MaterialProblemTypeSandbox


class MaterialProblemType(MaterialProblemTypeSandbox):  # MaterialProblemTypeSandbox ~= sanbox data
    # sanbox reverse field (see material_sandbox)
    # TODO we will add PIB realted fields

    class Meta:
        proxy = True


