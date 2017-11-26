from django.views import generic
from .models import Unit, Module, Lesson, Question


class CurriculumView(generic.ListView):
    model = Unit
    template_name = 'curricula/curriculum.html'
    context_object_name = 'unit_list'


class ModulePageView(generic.DetailView):
    model = Module
    template_name = 'curricula/module_page.html'


class LessonPageView(generic.DetailView):
    model = Lesson
    template_name = 'curricula/lesson_page.html'


class QuestionView(generic.DetailView):
    model = Question
    template_name = 'curricula/problem_templates/question.html'

