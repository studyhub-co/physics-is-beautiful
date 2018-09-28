from django.shortcuts import render, redirect
from django.urls import reverse


def homepage(request):
    if request.user.is_authenticated():
        return redirect(reverse('curricula:curriculum'))
    return render(request, 'homepage/homepage.html')

def About(request):
    return render(request, 'homepage/about.html')

def Privacy(request):
    return render(request, 'homepage/privacy.html')

def Terms(request):
    return render(request, 'homepage/terms.html')