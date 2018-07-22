from rest_framework import permissions

from .models import Classroom, Assignment


class IsClassroomTeacherOrStudent(permissions.BasePermission):

    def has_permission(self, request, view):
        return True

    def _is_teacher_or_student(self, user, obj):
        if user == obj.teacher or user in obj.students.all():
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        return self._is_teacher_or_student(request.user, obj)


