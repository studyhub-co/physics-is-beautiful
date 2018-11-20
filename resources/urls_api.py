from rest_framework import routers

from .apis import ResourceViewSet


router = routers.DefaultRouter()
# router.register(r'(?P<classroom_uuid>[0-9a-zA-Z_]+)/assignment', AssignmentViewSet, base_name='assignment')
# router.register(r'(?P<classroom_uuid>[0-9a-zA-Z_]+)/students', StudentProfileViewSet, base_name='assignment')
router.register(r'', ResourceViewSet, base_name='resources')

urlpatterns = router.urls


