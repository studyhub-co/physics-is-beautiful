from django.conf.urls import url, include
from django.views.generic.base import TemplateView

from rest_framework_nested import routers
from editor import apis


router = routers.DefaultRouter()
router.register(r'curricula', apis.CurriculumViewSet)
router.register(r'units', apis.UnitViewSet)
router.register(r'modules', apis.ModuleViewSet)
router.register(r'lessons', apis.LessonViewSet)


"""
curricula_router = routers.NestedSimpleRouter(router, r'curricula', lookup='curriculum')
curricula_router.register(r'units', apis.UnitViewSet, base_name='curriculum-units')

units_router = routers.NestedSimpleRouter(curricula_router, r'units', lookup='unit')
units_router.register(r'modules', apis.ModuleViewSet, base_name='unit-modules')

modules_router = routers.NestedSimpleRouter(units_router, r'modules', lookup='module')
modules_router.register(r'lessons', apis.LessonViewSet, base_name='module-lessons')
"""

urlpatterns = [
    url(r'^api/', include(router.urls)),
#    url(r'^api/', include(curricula_router.urls)),
#    url(r'^api/', include(units_router.urls)),
#    url(r'^api/', include(modules_router.urls)),
    url(r'^', TemplateView.as_view(template_name='editor/editor.html'), name='editor'),
    
]
