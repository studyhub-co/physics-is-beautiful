from django.urls import path
from django.conf.urls import url

from . import apis

urlpatterns = [
    url(r'^courses/$', apis.CourseViewSet.as_view({'get': 'list'})),
    # # url(r'^courses/search/$', apis.coursesSearchViewSet.as_view({'get': 'list'})),
    # url(r'^courses/(?P<uuid>[0-9a-zA-Z_-]+)/$', apis.CourseViewSet.as_view({'get': 'retrieve'})),
    # url(r'^units/(?P<uuid>[0-9a-zA-Z_\-]+)/$', apis.UnitViewSet.as_view({'get': 'retrieve'})),
    # url(r'^modules/(?P<uuid>[0-9a-zA-Z_\-]+)/$', apis.ModuleViewSet.as_view({'get': 'retrieve'})),
    # url(r'^lessons/(?P<uuid>[0-9a-zA-Z_\-]+)/next-material/$', apis.LessonViewSet.as_view({'get': 'get_next_next'})),
    # url(r'^materials/(?P<uuid>[0-9a-zA-Z_\-]+)/response/$', apis.MaterialViewSet.as_view({'post': 'user_response'})),
    # url(r'^materials/(?P<uuid>[0-9a-zA-Z_\-]+)/service/$', apis.MaterialViewSet.as_view({'post': 'service_request'})),
    path('courses/<uuid:uuid>/', apis.CourseViewSet.as_view({'get': 'retrieve'})),
    path('units/<uuid:uuid>/', apis.UnitViewSet.as_view({'get': 'retrieve'})),
    path('modules/<uuid:uuid>/', apis.ModuleViewSet.as_view({'get': 'retrieve'})),
    path('lessons/<uuid:uuid>/next-material/', apis.LessonViewSet.as_view({'get': 'get_next_material'})),
    path('materials/<uuid:uuid>/reaction/', apis.MaterialViewSet.as_view({'post': 'user_reaction'})),
    path('materials/<uuid:uuid>/service/', apis.MaterialViewSet.as_view({'post': 'service_request'})),
]
