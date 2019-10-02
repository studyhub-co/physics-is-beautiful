from rest_framework import permissions

from courses.models import Course, Unit, Module, Lesson, Material


class IsOwnerOrCollaboratorBase(permissions.BasePermission):
    root_path = None
    owner_field = 'author'
    collaborators_field = 'collaborators'

    parent_model = None
    
    def __init__(self):
        self._root_path = self.root_path.split('.') if self.root_path else []

    def _is_owner_or_collaborator(self, user, obj, path=None):
        if not hasattr(user, 'profile'):
            # user has no profile data
            return False

        o = obj
        for f in path if path is not None else self._root_path:
            o = getattr(o, f)
        return getattr(o, self.owner_field) == user.profile or getattr(o, self.collaborators_field).filter(user__id=user.profile.id).exists()
        
    def has_permission(self, request, view):
        if self.parent_model and request.method in ('POST', 'PUT', 'PATCH') and self._root_path[0] in request.data:
            parent_obj = self.parent_model.objects.get(uuid=request.data[self._root_path[0]])
            return self._is_owner_or_collaborator(request.user, parent_obj, self._root_path[1:])
        return True

    def has_object_permission(self, request, view, obj):
        return self._is_owner_or_collaborator(request.user, obj)


class IsUnitOwnerOrCollaborator(IsOwnerOrCollaboratorBase):
    root_path = 'course'
    owner_field = 'author'
    collaborators_field = 'collaborators'
    parent_model = Course


class IsModuleOwnerOrCollaborator(IsOwnerOrCollaboratorBase):
    root_path = 'unit.course'
    owner_field = 'author'
    collaborators_field = 'collaborators'
    parent_model = Unit


class IsLessonOwnerOrCollaborator(IsOwnerOrCollaboratorBase):
    root_path = 'module.unit.course'
    owner_field = 'author'
    collaborators_field = 'collaborators'
    parent_model = Module


class IsQuestionOwnerOrCollaborator(IsOwnerOrCollaboratorBase):
    root_path = 'lesson.module.unit.course'
    owner_field = 'author'
    collaborators_field = 'collaborators'
    parent_model = Lesson


class IsAnswerOwnerOrCollaborator(IsOwnerOrCollaboratorBase):
    root_path = 'question.lesson.module.unit.course'
    owner_field = 'author'
    collaborators_field = 'collaborators'
    parent_model = Material
