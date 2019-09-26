from django.conf.urls import url

from . import apis

urlpatterns = [
    url(r'^courses/$', apis.CourseViewSet.as_view({'get': 'list'})),
    # url(r'^curricula/search/$', apis.CurriculaSearchViewSet.as_view({'get': 'list'})),
    url(r'^courses/(?P<uuid>[0-9a-zA-Z_]+)$', apis.CourseViewSet.as_view({'get': 'retrieve'})),
    url(r'^units/(?P<uuid>[0-9a-zA-Z_]+)$', apis.UnitViewSet.as_view({'get': 'retrieve'})),
    url(r'^modules/(?P<uuid>[0-9a-zA-Z_]+)$', apis.ModuleViewSet.as_view({'get': 'retrieve'})),
    url(r'^lessons/(?P<uuid>[0-9a-zA-Z_]+)/next-question$', apis.LessonViewSet.as_view({'get': 'get_next_question'})),
    url(r'^questions/(?P<uuid>[0-9a-zA-Z_]+)/response$', apis.QuestionViewSet.as_view({'post': 'user_response'})),
    url(r'^questions/(?P<uuid>[0-9a-zA-Z_]+)/service$', apis.QuestionViewSet.as_view({'post': 'service_request'})),
    url(r'^games/(?P<uuid>[0-9a-zA-Z_]+)/success$', apis.game_success),
    url(r'^units$', apis.get_unit_conversion_units),
]
