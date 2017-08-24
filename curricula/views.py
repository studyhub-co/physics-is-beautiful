from django.views import generic
from django.http import HttpResponse
from .models import Unit, Module, Lesson, Question
import re
import math
from sympy import simplify, trigsimp
from piblib.latex2sympy.process_latex import process_sympy


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

def ProcessMath(request):
    submittedState = request.POST
    return HttpResponse(submittedState['mathquillBox11'])
