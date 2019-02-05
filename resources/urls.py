from django.conf.urls import url, include
from django.views.generic.base import TemplateView
# from django.contrib.auth.decorators import login_required

urlpatterns = [
    url(r'^', TemplateView.as_view(template_name='resources/resources.html'), name='resources'),
]
