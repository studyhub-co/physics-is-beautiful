from django.conf.urls import url

from . import views


app_name = 'curricula'

urlpatterns = [
    url(r'^$', views.CurriculumView.as_view(), name='curriculum'),
    url(r'^modules/(?P<pk>[0-9]+)/$', views.CurriculumView.as_view(), name='module'),
    url(r'^lessons/(?P<pk>[0-9]+)/$', views.CurriculumView.as_view(), name='lesson'),
]
