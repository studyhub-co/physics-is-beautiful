from django.conf import settings

from djeddit.models import Topic

QUESTIONS_TOPIC_TITLE = getattr(settings, 'DJEDDIT_CURRICULA_QUESTIONS_TOPIC_TILE', 'Questions of courses')
QUESTIONS_TOPIC_SLUG = Topic.gen_slug(QUESTIONS_TOPIC_TITLE, unique=False)
SYSTEM_USER_ID = getattr(settings, 'SYSTEM_USER_ID', 2)


MY_SQL_PROBLEM_TYPE_HOST = getattr(settings, 'CURRICULA_SQL_PROBLEM_TYPE_HOST', 'localhost')
MY_SQL_PROBLEM_TYPE_USER = getattr(settings, 'CURRICULA_SQL_PROBLEM_TYPE_USER', 'sql_problem_type_user')
MY_SQL_PROBLEM_TYPE_USER_PASSWORD = getattr(settings, 'CURRICULA_SQL_PROBLEM_TYPE_USER_PASSWORD', 'sql_problem_type_password')
