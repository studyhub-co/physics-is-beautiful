from django.conf.urls import url

from . import apis


app_name = 'curricula'

urlpatterns = [
    url(r'^curricula/(?P<uuid>[0-9a-zA-Z_]+)$', apis.CurriculaViewSet.as_view({'get': 'retrieve'})),
    url(r'^modules/(?P<uuid>[0-9a-zA-Z_]+)$', apis.ModuleViewSet.as_view({'get': 'retrieve'})),
    url(r'^lessons/(?P<uuid>[0-9a-zA-Z_]+)/next-question$',
        apis.LessonViewSet.as_view({'get': 'get_next_question'})),
    url(r'^questions/(?P<uuid>[0-9a-zA-Z_]+)/response$',
        apis.QuestionViewSet.as_view({'post': 'user_response'})),
    url(r'^games/(?P<slug>[0-9a-zA-Z_-]+)/success$', apis.game_success),
    url(r'^units$', apis.get_unit_conversion_units),
]
