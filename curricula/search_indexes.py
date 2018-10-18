import datetime
from haystack import indexes
from .models.structure import Curriculum


class CurriculumIndex(indexes.SearchIndex, indexes.Indexable):
    # text = indexes.CharField(document=True, use_template=True)
    text = indexes.CharField(document=True)
    name = indexes.CharField(model_attr='name')
    description = indexes.CharField(model_attr='description', null=True)

    def get_model(self):
        return Curriculum

    def index_queryset(self, using=None):
        return self.get_model().objects.filter(setting_publically=True)