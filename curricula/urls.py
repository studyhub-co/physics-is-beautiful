from django.conf.urls import url

from . import views


app_name = 'curricula'

urlpatterns = [
    url(r'^((?P<uuid>[0-9a-zA-Z]+)/)?$', views.CurriculumView.as_view(), name='curriculum'),
    url(r'^modules/(?P<uuid>[0-9a-zA-Z]+)/$', views.CurriculumView.as_view(), name='module'),
    url(r'^lessons/(?P<uuid>[0-9a-zA-Z]+)/$', views.CurriculumView.as_view(), name='lesson'),
    url(r'^games/(?P<uuid>[a-z-]+)/$', views.CurriculumView.as_view(), name='game'),
]
