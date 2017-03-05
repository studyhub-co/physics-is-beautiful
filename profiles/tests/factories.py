from django.conf import settings

from factory import DjangoModelFactory, SubFactory, Sequence

from profiles import models


class User(DjangoModelFactory):

    class Meta:
        model = settings.AUTH_USER_MODEL

    username = Sequence(lambda n: 'user{}'.format(n))
    email = Sequence(lambda n: 'user{}@pib.com'.format(n))


class Profile(DjangoModelFactory):

    class Meta:
        model = models.Profile
        django_get_or_create = ['user']

    user = SubFactory(User)
