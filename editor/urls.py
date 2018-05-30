from django.conf.urls import url, include
from django.views.generic.base import TemplateView

from rest_framework_nested import routers
from editor import apis


router = routers.DefaultRouter()
router.register(r'curricula', apis.CurriculumViewSet)
router.register(r'units', apis.UnitViewSet)
router.register(r'modules', apis.ModuleViewSet)
router.register(r'lessons', apis.LessonViewSet)
router.register(r'questions', apis.QuestionViewSet)
router.register(r'answers', apis.AnswerViewSet)


urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^', TemplateView.as_view(template_name='editor/editor.html'), name='editor'),
    
]
