from django import forms
from django.contrib import admin
from django.contrib import messages
from django.utils.html import escape
from django.core.exceptions import ValidationError

from nested_admin import NestedTabularInline, NestedModelAdmin

from .models import Curriculum, Unit, Module, Lesson, Question, Answer, Vector, Text, Image

admin.AdminSite.site_header = 'Physics is Beautiful Admin'
admin.AdminSite.site_title = admin.AdminSite.site_header

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
            content = self.SPECIAL_MODEL(**kwargs)
        else:
            content = self.instance.content
            for field in self.FIELDS:
                setattr(content, field, self.cleaned_data[field])
        content.save()
        instance.content = content
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

    def __init__(self, *args, **kwargs):
        super(VectorAnswerForm, self).__init__(*args, **kwargs)
        instance = kwargs.get('instance')
        if instance and instance.question.question_type == Question.QuestionType.SINGLE_ANSWER:
            field = self.fields['is_correct']
            field.initial = True
            field.widget.attrs['disabled'] = True

    def clean(self):
        cleaned_data = super(VectorAnswerForm, self).clean()
        kwargs = {field: cleaned_data[field] for field in self.FIELDS}
        instance = Vector(**kwargs)
        instance.validate_fields()
        return cleaned_data


class AnswerTabularInline(NestedTabularInline):

    extra = 0
    classes = ['collapse']
    readonly_fields = ['position']

    def get_max_num(self, request, obj=None, **kwargs):
        if not obj or obj.question_type == Question.QuestionType.SINGLE_ANSWER:
            return 1
        else:
            return None


class VectorAnswerInline(AnswerTabularInline):
    verbose_name_plural = 'Edit Vector Answers'
    model = Answer
    form = VectorAnswerForm

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


class TextAnswerInline(AnswerTabularInline):
    verbose_name_plural = 'Edit Text Answers'
    model = Answer
    form = TextAnswerForm

    def text(self, obj):
        return obj.text


class ImageAnswerForm(SpecialAnswerFormMixin, forms.ModelForm):

    FIELDS = ['image']
    SPECIAL_MODEL = Image

    class Meta:
        model = Answer
        fields = ['image', 'is_correct', 'position']

    image = forms.ImageField()


class ImageAnswerInline(AnswerTabularInline):
    verbose_name_plural = 'Edit Image Answers'
    model = Answer
    form = ImageAnswerForm

    def image(self, obj):
        return obj.image


class CurriculumAdmin(NestedModelAdmin):

    inlines = [UnitInline]


_backlink_to_curriculum = link_to_field('curriculum')


class UnitAdmin(NestedModelAdmin):

    inlines = [ModuleInline]
    fields = ['curriculum', _backlink_to_curriculum, 'name', 'published_on', 'image', 'position']
    readonly_fields = [_backlink_to_curriculum, 'position']


_backlink_to_unit = link_to_field('unit')


class ModuleAdmin(NestedModelAdmin):

    inlines = [LessonInline]
    fields = ['unit', _backlink_to_unit, 'name', 'published_on', 'image', 'position']
    readonly_fields = [_backlink_to_unit, 'position']


_backlink_to_module = link_to_field('module')


class LessonAdmin(NestedModelAdmin):

    inlines = [QuestionInline]
    fields = ['module', _backlink_to_module, 'name', 'published_on', 'image', 'position']
    readonly_fields = [_backlink_to_module, 'position']


_backlink_to_lesson = link_to_field('lesson')


class QuestionAdmin(NestedModelAdmin):

    inlines = [TextAnswerInline, VectorAnswerInline, ImageAnswerInline]
    fields = [
        'lesson', _backlink_to_lesson, 'text', 'hint', 'published_on', 'image', 'question_type',
        'answer_type', 'position'
    ]
    readonly_fields = [_backlink_to_lesson, 'position']
    inline_map = {
        Question.AnswerType.TEXT: TextAnswerInline,
        Question.AnswerType.IMAGE: ImageAnswerInline,
        Question.AnswerType.VECTOR: VectorAnswerInline,
        Question.AnswerType.NULLABLE_VECTOR: VectorAnswerInline,
    }

    def get_inline_instances(self, request, obj=None):
        inline_classes = []
        if obj:
            db_instance = obj.instance_from_db()
            if db_instance.answer_type == obj.answer_type:
                inline = self.inline_map.get(obj.answer_type)
                if inline and inline not in inline_classes:
                    inline_classes.append(inline)
        return filter(
            lambda i: inline_classes and isinstance(i, tuple(inline_classes)),
            super(QuestionAdmin, self).get_inline_instances(request)
        )

    def get_formsets(self, request, obj=None):
        for inline in self.get_inline_instances(request, obj):
            yield inline.get_formset(request, obj)


admin.site.register(Curriculum, CurriculumAdmin)
admin.site.register(Unit, UnitAdmin)
admin.site.register(Module, ModuleAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Question, QuestionAdmin)
