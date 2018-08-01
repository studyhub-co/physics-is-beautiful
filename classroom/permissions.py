from rest_framework import permissions


class IsClassroomTeacherOrStudentReadonly(permissions.BasePermission):

    def has_permission(self, request, view):
        return True

    def _is_teacher_or_student(self, user, obj, safe):
        if user == obj.teacher.user or (obj.students.filter(user__pk=user.pk).count() > 0 or safe):
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        safe = False

        if request.method in permissions.SAFE_METHODS:
            safe = True

        return self._is_teacher_or_student(request.user, obj, safe)


