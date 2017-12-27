from django import forms
from django.contrib import admin
from django.utils.html import escape

from nested_admin import NestedTabularInline, NestedModelAdmin

from jsonfield.fields import JSONFormField
from .widgets import UnitNameWidget, MathQuillWidget, ConversionStepsJSONWidget

from .models import (
    Curriculum, Unit, Module, Lesson, Question, Answer, Vector, Text, Image, MathematicalExpression,
    UnitConversion
)

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


def create_fields_funcs(field_cls):
    """
    decorator to generate NestedTabularInline functions
    :param field_cls:
    :return:
    """
    def wrapped_decorator(cls):
        for field in field_cls.FIELDS:
            setattr(cls, field, {'field': field})
        return cls
    return wrapped_decorator


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


class VectorQuestionForm(forms.ModelForm):

    FIELDS = ['magnitude', 'angle', 'x_component', 'y_component']

    class Meta:
        model = Question.vectors.through
        fields = ['magnitude', 'angle', 'x_component', 'y_component']

    magnitude = forms.FloatField(required=False)
    angle = forms.FloatField(required=False)
    x_component = forms.FloatField(required=False)
    y_component = forms.FloatField(required=False)

    def __init__(self, *args, **kwargs):
        super(VectorQuestionForm, self).__init__(*args, **kwargs)
        if self.instance.id:
            for field in self.FIELDS:
                self.initial[field] = getattr(self.instance.vector, field)

    def clean(self):
        cleaned_data = super(VectorQuestionForm, self).clean()
        kwargs = {field: cleaned_data[field] for field in self.FIELDS}
        instance = Vector(**kwargs)
        instance.validate_fields()
        return cleaned_data

    def save(self, commit=True):
        self.cleaned_data.pop('DELETE', False)
        question = self.cleaned_data.pop('question')
        question_vector = self.cleaned_data.pop('id', None)
        if question_vector:
            for k, v in self.cleaned_data.items():
                setattr(question_vector.vector, k, v)
            question_vector.vector.save()
        else:
            vector = Vector.objects.create(**self.cleaned_data)
            question.vectors.add(vector)
        return question


class VectorQuestionsInline(NestedTabularInline):

    extra = 0
    classes = ['collapse']
    verbose_name_plural = 'Edit Vectors to Display with Question'
    model = Question.vectors.through
    form = VectorQuestionForm
    sortable_field_name = None

    def magnitude(self, obj):
        return obj.vector.magnitude

    def angle(self, obj):
        return obj.vector.angle

    def x_component(self, obj):
        return obj.vector.x_component

    def y_component(self, obj):
        return obj.vector.y_component


@create_fields_funcs(VectorAnswerForm)
class VectorAnswerInline(AnswerTabularInline):

    verbose_name_plural = 'Edit Vector Answers'
    model = Answer
    form = VectorAnswerForm

    # def magnitude(self, obj):
    #     return obj.magnitude
    #
    # def angle(self, obj):
    #     return obj.angle
    #
    # def x_component(self, obj):
    #     return obj.x_component
    #
    # def y_component(self, obj):
    #     return obj.y_component


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


class MathematicalExpressionAnswerForm(SpecialAnswerFormMixin, forms.ModelForm):

    FIELDS = ['representation']
    SPECIAL_MODEL = MathematicalExpression

    class Meta:
        model = Answer
        fields = ['representation', 'is_correct', 'position']

    representation = forms.CharField()


class MathematicalExpressionAnswerInline(AnswerTabularInline):
    verbose_name_plural = 'Edit Mathematical Expression Answers'
    model = Answer
    form = MathematicalExpressionAnswerForm

    def representation(self, obj):
        return obj.representation


class UnitConversionAnswerForm(SpecialAnswerFormMixin, forms.ModelForm):

    FIELDS = ['unit_conversion_type', 'conversion_steps', 'question_number', 'question_unit', 'answer_number', 'answer_unit']
    SPECIAL_MODEL = UnitConversion

    question_number = forms.CharField(widget=MathQuillWidget(attrs={'placeholder': 'question'}))
    question_unit = forms.CharField(widget=UnitNameWidget(attrs={'placeholder': 'question unit'}))
    answer_number = forms.CharField(widget=MathQuillWidget(attrs={'placeholder': 'answer'}))
    answer_unit = forms.CharField(widget=UnitNameWidget(attrs={'placeholder': 'answer unit'}))

    unit_conversion_type = forms.ChoiceField(choices=UnitConversion.UnitConversionTypes)

    conversion_steps = JSONFormField(required=False,
                                     help_text=UnitConversion._meta.get_field('conversion_steps').help_text,
                                     widget=ConversionStepsJSONWidget
                                     )

    class Meta:
        model = Answer
        fields = ['unit_conversion_type', 'conversion_steps', 'is_correct', 'position']


@create_fields_funcs(UnitConversionAnswerForm)
class UnitConversionAnswerInline(AnswerTabularInline):
    verbose_name_plural = 'Edit Unit Conversion Answers'
    model = Answer
    form = UnitConversionAnswerForm

    # def initial_step(self, obj):
    #     return obj

    class Media:
        css = {
            "all": ("curricula/mathquill-0.10.1/mathquill.css", )
        }
        js = ("curricula/mathquill-0.10.1/mathquill.js", )


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


class LessonForm(forms.ModelForm):

    class Meta:
        model = Lesson
        fields = [
            'module', 'name', 'published_on', 'image', 'position', 'lesson_type', 'game_slug',
        ]

    game_slug = forms.CharField(required=False)

    def __init__(self, *args, **kwargs):
        super(LessonForm, self).__init__(*args, **kwargs)
        if hasattr(self.instance, 'game'):
            self.initial['game_slug'] = self.instance.game.slug

    def save(self, commit=True):
        instance = super(LessonForm, self).save(commit)
        if 'game_slug' in self.cleaned_data and self.cleaned_data['game_slug']:
            instance.game.slug = self.cleaned_data['game_slug']
            instance.game.save()
        return instance


class LessonAdmin(NestedModelAdmin):

    form = LessonForm
    inlines = [QuestionInline]
    fields = [
        'module', _backlink_to_module, 'name', 'published_on', 'image', 'position', 'lesson_type'
    ]
    readonly_fields = [_backlink_to_module, 'position']

    def get_fields(self, request, obj=None):
        extra_fields = []
        if obj and obj.lesson_type == Lesson.LessonType.GAME:
            extra_fields.append('game_slug')
        return self.fields + extra_fields


_backlink_to_lesson = link_to_field('lesson')


class QuestionAdmin(NestedModelAdmin):

    inlines = [
        VectorQuestionsInline, TextAnswerInline, VectorAnswerInline, ImageAnswerInline,
        MathematicalExpressionAnswerInline, UnitConversionAnswerInline

    ]
    fields = [
        'lesson', _backlink_to_lesson, 'text', 'additional_text', 'hint', 'published_on', 'image', 'question_type',
        'answer_type', 'position'
    ]
    readonly_fields = [_backlink_to_lesson, 'position']
    inline_map = {
        Question.AnswerType.TEXT: [TextAnswerInline],
        Question.AnswerType.IMAGE: [ImageAnswerInline],
        Question.AnswerType.VECTOR: [VectorAnswerInline],
        Question.AnswerType.NULLABLE_VECTOR: [VectorAnswerInline],
        Question.AnswerType.MATHEMATICAL_EXPRESSION: [MathematicalExpressionAnswerInline],
        Question.AnswerType.VECTOR_COMPONENTS: [VectorAnswerInline, VectorQuestionsInline],
        Question.AnswerType.UNIT_CONVERSION: [UnitConversionAnswerInline]
    }

    def get_inline_instances(self, request, obj=None):
        inline_classes = []
        if obj:
            db_instance = obj.instance_from_db()
            if db_instance.answer_type == obj.answer_type:
                inlines = self.inline_map.get(obj.answer_type, [])
                for inline in inlines:
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
