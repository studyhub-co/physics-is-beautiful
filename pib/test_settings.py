import os


os.environ.setdefault('DJANGO_SECRET', 'test-secret')


from pib.common_settings import *  # noqa: F403, F405
# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'library_test',
    }
}
