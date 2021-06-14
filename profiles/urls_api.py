from django.urls import path, include
from rest_framework import routers
from django.views.generic import TemplateView


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

    # this url is used to generate email content
    # see https://github.com/iMerica/dj-rest-auth/blob/master/demo/demo/urls.py#L40
    # path('password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    #     TemplateView.as_view(template_name="password_reset_confirm.html"),
    #     name='password_reset_confirm'),
    # TODO we use some of dj_rest_auth urls, so exclude unnecessary and use dj_rest_auth directly
    path('rest-auth/', include('dj_rest_auth.urls')),
    # Attention. Serializer of SignUp defined in settings.REST_AUTH_REGISTER_SERIALIZERS
    path('rest-auth/signup/', include('dj_rest_auth.registration.urls'))
    # path('login/', Login.as_view()),
    # path('signup/', SignUpUserView.as_view()),
    # path('logout/', logout),
]

urlpatterns += router.urls

