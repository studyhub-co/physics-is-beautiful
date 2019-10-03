import uuid

from django.db import models
# from django.contrib.contenttypes.models import ContentType
# from django.urls import reverse
# from django.core import urlresolvers # django <= 1.11.20

from profiles.models import Profile


def get_earliest_gap(seq):
    """
    Find the earliest gap in `seq` which should be a list of
    sequential numbers.
    """
    for i in range(len(seq) + 1):
        if i not in seq:
            return i


class BaseItemModel(models.Model):

    class Meta:
        abstract = True

    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_on = models.DateTimeField(auto_now_add=True)

    position = models.PositiveSmallIntegerField('Position', null=True, blank=True)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)

    # TODO updates history
    updated_on = models.DateTimeField(auto_now=True)
    last_edit_user = models.ForeignKey(Profile,
                                       related_name="%(app_label)s_%(class)s_last_edit_items",
                                       on_delete=models.CASCADE, null=True, blank=True)
    # not sure we need this for now
    # published_on = models.DateTimeField('date published', null=True, blank=True)

    def instance_from_db(self):
        return self.__class__.objects.get(pk=self.pk)
    #
    # def get_admin_url(self):
    #     content_type = ContentType.objects.get_for_model(self.__class__)
    #     # return urlresolvers.reverse(
    #     return reverse(
    #         'admin:{}_{}_change'.format(
    #             content_type.app_label,
    #             content_type.model
    #         ),
    #         args=[self.id]
    #     )
    #
    #
