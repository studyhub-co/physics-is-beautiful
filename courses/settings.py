from django.conf import settings

from djeddit.models import Topic

QUESTIONS_TOPIC_TITLE = getattr(settings, 'DJEDDIT_COURSES_QUESTIONS_TOPIC_TILE', 'Questions of courses')
QUESTIONS_TOPIC_SLUG = Topic.gen_slug(QUESTIONS_TOPIC_TITLE, unique=False)
SYSTEM_USER_ID = getattr(settings, 'SYSTEM_USER_ID', 2)


MYSQL_PROBLEM_TYPE_HOST = getattr(settings, 'MYSQL_PROBLEM_TYPE_HOST', 'localhost')
MYSQL_PROBLEM_TYPE_USER = getattr(settings, 'MYSQL_PROBLEM_TYPE_USER', 'sql_problem_type_user')
MYSQL_PROBLEM_TYPE_USER_PASSWORD = getattr(settings, 'MYSQL_PROBLEM_TYPE_USER_PASSWORD', 'sql_problem_type_password')

LESSON_COMPLETE_BOUNDARY = 80
