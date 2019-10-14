from django.conf.urls import url, include

from rest_framework import routers
from . import apis, apis_public

router = routers.DefaultRouter()
router.register(r'courses', apis.CourseViewSet, base_name='course')
router.register(r'units', apis.UnitViewSet, base_name='unit')
router.register(r'modules', apis.ModuleViewSet, base_name='module')
router.register(r'lessons', apis.LessonViewSet, base_name='lesson')
router.register(r'materials', apis.MaterialViewSet, base_name='material')

public_router = routers.DefaultRouter()
public_router.register(r'courses', apis_public.CourseViewSet, base_name='public_course')
public_router.register(r'units', apis_public.UnitViewSet, base_name='public_unit')
public_router.register(r'modules', apis_public.ModuleViewSet, base_name='public_module')
public_router.register(r'lessons', apis_public.LessonViewSet, base_name='public_lesson')
public_router.register(r'materials', apis_public.MaterialViewSet, base_name='public_material')

urlpatterns = [
    url(r'^public/', include(public_router.urls)),
]

urlpatterns += router.urls

