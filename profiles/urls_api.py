from django.conf.urls import url

from . import apis


app_name = 'profiles'

urlpatterns = [
    url(r'me$', apis.ProfileViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update'})),
]

