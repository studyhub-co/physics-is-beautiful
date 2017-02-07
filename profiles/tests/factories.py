from django.contrib.auth import get_user_model

from factory import DjangoModelFactory, SubFactory

from profiles import models


class User(DjangoModelFactory):

    class Meta:
        model = get_user_model()


class Profile(DjangoModelFactory):

    class Meta:
        model = models.Profile

    user = SubFactory(User)
