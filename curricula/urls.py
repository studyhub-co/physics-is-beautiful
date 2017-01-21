from django.conf.urls import url

from . import views


app_name = 'curricula'

urlpatterns = [
    url(r'^$', views.CurriculumView.as_view(), name='curriculum'),
    url(r'^modules/(?P<pk>[0-9]+)/$', views.ModulePageView.as_view(), name='module'),
    url(r'^lessons/(?P<pk>[0-9]+)/$', views.LessonPageView.as_view(), name='lesson'),
    url(r'^problems/(?P<pk>[0-9]+)/$', views.MultipleChoiceView.as_view(), name='problem'),
    url(r'^draw-vector/(?P<pk>[0-9]+)/$', views.DrawVectorView.as_view(), name='drawvector'),
]
