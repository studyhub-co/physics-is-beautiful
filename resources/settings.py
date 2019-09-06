from django.conf import settings

# TODO ! replace with topic slug, see curricula/settings.py curricula/apis.py

TEXTBOOK_PROBLEMS_SOLUTIONS_TOPIC_ID = getattr(settings, 'DJEDDIT_RESOURCES_SOLUTIONS_TOPIC_ID', 100)
TEXTBOOK_PROBLEMS_TOPIC_ID = getattr(settings, 'DJEDDIT_RESOURCES_PROBLEMS_TOPIC_ID', 200)
TEXTBOOK_RESOURCES_TOPIC_ID = getattr(settings, 'DJEDDIT_RESOURCES_RESOURCES_TOPIC_ID', 300)
SYSTEM_USER_ID = getattr(settings, 'SYSTEM_USER_ID', 2)
