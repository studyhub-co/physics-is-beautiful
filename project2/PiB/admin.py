from django.contrib import admin
import nested_admin
from .models import Curriculum, Unit, Module, Lesson, Question, DrawVector, Choice


class ChoiceInLine(nested_admin.NestedTabularInline):
    model = Choice
    sortable_field_name = 'position'
    extra = 0
    classes = ['collapse']


class DrawVectorInLine(nested_admin.NestedTabularInline):
    model = DrawVector
    sortable_field_name = 'position'
    extra = 0
    classes = ['collapse']


class QuestionInLine(nested_admin.NestedTabularInline):
    model = Question
    sortable_field_name = 'position'
    inlines = [ChoiceInLine]
    extra = 0
    classes = ['collapse']


class LessonAdmin(nested_admin.NestedModelAdmin):
    inlines = [QuestionInLine, DrawVectorInLine]
    extra = 0


admin.site.register(Lesson, LessonAdmin)
admin.site.register(Module)
admin.site.register(Unit)
admin.site.register(Curriculum)
