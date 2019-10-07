import uuid

from django.utils.translation import ugettext_lazy as _
from django.utils.text import slugify
from django.db import models

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

    # used to create slug
    name = models.CharField(max_length=2048, blank=True, null=True, help_text=_('Name'))
    slug = models.SlugField(unique=True, max_length=1536, blank=True, null=True)
    position = models.PositiveSmallIntegerField('Position', null=True, blank=True)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)

    # TODO updates history
    updated_on = models.DateTimeField(auto_now=True)
    last_edit_user = models.ForeignKey(Profile,
                                       related_name="%(app_label)s_%(class)s_last_edit_items",
                                       on_delete=models.CASCADE, null=True, blank=True)
    # not sure we need this for now
    # published_on = models.DateTimeField('date published', null=True, blank=True)

    def gen_slug(self, try_count=0, unique=True):
        title = self.name
        max_lengh = self.__class__._meta.get_field('slug').max_length

        if try_count != 0:
            slug = slugify("{} {}".format(title, try_count))[:max_lengh]
        else:
            slug = slugify(title)[:max_lengh]

        if not unique:
            return slug

        try:
            self.__class__.objects.get(slug=slug)
        except self.__class__.DoesNotExist:
            return slug
        # if slug is exist
        try_count += 1
        return self.__class__.gen_slug(try_count)

    def save(self, *args, **kwargs):
        if self.name:
            self.slug = self.gen_slug()
        super(BaseItemModel, self).save(*args, **kwargs)


    # def instance_from_db(self):
    #     return self.__class__.objects.get(pk=self.pk)
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
