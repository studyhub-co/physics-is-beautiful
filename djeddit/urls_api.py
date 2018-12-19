# from django.conf.urls import url

from rest_framework import routers

from .apis import ThreadViewSet


router = routers.DefaultRouter()
router.register(r'threads', ThreadViewSet, base_name='threads')


urlpatterns = router.urls

