# from django.conf.urls import url
from django.urls import path, re_path
from django.views.generic.base import TemplateView

app_name = 'courses'

urlpatterns = [
    path('evaluation/<uuid:pt_uuid>/', TemplateView.as_view(template_name='courses/eval.html'), name='material-frame'),
    path('evaluation/<uuid:pt_uuid>/<uuid:material_uuid>/', TemplateView.as_view(template_name='courses/eval.html'), name='material-frame'),
    re_path(r'^(.*?)/', TemplateView.as_view(template_name='courses/courses.html'), name='courses'),
]
