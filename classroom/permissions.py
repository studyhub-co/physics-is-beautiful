from rest_framework import permissions

from .models import Classroom, Assignment


class IsClassroomTeacherOrStudent(permissions.BasePermission):

    def has_permission(self, request, view):
        if self.parent_model and request.method in ('POST', 'PUT', 'PATCH') and self._root_path[0] in request.data:
            parent_obj = self.parent_model.objects.get(uuid=request.data[self._root_path[0]])
            return self._is_owner_or_collaborator(request.user, parent_obj, self._root_path[1:])
        return True

    def has_object_permission(self, request, view, obj):
        return self._is_owner_or_collaborator(request.user, obj)


