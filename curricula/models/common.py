from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.core import urlresolvers


def get_earliest_gap(seq):
    """
    Find the earliest gap in `seq` which should be a list of
    sequential numbers.
    """
    for i in range(len(seq) + 1):
        if i not in seq:
            return i


class BaseModel(models.Model):

    class Meta:
        abstract = True

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def instance_from_db(self):
        return self.__class__.objects.get(pk=self.pk)

    def get_admin_url(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        return urlresolvers.reverse(
            'admin:{}_{}_change'.format(
                content_type.app_label,
                content_type.model
            ),
            args=[self.id]
        )

    def clone(self, to_parent):
        copy = self.__class__.objects.get(id=self.id)
        copy.id = None
        copy.uuid = None
        setattr(copy, self.CloneMeta.parent_field, to_parent)
        copy.save()
        self.clone_children(copy)
        return copy

    def clone_children(self, to_copy):
        if hasattr(self.CloneMeta, 'children_field'):
            for child in getattr(self, self.CloneMeta.children_field).all():
                child.clone(to_copy)
        
