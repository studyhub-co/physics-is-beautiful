# from django.conf.urls import url

from rest_framework import routers

from .apis import ThreadViewSet, PostViewSet


router = routers.DefaultRouter()
router.register(r'threads', ThreadViewSet, base_name='threads')
router.register(r'posts', PostViewSet, base_name='posts')


urlpatterns = router.urls

