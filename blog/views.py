from django.shortcuts import render
from blog.models import Collegescorecard
from django.http import HttpResponse


def BlogHomepage(request):
    return render(request, 'blog/blog_homepage.html')

def CollegeScorecard(request):
    return render(request, 'blog/college_scorecard.html')

def Shankar(request):
    return render(request, 'blog/shankar.html')

def Shankar(request):

    return render(request, 'blog/shankar.html')

def CollegeScorecardApp(request):
    vals = list(Collegescorecard.objects.values('instnm')[:5])
    html = "<html><body>{0}</body></html>".format(vals)
    return HttpResponse(html)