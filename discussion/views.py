from djeddit import views as djeddit_views

# Core Django
from django.http import Http404, HttpResponseBadRequest, HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import user_passes_test

# Djeddit
from djeddit.models import Thread, Post

User = get_user_model()


def user_summary(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        raise Http404
    threads = Thread.objects.filter(op__created_by=user)
    for t in threads:
        t.modified_on = t.op.modified_on
    replies = Post.objects.filter(created_by=user).exclude(parent=None)
    context = dict(items=sorted(list(threads) + list(replies), key=lambda n: n.modified_on, reverse=True),
                   tCount=threads.count(),
                   rCount=replies.count(),
                   tPoints=(sum(t.op.score for t in threads)),
                   rPoints=(sum(r.score for r in replies)),
                   pageUser=user)
    return render(request, 'djeddit/user_summary.html', context)


def user_threads_page(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        raise Http404
    created_threads = Thread.objects.filter(op__created_by=user)
    context = dict(threads=created_threads, showCreatedBy=False, showTopic=True, pageUser=user)
    return render(request, 'djeddit/user_threads.html', context)


def user_replies_page(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        raise Http404
    replies = Post.objects.filter(created_by=user, parent__isnull=False)
    context = dict(replies=replies, pageUser=user)
    return render(request, 'djeddit/user_replies.html', context)


@user_passes_test(lambda u: u.is_superuser)
def users_page(request):
    """list users with their thread count and replies counts"""
    users = User.objects.all()
    for user in users:
        user.tCount = Thread.objects.filter(op__created_by=user).count()
        user.rCount = Post.objects.filter(created_by=user).exclude(parent=None).count()
    return render(request, 'djeddit/users_page.html', dict(Users=users))


@user_passes_test(lambda u: u.is_superuser)
def set_user_status(request):
    """set user status to either active (is_active=True), banned(is_active=False), or admin(is_superuser=True)"""
    try:
        username = request.POST['username']
        status = request.POST['status']
    except KeyError:
        return HttpResponseBadRequest()
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        raise Http404()
    if status == 'active':
        user.is_active = True
        user.is_superuser = False
    elif status == 'banned':
        user.is_active = False
        user.is_superuser = False
    elif status == 'admin':
        user.is_active = True
        user.is_superuser = True
    else:
        return HttpResponseBadRequest()
    user.save()
    return HttpResponse()

