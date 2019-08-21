from django.shortcuts import render, redirect
from django.conf import settings


def discussion_app(request):
    context = {
        'STATIC_URL': settings.STATIC_URL,
        'DJEDDIT_STATIC_FILES_URL_PREFIX': settings.DJEDDIT_STATIC_FILES_URL_PREFIX  # TODO raise error if not set
    }
    return render(request, 'djeddit-react/discussion.html', context)
