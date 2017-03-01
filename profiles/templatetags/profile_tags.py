from django import template


register = template.Library()


@register.inclusion_tag('profiles/profile_modal.html')
def profile_modal(user, current_page=None):
    return {
        'user': user,
    }
