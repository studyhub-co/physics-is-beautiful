from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt


@login_required
@csrf_exempt
def login_next(request):
    
    if 'HTTP_REFERER' in request.META and 'pib_mobile' in request.META.get('HTTP_REFERER'):
        return HttpResponseRedirect(reverse('blog:blank'))

    return HttpResponseRedirect(reverse('curricula:curriculum'))
