from builtins import IndexError
from datetime import datetime
from django import VERSION as DJANGO_VERSION
from django import template
if DJANGO_VERSION[:2] < (1, 10):
    from django.core.urlresolvers import reverse
else:
    from django.urls import reverse
from django.utils import formats
from django.utils.timezone import utc
from djeddit.models import UserPostVote

register = template.Library()


def getAmountContext(num, name, infix=''):
    if num:
        if abs(num) > 1:
            if name.endswith('y') and name != 'day':
                name = '{name}ies'.format(name=name[:-1])
            else:
                name += 's'
        amount_string = '{num} {infix} {name}'.format(num=num,  infix=infix, name=name)
        return ' '.join(amount_string.split())


def getBoolean(condition):
    return 'true' if condition else 'false'

@register.simple_tag
def getAmount(num, name, infix=''):
    amountContext = getAmountContext(num, name, infix=infix)
    if amountContext:
        return amountContext
    amount_string = 'no {infix} {name}s'.format(name=name, infix=infix)
    return ' '.join(amount_string.split())


@register.simple_tag
def postUserName(created_by):
    if created_by and created_by.display_name:
        return created_by.display_name
    else:
        return 'unbeknown'


@register.simple_tag
def postScore(score):
    return getAmountContext(score, 'point') if score else 'no score'


@register.simple_tag
def postLevelWidth(thread, post):
    return '1' if all(p != thread.op for p in (post, post.parent)) else '0'


@register.simple_tag
def postWidth(thread, post):
    """:return number of columns to fill"""
    return '11' if all(p != thread.op for p in (post, post.parent)) else '12'


@register.simple_tag
def postVoteClicked(user, post, upvote):
    try:
        # try to find post in prefetch objects see discussionPage(request) view for details
        if hasattr(post, 'current_user_post_votes'):
            userPostVote = post.current_user_post_votes[0]
        else:
            # originally by djeedit
            userPostVote = UserPostVote.objects.get(user=user, post=post) # FIXME ! generates too much sqk queries in template!
        if (userPostVote.val == 1 and upvote) or (userPostVote.val == -1 and not upvote):
            return 'color-primary'
    except (IndexError, UserPostVote.DoesNotExist):
        pass
    return ''


@register.simple_tag
def postVoteColor(user, post):

    try:
        # try to find post in prefetch objects see discussionPage(request) view for details
        if hasattr(post, 'current_user_post_votes'):
            userPostVote = post.current_user_post_votes[0]
        else:
            # originally by djeedit
            userPostVote = UserPostVote.objects.get(user=user, post=post)
        if (userPostVote.val == 1):
            return 'color-upvote'
        elif (userPostVote.val == -1):
            return 'color-downvote'
    except (IndexError, UserPostVote.DoesNotExist):
        pass
    return ''

@register.simple_tag
def postVoteOP(thread, post):
    return 'glyphicon-chevron-up-op' if thread.op != post else ''


@register.simple_tag
def postContainer(parent):
    return "post-container" if parent else "op-container"


@register.simple_tag
def postDate(dt, prefix='', verbose=True):
    dt_now = datetime.utcnow().replace(tzinfo=utc)
    # if dt.date() == dt_now.date():
    delta = (dt_now - dt).total_seconds()

    years = int(delta / 31556926)
    string = getAmountContext(years, 'year')
    if string:
        return '%s ago' % string if verbose else '%sy' % years

    months = int(delta / 2592000)
    string = getAmountContext(months, 'month')
    if string:
        return '%s ago' % string if verbose else '%smo' % months

    days = int(delta / 86400)
    string = getAmountContext(days, 'day')
    if string:
        return '%s ago' % string if verbose else '%sd' % days
   
    hours = int(delta / 3600)
    string = getAmountContext(hours, 'hour')
    if string:
        return '%s ago' % string if verbose else '%sh' % hours
   
    minutes = int(delta / 60)
    string = getAmountContext(minutes, 'minute')
    if string:
        return '%s ago' % string if verbose else '%sm' % minutes
    return 'less than a minute ago' if verbose else '<1m'
   
    return prefix + formats.date_format(dt.date(), "DATE_FORMAT")


@register.simple_tag
def threadUrl(thread):
    """:return thread url if it has one, otherwise forward to thread page"""
    return thread.url or thread.relativeUrl

@register.simple_tag
def postUrl(post):
    return '%s/#%s' % (post.thread.relativeUrl, post.uid)

@register.simple_tag
def threadIconClass(thread):
    return 'fa-link' if thread.url else 'fa-commenting-o'

@register.simple_tag
def firstLine(s, max_len=0):
    line = s.split('\n')[0]
    if max_len and len(line) > max_len:
        return '%s...' % line[:max_len]
    return line

@register.simple_tag
def toggleHeader(thread, post, user):
    return getBoolean(user.is_superuser and thread.op == post)


@register.simple_tag
def isOp(thread, post):
    return getBoolean(thread.op == post)

@register.simple_tag
def userStatusSelected(user, status):
    if user.is_active:
        if user.is_superuser:
            return 'selected' if status == 'admin' else ''
        return 'selected' if status == 'active' else ''
    return 'selected' if status == 'banned' else ''

@register.filter
def missingRepliesCount(post, shown_replies):
    excluded_uids = [r.uid for r in shown_replies]
    return post.getReplies(excluded=excluded_uids).count()
