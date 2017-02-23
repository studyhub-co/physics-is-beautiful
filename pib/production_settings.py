DEBUG = False


ALLOWED_HOSTS = ['physicsisbeautiful.com', 'physicsisbeautiful.com:8000']


from pib.common_settings import *  # noqa: E402, F401


EMAIL_BACKEND = 'django_ses.SESBackend'
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_SES_REGION_NAME = 'us-east-1'
AWS_SES_REGION_ENDPOINT = 'email.us-east-1.amazonaws.com'
