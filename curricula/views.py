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
    mathquillBox11 = submittedState['mathquillBox11'].replace('\ ', '').strip()
    mathquillBox21 = submittedState['mathquillBox21'].replace('\ ', '').strip()
    mathquillBox12 = submittedState['mathquillBox12'].replace('\ ', '').strip()
    mathquillBox22 = submittedState['mathquillBox22'].replace('\ ', '').strip()
    mathquillBox13 = submittedState['mathquillBox13'].replace('\ ', '').strip()
    mathquillBox23 = submittedState['mathquillBox23'].replace('\ ', '').strip()
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

    if mathquillBox12=='':
        if mathquillBox22=='':
            second_column = ''
        else:
            second_column = '*1/('+mathquillBox22+')'
    elif mathquillBox22=='':
        second_column = '*' + mathquillBox12
    else:
        second_column = '*' + mathquillBox12+'/('+mathquillBox22+')'

    if mathquillBox13=='':
        if mathquillBox23=='':
            third_column = ''
        else:
            third_column = '*1/('+mathquillBox23+')'
    elif mathquillBox23=='':
        third_column = '*' + mathquillBox13
    else:
        third_column = '*' + mathquillBox13+'/('+mathquillBox23+')'
    all_columns = first_column+second_column+third_column
    all_columns_parsed = trigsimp(simplify(process_sympy(all_columns).expand()))
    return HttpResponse(all_columns_parsed)
