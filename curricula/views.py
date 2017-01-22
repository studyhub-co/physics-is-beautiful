from django.views import generic
from django.contrib.auth.mixins import LoginRequiredMixin

from .models import Unit, Module, Lesson, Question, DrawVector


class CurriculumView(LoginRequiredMixin, generic.ListView):
    model = Unit
    template_name = 'curricula/curriculum.html'
    context_object_name = 'unit_list'


class ModulePageView(LoginRequiredMixin, generic.DetailView):
    model = Module
    template_name = 'curricula/module_page.html'


class LessonPageView(LoginRequiredMixin, generic.DetailView):
    model = Lesson
    template_name = 'curricula/lesson_page.html'


class MultipleChoiceView(LoginRequiredMixin, generic.DetailView):
    model = Question
    template_name = 'curricula/problem_templates/multiple_choice.html'


class DrawVectorView(LoginRequiredMixin, generic.DetailView):
    model = DrawVector
    template_name = 'curricula/problem_templates/draw_vector.html'
