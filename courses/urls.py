# from django.conf.urls import url
from django.urls import path, re_path
from django.views.generic.base import TemplateView
from .views import get_sandbox_image

app_name = 'courses'

urlpatterns = [
    path('evaluation/<uuid:pt_uuid>/screenshot.png',
         get_sandbox_image,
         name='get-sandbox-image'),
    path('evaluation/<uuid:pt_uuid>/',
         TemplateView.as_view(template_name='codesandbox-apps/eval/frame.html'),
         name='material-type-frame'),
    path('evaluation/<uuid:pt_uuid>/<uuid:material_uuid>/',
         TemplateView.as_view(template_name='codesandbox-apps/eval/frame.html'),
         name='material-frame'),
    re_path(r'^(.*?)/', TemplateView.as_view(template_name='courses/courses.html'), name='courses'),
]
