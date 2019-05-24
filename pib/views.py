from django.shortcuts import render, redirect


def discussion_app(request):
    return render(request, 'djeddit-react/discussion.html')
