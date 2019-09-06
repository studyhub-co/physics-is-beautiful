from django.conf.urls import url, include
from django.views.generic.base import TemplateView
# from django.contrib.auth.decorators import login_required

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='resources/resources.html'), name='resources'),
    url(r'^add/$', TemplateView.as_view(template_name='resources/resources.html'), name='resources-add'),
    url(r'^(?P<resource_slug>[\w\-\.]+)/(?P<uuid>[0-9a-zA-Z]+)/$',
        TemplateView.as_view(template_name='resources/resources.html'),
        name='resources-resource'),
    url(r'^(?P<resource_slug>[\w\-\.]+)/problems/(?P<chapter_slug>[\w\-\.]+)/(?P<uuid>[0-9a-zA-Z]+)/$',
            TemplateView.as_view(template_name='resources/resources.html'),
            name='resources-section'),
    url(r'^(?P<resource_slug>[\w\-\.]+)/problems/(?P<chapter_slug>[\w\-\.]+)/solutions/(?P<solution_slug>[\w\-\.]+)/(?P<uuid>[0-9a-zA-Z]+)/$',
        TemplateView.as_view(template_name='resources/resources.html'),
        name='resources-solution'),
    url(r'^adblock/$', TemplateView.as_view(template_name='resources/resources.html'), name='resources-adblock'),
]
