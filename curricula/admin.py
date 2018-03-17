from django import forms
from django.contrib import admin
from django.utils.html import escape

from nested_admin import NestedTabularInline, NestedModelAdmin

from jsonfield.fields import JSONFormField
from .widgets import UnitNameWidget, MathQuillUnitConversionWidget, ConversionStepsJSONWidget, MathConversionWidget

from .models import (
    Curriculum, Unit, Module, Lesson, Question, Answer, Vector, MathematicalExpression,
    UnitConversion, ImageWText
)

from .models.answers import MathematicalExpressionMixin
from pint import UnitRegistry

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
    # classes = ['collapse']
    classes = ['']
    fields = [_link_to_unit, 'name', 'image', 'position']  # 'published_on',
    readonly_fields = [_link_to_unit]

    class Media:
        css = {
             'all': ("curricula/admin/css/custom_admin.css",)
        }


_link_to_module = link_to_obj('Module')


class ModuleInline(NestedTabularInline):
    model = Module
    sortable_field_name = 'position'
    extra = 0
    # classes = ['collapse']
    classes = ['']
    fields = [_link_to_module, 'name', 'image', 'position']  # 'published_on',
    readonly_fields = [_link_to_module]

    class Media:
        css = {
             'all': ("curricula/admin/css/custom_admin.css",)
        }


_link_to_lesson = link_to_obj('Lesson')


class LessonInline(NestedTabularInline):
    model = Lesson
    sortable_field_name = 'position'
    extra = 0
    # classes = ['collapse']
    classes = []
    fields = [_link_to_lesson, 'name', 'image', 'lesson_type',  'position',]  # 'published_on',
    readonly_fields = [_link_to_lesson]

    class Media:
        css = {
             'all': ("curricula/admin/css/custom_admin.css",)
        }


_link_to_question = link_to_obj('Question')


# class QuestionInline(NestedTabularInline):
#     model = Question
#     sortable_field_name = 'position'
#     extra = 0
#     # classes = ['collapse']
#     classes = ['']
#     fields = [_link_to_question, 'text', 'image', 'position']  # 'published_on',
#     readonly_fields = [_link_to_question]


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
        fields = ['magnitude', 'angle', 'x_component', 'y_component', 'is_correct' ] # 'position'

    magnitude = forms.FloatField(required=False)
    angle = forms.FloatField(required=False)
    x_component = forms.FloatField(required=False)
    y_component = forms.FloatField(required=False)

    def __init__(self, *args, **kwargs):
        super(VectorAnswerForm, self).__init__(*args, **kwargs)
        # instance = kwargs.get('instance')
        # if instance and instance.question.question_type == Question.QuestionType.SINGLE_ANSWER:
        #     field = self.fields['is_correct']
        #     field.initial = True
        #     field.widget.attrs['disabled'] = True

    def clean(self):
        cleaned_data = super(VectorAnswerForm, self).clean()
        kwargs = {field: cleaned_data[field] for field in self.FIELDS}
        instance = Vector(**kwargs)
        instance.validate_fields()
        return cleaned_data


class AnswerTabularInline(NestedTabularInline):

    extra = 0
    # classes = ['collapse']
    classes = ['']
    readonly_fields = ['position']

    def __init__(self, *args, **kwargs):
        self.exclude = []
        super(AnswerTabularInline, self).__init__(*args, **kwargs)

    def get_max_num(self, request, obj=None, **kwargs):
        # if not obj or obj.answer_type == Question.AnswerType.SINGLE_ANSWER:
        if not obj or not (obj.answer_type == Question.AnswerType.MULTISELECT_CHOICE or
                       obj.answer_type == Question.AnswerType.MULTIPLE_CHOICE):
            self.exclude.append('is_correct')
            return 1
        else:
            self.exclude = []
            return None

    class Media:
        css = {
             'all': ("curricula/admin/css/custom_admin.css",)
        }


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
    # classes = ['collapse']
    classes = ['']
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


class ImageWTextAnswerForm(SpecialAnswerFormMixin, forms.ModelForm):

    FIELDS = ['text', 'image']
    SPECIAL_MODEL = ImageWText

    class Meta:
        model = Answer
        fields = ['text', 'image', 'is_correct'] # 'position'

    text = forms.CharField(required=False)
    image = forms.ImageField(required=False)

    def clean(self):
        cleaned_data = super().clean()
        text = cleaned_data.get("text")
        image = cleaned_data.get("image")

        if not image and not text:
            raise forms.ValidationError(
                "At least one of text field or image field required"
            )


@create_fields_funcs(ImageWTextAnswerForm)
class ImageWTextAnswerInline(AnswerTabularInline):
    verbose_name_plural = 'Edit Image with Text Answers'
    model = Answer
    form = ImageWTextAnswerForm

class MathematicalExpressionAnswerForm(SpecialAnswerFormMixin, forms.ModelForm):
    representation = forms.CharField(required=True, max_length=255, widget=MathConversionWidget())

    FIELDS = ['representation']
    SPECIAL_MODEL = MathematicalExpression

    class Meta:
        model = Answer
        fields = ['representation', 'is_correct'] # , 'position'


class MathematicalExpressionAnswerInline(AnswerTabularInline):
    verbose_name_plural = 'Edit Mathematical Expression Answers'
    model = Answer
    form = MathematicalExpressionAnswerForm

    def representation(self, obj):
        return obj.representation

    class Media:
        css = {
            "all": ("curricula/mathquill-0.10.1/mathquill.css", )
        }
        js = ("curricula/mathquill-0.10.1/mathquill.js", )


class UnitConversionAnswerForm(SpecialAnswerFormMixin, forms.ModelForm):

    FIELDS = ['unit_conversion_type', 'conversion_steps', 'question_number', 'question_unit', 'answer_number', 'answer_unit']
    SPECIAL_MODEL = UnitConversion

    question_number = forms.CharField(required=True, widget=MathQuillUnitConversionWidget(attrs={'placeholder': 'question'}))
    question_unit = forms.CharField(required=True, widget=UnitNameWidget(attrs={'placeholder': 'question unit'}))
    answer_number = forms.CharField(required=True, widget=MathQuillUnitConversionWidget(attrs={'placeholder': 'answer'}))
    answer_unit = forms.CharField(required=True, widget=UnitNameWidget(attrs={'placeholder': 'answer unit'}))

    unit_conversion_type = forms.ChoiceField(required=True, choices=UnitConversion.UnitConversionTypes)

    conversion_steps = JSONFormField(required=False,
                                     help_text=UnitConversion._meta.get_field('conversion_steps').help_text,
                                     widget=ConversionStepsJSONWidget
                                     )

    def clean(self):
        question_number = self.cleaned_data.get('question_number', None)
        question_unit = self.cleaned_data.get('question_unit', None)

        answer_number = self.cleaned_data.get('answer_number', None)
        answer_unit = self.cleaned_data.get('answer_unit', None)

        if None in [question_number, question_unit, answer_number, answer_unit]:
            return

        steps = self.cleaned_data.get('conversion_steps', None)

        ureg = UnitRegistry()
        Q_ = ureg.Quantity

        left_value = Q_(question_number + " " + question_unit)
        right_value = Q_(answer_number + " " + answer_unit)

        if steps:
            for step in steps:
                try:
                    num = Q_(step['numerator'])
                    denom = Q_(step['denominator'])

                    left_value = left_value * num / denom
                except:
                    steps.remove(step)

        # values to base
        answer_left = left_value.to_base_units().magnitude
        answer_number = right_value.to_base_units().magnitude

        correct = MathematicalExpressionMixin.match_math(str(answer_left), str(answer_number))

        if not correct:
            self.add_error('conversion_steps', 'Conversion steps are incorrect')

    class Meta:
        model = Answer
        fields = ['unit_conversion_type',
                  'conversion_steps', 'question_number', 'question_unit', 'answer_number', 'answer_unit',
                  'is_correct'] # , 'position'


@create_fields_funcs(UnitConversionAnswerForm)
class UnitConversionAnswerInline(AnswerTabularInline):
    verbose_name_plural = 'Edit Unit Conversion Answers'
    model = Answer
    form = UnitConversionAnswerForm

    class Media:
        css = {
            "all": ("curricula/mathquill-0.10.1/mathquill.css", )
        }
        js = ("curricula/mathquill-0.10.1/mathquill.js", )


class CurriculumAdmin(NestedModelAdmin):

    inlines = [UnitInline]
    exclude = ['published_on']


_backlink_to_curriculum = link_to_field('curriculum')


class UnitAdmin(NestedModelAdmin):

    inlines = [ModuleInline]
    fields = ['curriculum', _backlink_to_curriculum, 'name', 'image', ]  # 'published_on', 'position'
    readonly_fields = [_backlink_to_curriculum] #, 'position'


_backlink_to_unit = link_to_field('unit')


class ModuleAdmin(NestedModelAdmin):

    inlines = [LessonInline]
    fields = ['unit', _backlink_to_unit, 'name', 'image']  # 'published_on', 'position'
    readonly_fields = [_backlink_to_unit] #, 'position'


_backlink_to_module = link_to_field('module')


GAME_CHOICES = [
    ('unit-conversion', 'Unit conversion'),
    ('vector-game', 'Vector game')
]


class LessonForm(forms.ModelForm):

    class Meta:
        model = Lesson
        fields = [
            'module', 'name', 'image', 'lesson_type', 'game_slug',  # 'published_on', 'position',
        ]

    game_slug = forms.CharField(required=False, widget=forms.Select(choices=GAME_CHOICES))

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


_backlink_to_lesson = link_to_field('lesson')


def popup_question(name):
    def iframe(obj):
        return '<a href="javascript:window.open(\'{}\',\'{}\',\'width=1280,height=800\')">Question</a>'.format(obj.get_admin_url(), str(obj))
    iframe.allow_tags = True
    iframe.short_description = name
    return iframe


_popup_to_question = popup_question('Question')


def toggle_answers_list(name):
    def link(obj):
        return '<a id="question-id-{}" data-qs-id="{}" data-qs-url="{}"' \
               ' href="javascript:showQuestionIframe({}, \'{}\');">Toggle answer details</a>' \
               .format(obj.pk, obj.pk, obj.get_admin_url(), obj.pk, obj.get_admin_url())
    link.allow_tags = True
    link.short_description = name
    return link


_iframe_answers_list = toggle_answers_list('Answers')


class QuestionInline(NestedTabularInline):

    model = Question
    extra = 0
    sortable_field_name = "position"
    readonly_fields = [_popup_to_question, _iframe_answers_list]

    class Media:
        js = ("curricula/admin/js/question_inline.js",)
        css = {
             'all': ("curricula/admin/css/custom_admin.css",)
        }

    fields = [
        _popup_to_question, 'text', 'hint', 'image', 'answer_type', _iframe_answers_list, 'position',
        # 'question_type', 'published_on', 'position'
    ]


class LessonAdmin(NestedModelAdmin):

    form = LessonForm
    inlines = [QuestionInline, ]
    fields = [
        'module', _backlink_to_module, 'name', 'image', 'lesson_type', # 'published_on', 'position',
    ]
    readonly_fields = [_backlink_to_module] # , 'position'

    def get_fields(self, request, obj=None):
        extra_fields = []
        if obj and obj.lesson_type == Lesson.LessonType.GAME:
            extra_fields.append('game_slug')
        return self.fields + extra_fields


_backlink_to_lesson = link_to_field('lesson')


class QuestionAdmin(NestedModelAdmin):

    class Media:
        js = ("curricula/admin/js/question_admin.js",)

    inlines = [
        VectorQuestionsInline, VectorAnswerInline,
        MathematicalExpressionAnswerInline, UnitConversionAnswerInline, ImageWTextAnswerInline
    ]
    fields = [
        'lesson', _backlink_to_lesson, 'text',
        'hint', 'image', 'answer_type'  # 'question_type', 'published_on','position'
    ]
    readonly_fields = [_backlink_to_lesson]  # , 'position'
    inline_map = {
        Question.AnswerType.VECTOR: [VectorAnswerInline],
        Question.AnswerType.NULLABLE_VECTOR: [VectorAnswerInline],
        Question.AnswerType.MATHEMATICAL_EXPRESSION: [MathematicalExpressionAnswerInline],
        Question.AnswerType.VECTOR_COMPONENTS: [VectorAnswerInline, VectorQuestionsInline],
        Question.AnswerType.UNIT_CONVERSION: [UnitConversionAnswerInline],
        # Question.AnswerType.IMAGE_WITH_TEXT: [ImageWTextAnswerInline]
        # Question.AnswerType.SINGLE_ANSWER: [ImageWTextAnswerInline],
        Question.AnswerType.MULTIPLE_CHOICE: [ImageWTextAnswerInline],
        Question.AnswerType.MULTISELECT_CHOICE: [ImageWTextAnswerInline]
    }

    def response_change(self, request, obj):
        if "_continue" in request.POST:
            from urllib import parse
            request.path += '?' + parse.urlencode(request.GET)
        return super(QuestionAdmin, self).response_change(request, obj)

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

    def _create_formsets(self, request, obj, change):
        formsets, inline_instances = super(QuestionAdmin, self)._create_formsets(request, obj, change)

        if request.method == 'POST':
            if obj.answer_type == 100:  # multiple choice
                count_of_answers = 0
                if len(formsets) > 0:
                    if hasattr(formsets[0], 'cleaned_data'):
                        for cleaned_data_formset in formsets[0].cleaned_data:
                            if 'is_correct' in cleaned_data_formset and cleaned_data_formset['is_correct'] and not cleaned_data_formset['DELETE']:
                                count_of_answers += 1

                    if count_of_answers != 1:
                        formsets[0]._non_form_errors = ("This question type allows only one correct answer")

        return formsets, inline_instances


admin.site.register(Curriculum, CurriculumAdmin)
admin.site.register(Unit, UnitAdmin)
admin.site.register(Module, ModuleAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Question, QuestionAdmin)
