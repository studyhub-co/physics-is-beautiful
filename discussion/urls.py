from django.conf.urls import url
from . import views
from django.conf import settings
from djeddit import urls as djeddit_urls

if not hasattr(settings, 'TOPICS_URL'):
    settings.TOPICS_URL = ''
topic_prefix = '%s/' % settings.TOPICS_URL if settings.TOPICS_URL else ''


# Our overridden views
urlpatterns = [
    url(r'^user/(.+)/summary/?$', views.user_summary, name='userSummary'),
    url(r'^user/(.+)/threads/?$', views.user_threads_page, name='userThreads'),
    url(r'^user/(.+)/replies/?$', views.user_replies_page, name='userReplies'),
] + djeddit_urls.urlpatterns
