from djeddit import views as djeddit_views

# Core Django
from django.http import Http404
from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model

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
