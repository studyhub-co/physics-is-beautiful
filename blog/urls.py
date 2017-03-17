from django.conf.urls import url

from . import views


app_name = 'blog'

urlpatterns = [
    url(r'^$', views.BlogHomepage, name='bloghomepage'),
]
