from django.conf.urls import url, include

from rest_framework import routers
from .apis import ClassroomViewSet

router = routers.DefaultRouter()
router.register(r'curricula', ClassroomViewSet, base_name='curriculum')

urlpatterns = [
    url(r'^', include(router.urls)),
]
