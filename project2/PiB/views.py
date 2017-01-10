from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic
from .models import Curriculum, Unit, Module, Lesson, Question, DrawVector, Choice

class Curriculum(generic.ListView):
    model = Unit
    template_name = 'PiB/Curriculum.html'
    context_object_name = 'unit_list'


class ModulePage(generic.DetailView):
    model = Module
    template_name = 'PiB/ModulePage.html'


class LessonPage(generic.DetailView):
    model = Lesson
    template_name = 'PiB/LessonPage.html'


class MultipleChoice(generic.DetailView):
    model = Question
    template_name = 'PiB/problemTemplates/MultipleChoice.html'


class DrawVector(generic.DetailView):
    model = DrawVector
    template_name = 'PiB/problemTemplates/DrawVector.html'