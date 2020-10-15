from django.urls import path
from django.conf.urls import url

from . import apis

# TODO refactor with routers
urlpatterns = [
    url(r'^courses/$', apis.CourseViewSet.as_view({'get': 'list'})),
    path('courses/<uuid:uuid>/', apis.CourseViewSet.as_view({'get': 'retrieve'})),
    path('units/<uuid:uuid>/', apis.UnitViewSet.as_view({'get': 'retrieve'})),
    path('modules/<uuid:uuid>/', apis.ModuleViewSet.as_view({'get': 'retrieve'})),
    path('lessons/<uuid:uuid>/next-material/', apis.LessonViewSet.as_view({'get': 'get_next_material'})),
    path('materials/<uuid:uuid>/reaction/', apis.MaterialViewSet.as_view({'post': 'user_reaction'})),
    path('materials/<uuid:uuid>/service/', apis.MaterialViewSet.as_view({'post': 'service_request'})),
    path('material-problem-type/<uuid:sandbox_id>/cache/',
         apis.MaterialProblemTypeCacheViewSet.as_view({'get': 'retrieve'})),
]
