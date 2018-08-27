from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render


@login_required
@csrf_exempt
def login_next(request):
    
    if 'HTTP_REFERER' in request.META and 'pib_mobile' in request.META.get('HTTP_REFERER'):
        return HttpResponseRedirect(reverse('pib_auth:blank'))

    return HttpResponseRedirect(reverse('curricula:curriculum'))


def blank(request):
    return render(request, 'pib_auth/blank.html')
