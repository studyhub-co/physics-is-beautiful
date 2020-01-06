from rest_framework import routers

from .apis import ClassroomViewSet, AssignmentViewSet, StudentProfileViewSet


router = routers.DefaultRouter()
router.register(r'(?P<classroom_uuid>[0-9a-zA-Z_]+)/assignment', AssignmentViewSet, basename='assignment')
router.register(r'(?P<classroom_uuid>[0-9a-zA-Z_]+)/students', StudentProfileViewSet, basename='assignment')
router.register(r'', ClassroomViewSet, basename='classroom')

urlpatterns = router.urls


