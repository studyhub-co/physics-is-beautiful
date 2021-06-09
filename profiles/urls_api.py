from django.urls import path, include
from rest_framework import routers

from .apis import ProfileViewSet, ProfileViewSetMe, find_user, logout, Login, SignUpUserView


app_name = 'profiles'  # ????

router = routers.DefaultRouter()

router.register(r'', ProfileViewSet, basename='profiles')


urlpatterns = [
    path('me/', ProfileViewSetMe.as_view({'get': 'retrieve', 'patch': 'partial_update'})),
    path('find/', find_user),
    # login in dj_rest_auth uses DRF Token in a view, we do not use this now (Session auth),
    # so we use own login API view
    path('rest-auth/login/', Login.as_view()),
    # we want to get user Anon settings object, not only success message
    path('rest-auth/logout/', logout),
    path('rest-auth/', include('dj_rest_auth.urls')),
    # Attention. Serializer of SignUp defined in settings.REST_AUTH_REGISTER_SERIALIZERS
    path('rest-auth/signup/', include('dj_rest_auth.registration.urls'))
    # path('login/', Login.as_view()),
    # path('signup/', SignUpUserView.as_view()),
    # path('logout/', logout),
]

urlpatterns += router.urls

