from django.conf.urls import url
from . import views


app_name = 'pib_auth'

urlpatterns = [
    url(r'^login-next/$', views.login_next, name='login-next'),
    url(r'^blank/$', views.blank, name='blank'),
]
