from django import template


register = template.Library()


@register.inclusion_tag('pib_auth/auth_modals.html')
def auth_modal(user, current_page=None):
    return {
        'user': user,
        'redirect_to': current_page,
    }
