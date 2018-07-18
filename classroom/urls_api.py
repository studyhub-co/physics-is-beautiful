from django.conf.urls import url, include

from rest_framework import routers
from .apis import ClassroomViewSet, ClassroomStudentViewSet

router = routers.DefaultRouter()
router.register(r'^$', ClassroomViewSet, base_name='classroom')
router.register(r'^student', ClassroomStudentViewSet, base_name='student')

urlpatterns = [
    url(r'^', include(router.urls)),
]
