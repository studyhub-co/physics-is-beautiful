from django.core.exceptions import ObjectDoesNotExist

from rest_framework import permissions, status, mixins, viewsets
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound

from courses.models import MaterialProblemTypeSandboxModule

from ..serializers import MaterialProblemTypeSandboxModuleSerializer


# sandbox modules API
class MaterialTypeModulesViewSet(mixins.RetrieveModelMixin,
                                 mixins.UpdateModelMixin,
                                 mixins.ListModelMixin,
                                 viewsets.GenericViewSet):
    # permission_classes = (permissions.IsAuthenticated, IsLessonOwnerOrCollaborator)
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = MaterialProblemTypeSandboxModuleSerializer
    queryset = MaterialProblemTypeSandboxModule.objects.all()
    lookup_field = 'shortid'
    # /api/v1/sandboxes/06zqu/modules/5QyoA ==> /api/v1/material-problem-type/06zqu/modules/5QyoA
    #                   ^^^^^ material-problem-type id                                      ^^^^^ module id
    # @action(methods=['PUT'],
    #         detail=True,
    #         permission_classes=[permissions.IsAuthenticated, ],  # TODO check onwer or SU
    #         url_path='modules/(?P<module_shortid>[^/.]+)'
    #         )
    # def module_update(self, request, *args, **kwargs):
    # def update(self, request, *args, **kwargs):
    #     material_problem_type = self.get_object()
    #     try:
    #         # we need to store shortid in model
    #         module = material_problem_type.modules.get(shortid=kwargs['module_shortid'])
    #     except ObjectDoesNotExist:
    #         raise NotFound('Module not found')
    #
    #     serializer = self.serializer(module, data=request.data.get('module'), partial=True)
    #
    #     if serializer.is_valid(raise_exception=True):
    #         serializer.save()
    #
    #     return Response(serializer.data)

    # @action(methods=['POST'],
    #         detail=True,
    #         permission_classes=[permissions.IsAuthenticated, ],  # TODO check onwer or SU
    #         url_path='modules/(?P<module_shortid>[^/.]+)'
    #         )
    # def module_create(self, request, *args, **kwargs):
    # def create(self, request, *args, **kwargs):
    #     material_problem_type = self.get_object()
    #     try:
    #         # we need to store shortid in model
    #         module = material_problem_type.modules.get(shortid=kwargs['module_shortid'])
    #     except ObjectDoesNotExist:
    #         raise NotFound('Module not found')
    #
    #     serializer = self.serializer_class_module(module, data=request.data.get('module'), partial=True)
    #
    #     if serializer.is_valid(raise_exception=True):
    #         serializer.save()
    #
    #     return Response(serializer.data)
