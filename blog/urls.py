from django.conf.urls import url
from . import views
from django.views.generic import RedirectView


app_name = 'blog'

urlpatterns = [
    url(r'^$', views.blog_homepage, name='bloghomepage'),
    url(r'^collegescorecard-analysis/$', views.college_scorecard, name='collegescorecard-analysis'),
    url(r'^shankar/$', RedirectView.as_view(url='/resources/principles-of-quantum-mechanics/vPcmLombjPqhS4yW7HC4EF'), name='shankar'),
    url(r'^mobile-app/$', views.mobile_app, name='mobile_app'),
    # url(r'^collegescorecard/$', views.college_scorecard_app, name='collegescorecard'),
    url(r'^collegemap/$', views.college_map, name='collegemap'),
    url(r'^wordpairs/$', views.word_pairs, name='wordpairs'),
    url(r'^wordpairs/getWordPairs$', views.get_word_pairs, name='getwordpairs'),
]
