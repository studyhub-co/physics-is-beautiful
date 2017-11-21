import os


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


os.environ.setdefault('DJANGO_SECRET', '0dk3tvyko9mz6t!+y42*$lzow)^dr3#(i_8^!7(x64!&yrpiz7')
os.environ.setdefault('DJANGO_STATIC_ROOT', os.path.join(BASE_DIR, 'media'))

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '*']

from pib.common_settings import *  # noqa: E402, F401


# STATIC_ROOT = 'static/'
MEDIA_ROOT = 'media/'

# email
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# if 'WEBPACK_LOADER' in locals():
#     WEBPACK_LOADER["DEFAULT"]["CACHE"] = not DEBUG
#     WEBPACK_LOADER["DEFAULT"]["POLL_INTERVAL"] = 0.1

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'pib',
#         'USER': 'pib',
#         'PASSWORD': 'pib',
#         'HOST': '127.0.0.1',
#         'PORT': '5432',
#     }
# }