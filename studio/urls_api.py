from django.urls import path
from django.conf.urls import url, include

from rest_framework import routers
from rest_framework_nested import routers as nested_routers

from .apis import apis, apis_public, material_type_modules, material_service_request

router = routers.DefaultRouter()
router.register(r'courses', apis.CourseViewSet, basename='course')
router.register(r'units', apis.UnitViewSet, basename='unit')
router.register(r'modules', apis.ModuleViewSet, basename='module')
router.register(r'lessons', apis.LessonViewSet, basename='lesson')
router.register(r'materials', apis.MaterialViewSet, basename='material')

# TODO maybe it's need more better url
router.register(r'images', apis.JsonDataImageViewSet, basename='json-data-image')

simple_nested_router = nested_routers.SimpleRouter()
simple_nested_router.register(r'material-problem-type',
                              apis.MaterialProblemTypeViewSet,
                              basename='material_problem_type')
material_problem_type_modules_router = \
    nested_routers.NestedSimpleRouter(simple_nested_router,
                                      r'material-problem-type',
                                      lookup='material_problem_type')
material_problem_type_modules_router.register(r'modules',
                                              material_type_modules.MaterialTypeModulesViewSet,
                                              basename='material_problem_type_modules')

material_problem_type_modules_router.register(r'directories',
                                              material_type_modules.MaterialTypeDirectoriesViewSet,
                                              basename='material_problem_type_directories')

# router.register(r'material-problem-type', apis.MaterialProblemTypeViewSet, basename='material_problem_type')

public_router = routers.DefaultRouter()
public_router.register(r'courses', apis_public.CourseViewSet, basename='public_course')
public_router.register(r'units', apis_public.UnitViewSet, basename='public_unit')
public_router.register(r'modules', apis_public.ModuleViewSet, basename='public_module')
public_router.register(r'lessons', apis_public.LessonViewSet, basename='public_lesson')
public_router.register(r'materials', apis_public.MaterialViewSet, basename='public_material')

urlpatterns = [
    url(r'^public/', include(public_router.urls)),
    path('npm/dependencies/<path:package>', material_type_modules.npm_dependencies),
    path('material-service-request/', material_service_request.call),
]

urlpatterns += router.urls
#
urlpatterns += simple_nested_router.urls
urlpatterns += material_problem_type_modules_router.urls
