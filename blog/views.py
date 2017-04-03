from django.shortcuts import render

def BlogHomepage(request):
    return render(request, 'blog/blog_homepage.html')

def CollegeScorecard(request):
    return render(request, 'blog/college_scorecard.html')

def Shankar(request):
    return render(request, 'blog/shankar.html')