from django.urls import path
from rest_framework import routers

from .apis import ProfileViewSet, ProfileViewSetMe, find_user, logout, Login


app_name = 'profiles'  # ????

router = routers.DefaultRouter()

router.register(r'', ProfileViewSet, basename='profiles')


urlpatterns = [
    path('me/', ProfileViewSetMe.as_view({'get': 'retrieve', 'patch': 'partial_update'})),
    path('login/', Login.as_view()),
    path('logout/', logout),
    path('find/', find_user),
]

urlpatterns += router.urls

