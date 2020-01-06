# from django.conf.urls import url

from rest_framework import routers

from .apis import NotificationViewSet


router = routers.DefaultRouter()
router.register(r'', NotificationViewSet, basename='notifications')


urlpatterns = router.urls
