from django.conf import settings

from factory import DjangoModelFactory, SubFactory

from profiles import models


class User(DjangoModelFactory):

    class Meta:
        model = settings.AUTH_USER_MODEL


class Profile(DjangoModelFactory):

    class Meta:
        model = models.Profile

    user = SubFactory(User)
