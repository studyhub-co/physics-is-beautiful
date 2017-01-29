from django.conf.urls import url

from . import apis


app_name = 'curricula'

urlpatterns = [
    url(r'^curricula/(?P<pk>[0-9a-zA-Z_]+)$', apis.CurriculaViewSet.as_view({'get': 'retrieve'})),
    url(r'^units$', apis.UnitViewSet.as_view({'get': 'list'})),
    url(r'^modules$', apis.ModuleViewSet.as_view({'get': 'list'})),
    url(r'^modules/(?P<pk>[0-9a-zA-Z_]+)$', apis.ModuleViewSet.as_view({'get': 'retrieve'})),
    url(r'^lessons$', apis.LessonViewSet.as_view({'get': 'list'})),
    url(r'^lessons/(?P<pk>[0-9a-zA-Z_]+)/next-question$',
        apis.LessonViewSet.as_view({'get': 'get_next_question'})),
]
