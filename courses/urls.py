from django.conf.urls import url
from django.views.generic.base import TemplateView

app_name = 'courses'

urlpatterns = [
    url(r'^', TemplateView.as_view(template_name='courses/courses.html'), name='courses'),
]
