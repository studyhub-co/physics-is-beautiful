from rest_framework import permissions


class IsStaffOrReadOnly(permissions.BasePermission):
    """
    The request is authenticated as a user, or is a read-only request.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            if request.user.is_staff or request.user.is_superuser:
                return True
            else:
                return False
