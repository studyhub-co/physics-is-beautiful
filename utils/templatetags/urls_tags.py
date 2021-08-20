from django import template
from django.urls import reverse

register = template.Library()


@register.simple_tag(takes_context=True)
def current_url_starts_with(context, *args, **kwargs):
    """ Check if the browse is currently at this supplied url"""
    for url in args:
        current_url = context['request'].path
        supplied_url = reverse(url, kwargs=kwargs)

        # fix for /curriculum/* (curricula application) and /curriculum/profile/* (editor application)
        if url == 'main_curricula:curriculum' and current_url.startswith('/curriculum/profile/'):
            return ''

        if current_url.startswith(supplied_url):
            return ' active'
    return ''
