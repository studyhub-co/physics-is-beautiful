from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^(?P<pk>\d+)/(settings/|notifications/)?$', views.UserProfileView.as_view(), name='user-profile'),
]
