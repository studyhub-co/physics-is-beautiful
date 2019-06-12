from django.conf import settings

QUESTIONS_TOPIC_SLUG = getattr(settings, 'DJEDDIT_CURRICULA_QUESTIONS_TOPIC_SLUG', 'courses-questions')
SYSTEM_USER_ID = getattr(settings, 'SYSTEM_USER_ID', 2)
