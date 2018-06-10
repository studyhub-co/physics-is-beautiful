from rest_framework import permissions

from curricula.models import Curriculum, Unit, Module, Lesson, Question


class IsOwnerBase(permissions.BasePermission):
    owner_field = 'author'

    parent_model = None
    
    def __init__(self):
        self._owner_field_path = self.owner_field.split('.')

    def _get_owner(self, obj, path=None):
        o = obj
        for f in path or self._owner_field_path:
            o = getattr(o, f)
        return o
        
    def has_permission(self, request, view):
        if self.parent_model and request.method in ('POST', 'PUT' , 'PATCH') and self._owner_field_path[0] in request.data:
            parent_obj = self.parent_model.objects.get(uuid=request.data[self._owner_field_path[0]])
            return request.user == self._get_owner(parent_obj, self._owner_field_path[1:])
        return True

    def has_object_permission(self, request, view, obj):
        return request.user == self._get_owner(obj)
        
class IsUnitOwner(IsOwnerBase):
    owner_field = 'curriculum.author'
    parent_model = Curriculum

class IsModuleOwner(IsOwnerBase):
    owner_field = 'unit.curriculum.author'
    parent_model = Unit

class IsLessonOwner(IsOwnerBase):
    owner_field = 'module.unit.curriculum.author'
    parent_model = Module


class IsQuestionOwner(IsOwnerBase):
    owner_field = 'lesson.module.unit.curriculum.author'
    parent_model = Lesson

class IsAnswerOwner(IsOwnerBase):
    owner_field = 'question.lesson.module.unit.curriculum.author'
    parent_model = Question
