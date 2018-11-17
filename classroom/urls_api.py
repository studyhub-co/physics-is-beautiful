from rest_framework import routers

from .apis import ClassroomViewSet, AssignmentViewSet, StudentProfileViewSet


router = routers.DefaultRouter()
router.register(r'(?P<classroom_uuid>[0-9a-zA-Z_]+)/assignment', AssignmentViewSet, base_name='assignment')
router.register(r'(?P<classroom_uuid>[0-9a-zA-Z_]+)/students', StudentProfileViewSet, base_name='assignment')
router.register(r'', ClassroomViewSet, base_name='classroom')

urlpatterns = router.urls


