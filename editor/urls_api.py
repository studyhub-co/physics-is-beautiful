from django.conf.urls import url, include

from rest_framework import routers
from editor import apis, apis_public

router = routers.DefaultRouter()
router.register(r'curricula', apis.CurriculumViewSet, base_name='curriculum')
router.register(r'units', apis.UnitViewSet, base_name='unit')
router.register(r'modules', apis.ModuleViewSet, base_name='module')
router.register(r'lessons', apis.LessonViewSet, base_name='lesson')
router.register(r'questions', apis.QuestionViewSet, base_name='question')
router.register(r'answers', apis.AnswerViewSet, base_name='answer')

public_router = routers.DefaultRouter()
public_router.register(r'curricula', apis_public.CurriculumViewSet, base_name='public_curriculum')
public_router.register(r'units', apis_public.UnitViewSet, base_name='public_unit')
public_router.register(r'modules', apis_public.ModuleViewSet, base_name='public_module')
public_router.register(r'lessons', apis_public.LessonViewSet, base_name='public_lesson')
public_router.register(r'questions', apis_public.QuestionViewSet, base_name='public_question')

urlpatterns = [
    url(r'^public/', include(public_router.urls)),
]

urlpatterns += router.urls

