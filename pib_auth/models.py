from django.db import models
from django.core import urlresolvers
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.contenttypes.models import ContentType
from django.urls import reverse

from django.db.models.signals import pre_save
from django.dispatch import receiver


class UserManager(BaseUserManager):

    def create(self, *args, **kwargs):
        user = super(UserManager, self).create(*args, **kwargs)
        return user

    def create_user(self, email, first_name=None, last_name=None, password=None, display_name=None):
        """
        Creates and saves a User with the given username, first_name,
        last_name, email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            first_name=first_name,
            last_name=last_name,
            display_name=display_name,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password, display_name=None):
        """
        Creates and saves a User with the given username, first_name,
        last_name, email and password.
        """
        user = self.create_user(
            first_name=first_name,
            last_name=last_name,
            email=email,
            display_name=display_name,
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

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=127, blank=True)
    last_name = models.CharField(max_length=127, blank=True)
    display_name = models.CharField(max_length=280, blank=True)

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
        if self.first_name or self.last_name:
            return '{} {}'.format(self.first_name, self.last_name)
        else:
            return "User {}".format(self.id)

    @property
    def username(self):
        return 'user{}'.format(self.id)

    def get_short_name(self):
        return self.first_name or "User"

    @property
    def get_absolute_url(self):
        return reverse('user-profile', kwargs={"pk": self.id})  # self.id(user.id) != profile.id

    def __str__(self):
        return '{}'.format(self.display_name)


@receiver(pre_save, sender=User)
def save_displayname(instance, *args, **kwargs):
    # save display name for a new user
    if not instance.id:
        instance.display_name = '{} {}'.format(instance.first_name, instance.last_name)

