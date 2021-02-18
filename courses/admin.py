from django import forms
from django.contrib import admin
from django.utils.html import escape, format_html
from django.utils.safestring import mark_safe

from nested_admin import NestedTabularInline, NestedModelAdmin

from .widgets import UnitNameWidget, MathQuillUnitConversionWidget, ConversionStepsJSONWidget, \
    MathConversionWidget

from .models import (
    Course, Unit, Module, Lesson, Material, MySQL, MaterialProblemType
)

from pint import UnitRegistry

admin.AdminSite.site_header = 'Physics is Beautiful Admin'
admin.AdminSite.site_title = admin.AdminSite.site_header


@mark_safe
def link_to_obj(name):
    def link(obj):
        return format_html('<a href="{}">{}</a>', obj.get_admin_url(), str(obj))
    link.short_description = name
    return link


@mark_safe
def link_to_field(field_name):
    def link(obj):
        field = getattr(obj, field_name)
        return format_html('<a href="{}">{}</a>', field.get_admin_url(), escape(field))
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
             'all': ("courses/admin/css/custom_admin.css",)
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
             'all': ("courses/admin/css/custom_admin.css",)
        }


_link_to_lesson = link_to_obj('Lesson')


class LessonInline(NestedTabularInline):
    model = Lesson
    sortable_field_name = 'position'
    extra = 0
    # classes = ['collapse']
    classes = []
    fields = [_link_to_lesson, 'name', 'image', 'position', 'published_on']  # 'published_on', 'lesson_type',
    readonly_fields = [_link_to_lesson]

    class Media:
        css = {
             'all': ("courses/admin/css/custom_admin.css",)
        }

# class MySQLAnswerForm(SpecialAnswerFormMixin, forms.ModelForm):
#
#     FIELDS = ['']
#     SPECIAL_MODEL = MySQL
#
#     class Meta:
#         model = Answer
#         fields = ['text', 'is_correct', 'schema_SQL', 'query_SQL']  # 'position'
#
#     text = forms.CharField(required=True)  # expected_output
#     schema_SQL = forms.CharField(required=True)
#     query_SQL = forms.CharField(required=True)


class CourseAdmin(NestedModelAdmin):
    inlines = [UnitInline]
    exclude = ['published_on']
    autocomplete_fields = ['collaborators', 'author', 'last_edit_user']


_backlink_to_course = link_to_field('course')


class UnitAdmin(NestedModelAdmin):

    inlines = [ModuleInline]
    fields = ['course', _backlink_to_course, 'name', 'image', ]  # 'published_on', 'position'
    readonly_fields = [_backlink_to_course] #, 'position'


_backlink_to_unit = link_to_field('unit')


class ModuleAdmin(NestedModelAdmin):

    inlines = [LessonInline]
    fields = ['unit', _backlink_to_unit, 'name', 'image']  # 'published_on', 'position'
    readonly_fields = [_backlink_to_unit] #, 'position'


_backlink_to_module = link_to_field('module')


# GAME_CHOICES = [
#     ('unit-conversion', 'Unit conversion'),
#     ('vector-game', 'Vector game')
# ]


class LessonForm(forms.ModelForm):

    class Meta:
        model = Lesson
        fields = [
            'module', 'name', 'image',
        ]

    # game_slug = forms.CharField(required=False, widget=forms.Select(choices=GAME_CHOICES))

    # def __init__(self, *args, **kwargs):
    #     super(LessonForm, self).__init__(*args, **kwargs)
    #     if hasattr(self.instance, 'game'):
    #         self.initial['game_slug'] = self.instance.game.slug
    #
    # def save(self, commit=True):
    #     instance = super(LessonForm, self).save(commit)
    #     if 'game_slug' in self.cleaned_data and self.cleaned_data['game_slug']:
    #         instance.game.slug = self.cleaned_data['game_slug']
    #         instance.game.save()
    #     return instance


_backlink_to_lesson = link_to_field('lesson')


@mark_safe
def popup_material(name):
    def iframe(obj):
        alink = '<a href="javascript:window.open(\'{}\',\'{}\',\'width=1280,height=800\')">material</a>'. \
            format(obj.get_admin_url(), 'Material')
            # format(obj.get_admin_url(), str(obj))
        return alink
    # iframe.allow_tags = True
    iframe.short_description = name
    return iframe


_popup_to_material = popup_material('material')


class MaterialInline(NestedTabularInline):

    model = Material
    extra = 0
    sortable_field_name = "position"
    readonly_fields = [_popup_to_material]

    class Media:
        js = ("courses/admin/js/material_inline.js",)
        css = {
             'all': ("courses/admin/css/custom_admin.css",)
        }

    fields = [
        _popup_to_material, 'position', 'name', 'material_problem_type',
        #'text', 'hint', 'image', 'answer_type', 'position',
        # 'published_on', 'position', 'name'
    ]


class LessonAdmin(NestedModelAdmin):

    form = LessonForm
    # TODO fix and enable MaterialInline
    inlines = [MaterialInline, ]
    fields = [
        'module', _backlink_to_module, 'name', 'image', 'published_on', 'position',  # 'lesson_type'
    ]
    readonly_fields = [_backlink_to_module] # , 'position'

    # def get_fields(self, request, obj=None):
    #     extra_fields = []
    #     if obj and obj.lesson_type == Lesson.LessonType.GAME:
    #         extra_fields.append('game_slug')
    #     return self.fields + extra_fields


_backlink_to_lesson = link_to_field('lesson')


class MaterialAdmin(NestedModelAdmin):

    class Media:
        js = ("courses/admin/js/material_admin.js",)

    inlines = [
        # VectormaterialsInline, VectorAnswerInline,
        # MathematicalExpressionAnswerInline, UnitConversionAnswerInline, ImageWTextAnswerInline, TextAnswerInline
    ]
    fields = [
        'lesson', _backlink_to_lesson, 'material_workflow_type', 'material_problem_type',
        'position', 'data', 'author', 'name'
    ]
    autocomplete_fields = ['author', 'material_problem_type']
    readonly_fields = [_backlink_to_lesson]  # , 'position'
    inline_map = {
        # material.AnswerType.VECTOR: [VectorAnswerInline],
        # material.AnswerType.NULLABLE_VECTOR: [VectorAnswerInline],
        # material.AnswerType.MATHEMATICAL_EXPRESSION: [MathematicalExpressionAnswerInline],
        # material.AnswerType.VECTOR_COMPONENTS: [VectorAnswerInline, VectormaterialsInline],
        # material.AnswerType.UNIT_CONVERSION: [UnitConversionAnswerInline],
        # # material.AnswerType.IMAGE_WITH_TEXT: [ImageWTextAnswerInline]
        # # material.AnswerType.SINGLE_ANSWER: [ImageWTextAnswerInline],
        # material.AnswerType.MULTIPLE_CHOICE: [ImageWTextAnswerInline],
        # material.AnswerType.MULTISELECT_CHOICE: [ImageWTextAnswerInline],
        # material.AnswerType.TEXT: [TextAnswerInline],
        # material.AnswerType.MYSQL: [MySQLAnswerInline]
    }

    # def response_change(self, request, obj):
    #     if "_continue" in request.POST:
    #         from urllib import parse
    #         request.path += '?' + parse.urlencode(request.GET)
    #     return super(MaterialAdmin, self).response_change(request, obj)
    #
    # def get_inline_instances(self, request, obj=None):
    #     inline_classes = []
    #     if obj:
    #         db_instance = obj.instance_from_db()
    #         if db_instance.answer_type == obj.answer_type:
    #             inlines = self.inline_map.get(obj.answer_type, [])
    #             for inline in inlines:
    #                 if inline and inline not in inline_classes:
    #                     inline_classes.append(inline)
    #     return filter(
    #         lambda i: inline_classes and isinstance(i, tuple(inline_classes)),
    #         super(MaterialAdmin, self).get_inline_instances(request)
    #     )
    #
    # def get_formsets(self, request, obj=None):
    #     for inline in self.get_inline_instances(request, obj):
    #         yield inline.get_formset(request, obj)
    #
    # def _create_formsets(self, request, obj, change):
    #     formsets, inline_instances = super(MaterialAdmin, self)._create_formsets(request, obj, change)
    #
    #     if request.method == 'POST':
    #         if obj.answer_type == 100:  # multiple choice
    #             count_of_answers = 0
    #             if len(formsets) > 0:
    #                 if hasattr(formsets[0], 'cleaned_data'):
    #                     for cleaned_data_formset in formsets[0].cleaned_data:
    #                         if 'is_correct' in cleaned_data_formset and cleaned_data_formset['is_correct'] and not cleaned_data_formset['DELETE']:
    #                             count_of_answers += 1
    #
    #                 if count_of_answers != 1:
    #                     formsets[0]._non_form_errors = ("This material type allows only one correct answer")
    #
    #     return formsets, inline_instances


# class ModuleAdmin(NestedModelAdmin):
#
#     inlines = [LessonInline]
#     fields = ['unit', _backlink_to_material, 'name', 'image']  # 'published_on', 'position'
#     readonly_fields = [_backlink_to_material]
#
#
# _backlink_to_material = link_to_field('material')

class MaterialProblemTypeAdmin(admin.ModelAdmin):
    search_fields = ['name']
    autocomplete_fields = ['author', 'last_edit_user']


admin.site.register(Course, CourseAdmin)
admin.site.register(Unit, UnitAdmin)
admin.site.register(Module, ModuleAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Material, MaterialAdmin)
admin.site.register(MaterialProblemType, MaterialProblemTypeAdmin)

