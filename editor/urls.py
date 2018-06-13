from django.conf.urls import url, include
from django.views.generic.base import TemplateView
from django.contrib.auth.decorators import login_required

from rest_framework import routers
from editor import apis


router = routers.DefaultRouter()
router.register(r'curricula', apis.CurriculumViewSet, base_name='curriculum')
router.register(r'units', apis.UnitViewSet, base_name='unit')
router.register(r'modules', apis.ModuleViewSet, base_name='module')
router.register(r'lessons', apis.LessonViewSet, base_name='lesson')
router.register(r'questions', apis.QuestionViewSet, base_name='question')
router.register(r'answers', apis.AnswerViewSet, base_name='answer')


urlpatterns = [
    url(r'^api/curricula/all/', apis.AllCurriculaView.as_view()),
    url(r'^api/', include(router.urls)),
    url(r'^', login_required(TemplateView.as_view(template_name='editor/editor.html')), name='editor'),
    
]
