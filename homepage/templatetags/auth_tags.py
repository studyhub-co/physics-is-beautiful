from django import template


register = template.Library()


@register.inclusion_tag('homepage/auth_forms.html')
def auth_forms(current_page=None):
    return {
        'redirect_to': current_page
    }
