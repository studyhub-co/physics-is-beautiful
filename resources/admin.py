from django.contrib import admin

from moderation.admin import ModerationAdmin

from .models import Resource


class ResourceAdmin(ModerationAdmin):
    visibility_column = 'visible_moderator'


admin.site.register(Resource, ResourceAdmin)
