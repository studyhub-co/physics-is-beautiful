from django.db import models
from django.core import urlresolvers
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.contenttypes.models import ContentType


class UserManager(BaseUserManager):

    def create(self, *args, **kwargs):
        from profiles.models import Profile
        user = super(UserManager, self).create(*args, **kwargs)
        Profile.objects.create(user=user)
        return user

    def create_user(self, username, first_name, last_name, email, password=None):
        """
        Creates and saves a User with the given username, first_name,
        last_name, email and password.
        """
        from profiles.models import Profile
        if not username:
            raise ValueError('Users must have a username')
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        Profile.objects.create(user=user)
        return user

    def create_superuser(self, username, first_name, last_name, email, password):
        """
        Creates and saves a User with the given username, first_name,
        last_name, email and password.
        """
        user = self.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
        )
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(PermissionsMixin, AbstractBaseUser):
    """
    Custom Authentication User
    """

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email']

    objects = UserManager()

    username = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=127)
    last_name = models.CharField(max_length=127)
    email = models.EmailField(max_length=255, unique=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def get_admin_url(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        return urlresolvers.reverse(
            'admin:{}_{}_change'.format(
                content_type.app_label,
                content_type.model
            ),
            args=[self.id]
        )

    @property
    def full_name(self):
        return '{} {}'.format(self.first_name, self.last_name)

    def get_full_name(self):
        return self.full_name

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return '{} <{}>'.format(self.full_name, self.email)
