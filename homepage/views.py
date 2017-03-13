from django.shortcuts import render, redirect
from django.urls import reverse


def homepage(request):
    if request.user.is_authenticated():
        return redirect(reverse('curricula:curriculum'))
    return render(request, 'homepage/homepage.html')
