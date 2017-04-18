from django.conf.urls import url
from . import views


app_name = 'blog'

urlpatterns = [
    url(r'^$', views.BlogHomepage, name='bloghomepage'),
    url(r'^collegescorecard-analysis/$', views.CollegeScorecard, name='collegescorecard-analysis'),
    url(r'^shankar/$', views.Shankar, name='shankar'),
    url(r'^collegescorecard/$', views.CollegeScorecardApp, name='collegescorecard'),
    url(r'^collegemap/$', views.CollegeMap, name='collegemap'),
]
