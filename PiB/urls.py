from django.conf.urls import url

from . import views


app_name = 'pib'

urlpatterns = [
    url(r'^$', views.CurriculumView.as_view(), name='curriculum'),
    url(r'^modules/(?P<pk>[0-9]+)/$', views.ModulePage.as_view(), name='module'),
    url(r'^lessons/(?P<pk>[0-9]+)/$', views.LessonPage.as_view(), name='lesson'),
    url(r'^problems/(?P<pk>[0-9]+)/$', views.MultipleChoice.as_view(), name='problem'),
    url(r'^DrawVector/(?P<pk>[0-9]+)/$', views.DrawVector.as_view(), name='drawvector'),
]
