from django.conf.urls import url, include

from rest_framework import routers
from . import apis, apis_public

router = routers.DefaultRouter()
router.register(r'courses', apis.CourseViewSet, basename='course')
router.register(r'units', apis.UnitViewSet, basename='unit')
router.register(r'modules', apis.ModuleViewSet, basename='module')
router.register(r'lessons', apis.LessonViewSet, basename='lesson')
router.register(r'materials', apis.MaterialViewSet, basename='material')
router.register(r'material-problem-type', apis.MaterialProblemTypeViewSet, basename='material_problem_type')

public_router = routers.DefaultRouter()
public_router.register(r'courses', apis_public.CourseViewSet, basename='public_course')
public_router.register(r'units', apis_public.UnitViewSet, basename='public_unit')
public_router.register(r'modules', apis_public.ModuleViewSet, basename='public_module')
public_router.register(r'lessons', apis_public.LessonViewSet, basename='public_lesson')
public_router.register(r'materials', apis_public.MaterialViewSet, basename='public_material')

urlpatterns = [
    url(r'^public/', include(public_router.urls)),
]

urlpatterns += router.urls

