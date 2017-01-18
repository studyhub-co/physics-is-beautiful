from django.views import generic

from .models import Unit, Module, Lesson, Question, DrawVector


class CurriculumView(generic.ListView):
    model = Unit
    template_name = 'pib/Curriculum.html'
    context_object_name = 'unit_list'


class ModulePage(generic.DetailView):
    model = Module
    template_name = 'pib/ModulePage.html'


class LessonPage(generic.DetailView):
    model = Lesson
    template_name = 'pib/LessonPage.html'


class MultipleChoice(generic.DetailView):
    model = Question
    template_name = 'pib/problemTemplates/MultipleChoice.html'


class DrawVector(generic.DetailView):
    model = DrawVector
    template_name = 'pib/problemTemplates/DrawVector.html'
