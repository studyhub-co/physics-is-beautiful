from django.conf import settings
from django.db import models


class BaseModel(models.Model):

    class Meta:
        abstract = True

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)


class Profile(BaseModel):

    class Meta:
        db_table = 'profiles_profiles'

    user = models.OneToOneField(settings.AUTH_USER_MODEL)
