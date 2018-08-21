from django.conf.urls import url, include

from rest_framework import routers

from .apis import ClassroomViewSet, AssignmentViewSet, StudentProfileViewSet\
    # , join_classroom, leave_classroom

# urlpatterns = [
#             url(r'join/$', join_classroom),
#             url(r'leave/$', leave_classroom)
# ]

router = routers.DefaultRouter()
router.register(r'(?P<classroom_uuid>[0-9a-zA-Z_]+)/assignment', AssignmentViewSet, base_name='assignment')
router.register(r'(?P<classroom_uuid>[0-9a-zA-Z_]+)/students', StudentProfileViewSet, base_name='assignment')
router.register(r'', ClassroomViewSet, base_name='classroom')

urlpatterns = router.urls

# urlpatterns += router.urls
