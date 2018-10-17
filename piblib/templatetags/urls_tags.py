from django import template
from django.urls import reverse

register = template.Library()


@register.simple_tag(takes_context=True)
def current_url_starts_with(context, *args):
    """ Check if the browse is currently at this supplied url"""
    # TODO problem: studio url reverse with editor url
    # need to add namespace to 'editor' url()
    for url in args:
        current_url = context['request'].path
        supplied_url = reverse(url)
        if current_url.startswith(supplied_url):
            return ' active'
        else:
            return ''
