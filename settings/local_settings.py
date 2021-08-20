import os
import mimetypes

# TODO we need this? The same as in common_settings
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SECRET', '0dk3tvyko9mz6t!+y42*$lzow)^dr3#(i_8^!7(x64!&yrpiz7')
os.environ.setdefault('DJANGO_STATIC_ROOT', os.path.join(BASE_DIR, 'media'))

from .common_settings import *  # noqa: E402, F401

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '*']

# allow study hub eval lib app to access apis
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True
# CORS_ORIGIN_WHITELIST = (
#     'http://localhost:3000',
# )

# debug_toolbar
# + https://django-extensions.readthedocs.io/en/latest/graph_models.html
INSTALLED_APPS.extend(['debug_toolbar', 'django_extensions'])
MIDDLEWARE.append('debug_toolbar.middleware.DebugToolbarMiddleware')
INTERNAL_IPS = ALLOWED_HOSTS

# disable high load panels
DEBUG_TOOLBAR_CONFIG = {
    "DISABLE_PANELS": ["debug_toolbar.panels.staticfiles.StaticFilesPanel",
                       "debug_toolbar.panels.profiling.ProfilingPanel",
                       "debug_toolbar.panels.redirects.RedirectsPanel",
                       "debug_toolbar.panels.sql.SQLPanel"],
    "INTERCEPT_REDIRECTS": False,
    # "SHOW_TEMPLATE_CONTEXT": True,
}

STATIC_ROOT = 'static_dev/'
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
#         'USER': 'postgresql',
#         'PASSWORD': 'pib',
#         'HOST': '127.0.0.1',
#         'PORT': '5432',
#     }
# }

# Permit local access from app
X_FRAME_OPTIONS = 'ALLOWALL'

# # uncomment for tests on a developer machine with prod base
# # django-s3-storage media
# AWS_S3_PUBLIC_URL = os.getenv('AWS_STORAGE_PUBLIC_URL')
# AWS_S3_BUCKET_AUTH = False
# # AWS_S3_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
# DEFAULT_FILE_STORAGE = 'django_s3_storage.storage.S3Storage'

# WEBPACK_LOADER = {
#     'DEFAULT': {
#         'BUNDLE_DIR_NAME': 'js/bundles/',
#         'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
#     }
# }

