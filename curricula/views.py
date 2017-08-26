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
    mathquillBox11 = submittedState['mathquillBox11'].replace('\ ','').strip()
    mathquillBox21 = submittedState['mathquillBox21'].replace('\ ','').strip()
    print(mathquillBox11)
    if mathquillBox11=='':
        if mathquillBox21=='':
            first_column = ''
        else:
            first_column = '1/('+mathquillBox21+')'
    elif mathquillBox21=='':
        first_column = mathquillBox11
    else:
        first_column = mathquillBox11+'/('+mathquillBox21+')'
    mathquillBox11 = trigsimp(simplify(process_sympy(first_column).expand()))
    return HttpResponse(mathquillBox11)
