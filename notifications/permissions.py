from rest_framework import permissions


class AccessByOwnerOrStaff(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True

        if request.method in ['PATCH', 'DELETE', 'PUT']:
            if request.user == obj.recipient:
                return True
            return False
        else:
            return True
