from django.contrib import admin

from moderation.admin import ModerationAdmin

from .models import Resource


class ResourceAdmin(ModerationAdmin):
    # visibility_column = 'visible_moderator'
    list_select_related = ('owner__user', )

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if 'queryset' in kwargs:
            kwargs['queryset'] = kwargs['queryset'].select_related()
        else:
            db = kwargs.pop('using', None)
            kwargs['queryset'] = db_field.rel.to._default_manager.using(db).complex_filter(
                db_field.rel.limit_choices_to).select_related()
        return super(ResourceAdmin, self).formfield_for_foreignkey(db_field, request, **kwargs)


admin.site.register(Resource, ResourceAdmin)
