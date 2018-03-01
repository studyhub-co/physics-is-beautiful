import os
# import raven


DEBUG = False


ALLOWED_HOSTS = [
    'physicsisbeautiful.com',
    'www.physicsisbeautiful.com',
    'dev.physicsisbeautiful.com',
    '.compute-1.amazonaws.com',
]


from pib.common_settings import *  # noqa: E402, F401


EMAIL_BACKEND = 'django_ses.SESBackend'
AWS_REGION = 'us-east-1'
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_SES_REGION_NAME = AWS_REGION
AWS_SES_REGION_ENDPOINT = 'email.us-east-1.amazonaws.com'
AWS_S3_PUBLIC_URL = 'https://pib-media-production.s3.amazonaws.com'

# django-s3-storage
AWS_S3_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
AWS_S3_BUCKET_AUTH = False
AWS_S3_BUCKET_NAME_STATIC = os.getenv('AWS_S3_BUCKET_NAME_STATIC')


DEFAULT_FILE_STORAGE = 'django_s3_storage.storage.S3Storage'
STATICFILES_STORAGE = 'django_s3_storage.storage.StaticS3Storage'

AWS_HEADERS = {  # see http://developer.yahoo.com/performance/rules.html#expires
    'Expires': 'Thu, 31 Dec 2099 20:00:00 GMT',
    'Cache-Control': 'max-age=94608000',
}

RAVEN_CONFIG = {
    'dsn': os.getenv('RAVEN_DSN'),
    # If you are using git, you can also automatically configure the
    # release based on the git info.
    # 'release': raven.fetch_git_sha(os.path.dirname(os.pardir)),
}
