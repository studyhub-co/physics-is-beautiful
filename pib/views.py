from django.shortcuts import render, redirect
from django.conf import settings

from django.http import HttpResponse
import urllib

def discussion_app(request):
    context = {
        'STATIC_URL': settings.STATIC_URL,
        'DJEDDIT_STATIC_FILES_URL_PREFIX': settings.DJEDDIT_STATIC_FILES_URL_PREFIX  # TODO raise error if not set
    }
    return render(request, 'djeddit-react/discussion.html', context)


def codesandbox_static_proxy_view(request, path):
    # TODO prod/dev
    remoteurl = 'https://assets-dev.physicsisbeautiful.com/courses/js/codesandbox-apps/' + path
    body = None
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    request = urllib.request.Request(remoteurl, body, headers)
    try:
        response = urllib.request.urlopen(request)
        content_type = response.headers['content-type']
        response_body = response.read()
        status = response.getcode()
    except urllib.error.HTTPError as e:
        content_type = 'text/html'
        response_body = e.read()
        status = e.code
    return HttpResponse(response_body, status=status, content_type=content_type)
