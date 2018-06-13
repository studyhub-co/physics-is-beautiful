from rest_framework import permissions

from curricula.models import Curriculum, Unit, Module, Lesson, Question


class IsOwnerOrCollaboratorBase(permissions.BasePermission):
    root_path = None
    owner_field = 'author'
    collaborators_field = 'collaborators'

    parent_model = None
    
    def __init__(self):
        self._root_path = self.root_path.split('.') if self.root_path else []

    def _is_owner_or_collaborator(self, user, obj, path=None):
        o = obj
        for f in path or self._root_path:
            o = getattr(o, f)
        return  getattr(o, self.owner_field) == user or getattr(o, self.collaborators_field).filter(id=user.id).exists()
        
    def has_permission(self, request, view):
        if self.parent_model and request.method in ('POST', 'PUT' , 'PATCH') and self._root_path[0] in request.data:
            parent_obj = self.parent_model.objects.get(uuid=request.data[self._root_path[0]])
            return self._is_owner_or_collaborator(request.user, parent_obj, self._root_path[1:])
        return True

    def has_object_permission(self, request, view, obj):
        return self._is_owner_or_collaborator(request.user, obj)
        
class IsUnitOwnerOrCollaborator(IsOwnerOrCollaboratorBase):
    root_path = 'curriculum'
    owner_field = 'author'
    collaborators_field = 'collaborators'
    parent_model = Curriculum

class IsModuleOwnerOrCollaborator(IsOwnerOrCollaboratorBase):
    root_path = 'unit.curriculum'
    owner_field = 'author'
    collaborators_field = 'collaborators'
    parent_model = Unit

class IsLessonOwnerOrCollaborator(IsOwnerOrCollaboratorBase):
    root_path = 'module.unit.curriculum'
    owner_field = 'author'
    collaborators_field = 'collaborators'
    parent_model = Module


class IsQuestionOwnerOrCollaborator(IsOwnerOrCollaboratorBase):
    root_path = 'lesson.module.unit.curriculum'
    owner_field = 'author'
    collaborators_field = 'collaborators'
    parent_model = Lesson

class IsAnswerOwnerOrCollaborator(IsOwnerOrCollaboratorBase):
    root_path = 'question.lesson.module.unit.curriculum'
    owner_field = 'author'
    collaborators_field = 'collaborators'
    parent_model = Question
