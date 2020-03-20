from django.conf.urls import url
from rest_framework import routers

from .apis import ProfileViewSet, ProfileViewSetMe, find_user


app_name = 'profiles'  # ????

router = routers.DefaultRouter()

router.register(r'', ProfileViewSet, basename='profiles')


urlpatterns = [
    url(r'me/$', ProfileViewSetMe.as_view({'get': 'retrieve', 'patch': 'partial_update'})),
    url(r'find/$', find_user),
]

urlpatterns += router.urls

