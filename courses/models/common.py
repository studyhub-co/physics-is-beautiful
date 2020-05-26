import uuid

from django.db.models import Max
from django.utils.translation import ugettext_lazy as _
from django.utils.text import slugify
from django.db import models
from django.core.validators import MinLengthValidator

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
        unique_together = [['slug_prefix', 'slug_suffix']]

    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_on = models.DateTimeField(auto_now_add=True)

    # name used to create slug
    # let's set that name is required
    name = models.CharField(max_length=2048,
                            blank=False,
                            validators=[MinLengthValidator(3)],
                            help_text=_('Name'))
    slug = models.SlugField(unique=True, max_length=1536, blank=True, null=True)

    # store slug components to efficient getting last one
    slug_prefix = models.SlugField(max_length=1536, blank=True, null=True)
    slug_suffix = models.PositiveIntegerField(null=True)

    position = models.PositiveSmallIntegerField('Position', null=True, blank=True)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)

    # TODO updates history
    updated_on = models.DateTimeField(auto_now=True)
    last_edit_user = models.ForeignKey(Profile,
                                       related_name="%(app_label)s_%(class)s_last_edit_items",
                                       on_delete=models.CASCADE, null=True, blank=True)
    # not sure we need this for now
    # published_on = models.DateTimeField('date published', null=True, blank=True)

    def gen_slug(self):
        # TODO add tests for this function
        title = self.name
        max_lengh = self.__class__._meta.get_field('slug').max_length

        slug_prefix = slugify(title)[:max_lengh]

        max_slug_suffix = self.__class__.objects.\
            filter(slug_prefix=slug_prefix).\
            aggregate(Max('slug_suffix'))['slug_suffix__max']

        if max_slug_suffix is None:
            # slug = slug_prefix # old version
            # we need to add suffix at any case
            # title => title
            # title 1 => title-1
            # title => title-1 (got the same slug as above)
            slug_suffix = 0
            slug = slugify("{} {}".format(title, slug_suffix))[:max_lengh]
        else:
            # last slug
            slug = slugify("{} {}".format(title, max_slug_suffix + 1))[:max_lengh]
            slug_suffix = max_slug_suffix + 1
        # TODO check a slug uniqueness,

        return slug, slug_prefix, slug_suffix

    def save(self, *args, **kwargs):
        if self.name:
            self.slug, self.slug_prefix, self.slug_suffix = self.gen_slug()

        # clean name field at model level
        # related to default Material creation. code:
        # studio/serializers.py
        # 'Material.objects.create(lesson=new_lesson, author=self.context['request'].user.profile)'
        fields = [f.name for f in self._meta.fields]
        fields.remove('name')
        self.clean_fields(exclude=fields)
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
