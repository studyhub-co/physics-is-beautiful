import re
from django import template
from django.conf import settings

register = template.Library()


@register.filter
def replace_with_static(value, regex):
    return re.sub(regex, '{}/{}'.format(settings.STATIC_URL, settings.NPM_STATIC_FILES_PREFIX), value)
