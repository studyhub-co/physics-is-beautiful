from django import forms
from django.contrib import admin
from django.utils.html import escape

from nested_admin import NestedTabularInline, NestedModelAdmin

from .models import Curriculum, Unit, Module, Lesson, Question, Answer, Vector, Text


def link_to_obj(name):
    def link(obj):
        return '<a href="{}">{}</a>'.format(obj.get_admin_url(), str(obj))
    link.allow_tags = True
    link.short_description = name
    return link


def link_to_field(field_name):
    def link(obj):
        field = getattr(obj, field_name)
        return '<a href="{}">{}</a>'.format(field.get_admin_url(), escape(field))
    link.allow_tags = True
    link.short_description = field_name
    return link


_link_to_unit = link_to_obj('Unit')


class UnitInline(NestedTabularInline):
    model = Unit
    sortable_field_name = 'position'
    extra = 0
    classes = ['collapse']
    fields = [_link_to_unit, 'name', 'published_on', 'image', 'position']
    readonly_fields = [_link_to_unit]


_link_to_module = link_to_obj('Module')


class ModuleInline(NestedTabularInline):
    model = Module
    sortable_field_name = 'position'
    extra = 0
    classes = ['collapse']
    fields = [_link_to_module, 'name', 'published_on', 'image', 'position']
    readonly_fields = [_link_to_module]


_link_to_lesson = link_to_obj('Lesson')


class LessonInline(NestedTabularInline):
    model = Lesson
    sortable_field_name = 'position'
    extra = 0
    classes = ['collapse']
    fields = [_link_to_lesson, 'name', 'published_on', 'image', 'position']
    readonly_fields = [_link_to_lesson]


_link_to_question = link_to_obj('Question')


class QuestionInline(NestedTabularInline):
    model = Question
    sortable_field_name = 'position'
    extra = 0
    classes = ['collapse']
    fields = [_link_to_question, 'text', 'published_on', 'image', 'position']
    readonly_fields = [_link_to_question]


_link_to_answer = link_to_obj('Answer')


class SpecialAnswerFormMixin(object):

    def __init__(self, *args, **kwargs):
        super(SpecialAnswerFormMixin, self).__init__(*args, **kwargs)
        if self.instance.id:
            for field in self.FIELDS:
                self.initial[field] = getattr(self.instance.content, field)

    def save(self, commit=True):
        """
        Overriding save to create Answer sub-object.

        NOTE: We ignore the commit flag.
        """
        instance = super(SpecialAnswerFormMixin, self).save(commit=False)
        if not instance.id and instance.question:
            instance.position = instance.question.answers.count()
        if not instance.object_id:
            kwargs = {field: self.cleaned_data[field] for field in self.FIELDS}
            self.instance.content = self.SPECIAL_MODEL.objects.create(**kwargs)
        else:
            for field in self.FIELDS:
                setattr(self.instance.content, field, self.cleaned_data[field])
            self.instance.content.save()
        instance.save()
        return instance


class VectorAnswerForm(SpecialAnswerFormMixin, forms.ModelForm):

    FIELDS = ['magnitude', 'angle', 'x_component', 'y_component']
    SPECIAL_MODEL = Vector

    class Meta:
        model = Answer
        fields = ['magnitude', 'angle', 'x_component', 'y_component', 'is_correct', 'position']

    magnitude = forms.FloatField(required=False)
    angle = forms.FloatField(required=False)
    x_component = forms.FloatField(required=False)
    y_component = forms.FloatField(required=False)


class VectorAnswerInline(NestedTabularInline):
    verbose_name_plural = 'Edit Vector Answers'
    model = Answer
    form = VectorAnswerForm
    extra = 0
    classes = ['collapse']
    readonly_fields = ['position']

    def get_max_num(self, request, obj=None, **kwargs):
        if not obj or obj.question_type == Question.QuestionType.SINGLE_ANSWER:
            return 1
        else:
            return None

    def get_queryset(self, request):
        qs = super(VectorAnswerInline, self).get_queryset(request)
        return qs.filter(content_type__model=Vector.__name__.lower())

    def magnitude(self, obj):
        return obj.magnitude

    def angle(self, obj):
        return obj.angle

    def x_component(self, obj):
        return obj.x_component

    def y_component(self, obj):
        return obj.y_component


class TextAnswerForm(SpecialAnswerFormMixin, forms.ModelForm):

    FIELDS = ['text']
    SPECIAL_MODEL = Text

    class Meta:
        model = Answer
        fields = ['text', 'is_correct', 'position']

    text = forms.CharField()


class TextAnswerInline(NestedTabularInline):
    verbose_name_plural = 'Edit Text Answers'
    model = Answer
    form = TextAnswerForm
    extra = 0
    classes = ['collapse']
    readonly_fields = ['position']

    def get_max_num(self, request, obj=None, **kwargs):
        if not obj or obj.question_type == Question.QuestionType.SINGLE_ANSWER:
            return 1 if not obj or obj.answers.count() < 1 else 0
        else:
            return None

    def get_queryset(self, request):
        qs = super(TextAnswerInline, self).get_queryset(request)
        return qs.filter(content_type__model=Text.__name__.lower())

    def text(self, obj):
        return obj.text


class AnswerInline(NestedTabularInline):
    model = Answer
    sortable_field_name = 'position'
    extra = 0
    fields = ['content', 'is_correct', 'position']
    readonly_fields = ['content']

    def has_add_permission(self, request):
        return False


class CurriculumAdmin(NestedModelAdmin):

    inlines = [UnitInline]


class UnitAdmin(NestedModelAdmin):

    inlines = [ModuleInline]
    readonly_fields = ['position']


class ModuleAdmin(NestedModelAdmin):

    inlines = [LessonInline]
    readonly_fields = ['position']


class LessonAdmin(NestedModelAdmin):

    inlines = [QuestionInline]
    readonly_fields = ['position']


class QuestionAdmin(NestedModelAdmin):

    inlines = [AnswerInline, TextAnswerInline, VectorAnswerInline]
    readonly_fields = ['position']


admin.site.register(Curriculum, CurriculumAdmin)
admin.site.register(Unit, UnitAdmin)
admin.site.register(Module, ModuleAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Question, QuestionAdmin)
