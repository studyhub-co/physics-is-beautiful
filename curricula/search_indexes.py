from haystack import indexes
from .models.structure import Curriculum, Unit, Module, Lesson
from .models.question import Question


class CurriculumIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    uuid = indexes.CharField(model_attr='uuid')
    name = indexes.CharField(model_attr='name')
    description = indexes.CharField(model_attr='description', null=True)

    def get_model(self):
        return Curriculum

    def index_queryset(self, using=None):
        return self.get_model().objects.filter(setting_publically=True)


class UnitIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True)
    name = indexes.CharField(model_attr='name')

    def get_model(self):
        return Unit


class ModuleIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True)
    name = indexes.CharField(model_attr='name')

    def get_model(self):
        return Module


class LessonIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True)
    name = indexes.CharField(model_attr='name')

    def get_model(self):
        return Lesson


class QuestionIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True)
    question = indexes.CharField(model_attr='text')
    hint = indexes.CharField(model_attr='hint')

    def get_model(self):
        return Question
