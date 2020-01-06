from django.conf.urls import url, include

from rest_framework import routers
from editor import apis, apis_public

router = routers.DefaultRouter()
router.register(r'curricula', apis.CurriculumViewSet, basename='curriculum')
router.register(r'units', apis.UnitViewSet, basename='unit')
router.register(r'modules', apis.ModuleViewSet, basename='module')
router.register(r'lessons', apis.LessonViewSet, basename='lesson')
router.register(r'questions', apis.QuestionViewSet, basename='question')
router.register(r'answers', apis.AnswerViewSet, basename='answer')

public_router = routers.DefaultRouter()
public_router.register(r'curricula', apis_public.CurriculumViewSet, basename='public_curriculum')
public_router.register(r'units', apis_public.UnitViewSet, basename='public_unit')
public_router.register(r'modules', apis_public.ModuleViewSet, basename='public_module')
public_router.register(r'lessons', apis_public.LessonViewSet, basename='public_lesson')
public_router.register(r'questions', apis_public.QuestionViewSet, basename='public_question')

urlpatterns = [
    url(r'^public/', include(public_router.urls)),
]

urlpatterns += router.urls

