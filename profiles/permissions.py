from rest_framework import permissions


# class IsStaffOrReadOnly(permissions.BasePermission):
#     """
#     The request is authenticated as a user, or is a read-only request.
#     """
#
#     def has_permission(self, request, view):
#         if request.method in permissions.SAFE_METHODS:
#             return True
#         else:
#             if request.user.is_staff or request.user.is_superuser:
#                 return True
#             else:
#                 return False


class EditDeleteByOwnerOrStaff(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True

        if request.method in ['PATCH', 'DELETE', 'PUT']:
            if request.user.profile == obj:
                return True
            return False
        else:
            return True
