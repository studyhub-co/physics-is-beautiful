from django.conf.urls import url

from . import views


app_name = 'homepage'
urlpatterns = [
    url(r'^$', views.homepage, name='homepage'),
    url(r'^about/$', views.About, name='about'),
]
