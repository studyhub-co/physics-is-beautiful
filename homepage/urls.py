from django.conf.urls import url

from . import views


app_name = 'homepage'
urlpatterns = [
    url(r'^$', views.homepage, name='homepage'),
    url(r'^about/$', views.about, name='about'),
    url(r'^privacy/$', views.privacy, name='privacy'),
    url(r'^terms/$', views.terms, name='terms'),
    # url(r'^contact/$', views.Contact, name='contact'),
]
