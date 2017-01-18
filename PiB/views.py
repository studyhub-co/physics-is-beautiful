from django.views import generic

from .models import Unit, Module, Lesson, Question, DrawVector


class CurriculumView(generic.ListView):
    model = Unit
    template_name = 'pib/curriculum.html'
    context_object_name = 'unit_list'


class ModulePageView(generic.DetailView):
    model = Module
    template_name = 'pib/module_page.html'


class LessonPageView(generic.DetailView):
    model = Lesson
    template_name = 'pib/lesson_page.html'


class MultipleChoiceView(generic.DetailView):
    model = Question
    template_name = 'pib/problem_templates/multiple_choice.html'


class DrawVectorView(generic.DetailView):
    model = DrawVector
    template_name = 'pib/problem_templates/draw_vector.html'
