from django.core.exceptions import ObjectDoesNotExist

from rest_framework import permissions, status, mixins, viewsets
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound

from courses.models import MaterialProblemTypeSandboxModule, MaterialProblemType, MaterialProblemTypeSandboxDirectory

from ..serializers import MaterialProblemTypeSandboxModuleSerializer


# sandbox modules API
class MaterialTypeModulesViewSet(mixins.RetrieveModelMixin,
                                 mixins.UpdateModelMixin,
                                 mixins.DestroyModelMixin,
                                 mixins.CreateModelMixin,
                                 mixins.ListModelMixin,
                                 viewsets.GenericViewSet):
    """
    sandbox server side implementation for modules
    /api/v1/sandboxes/06zqu/modules/5QyoA ==> /api/v1/material-problem-type/06zqu/modules/5QyoA
                      ^^^^^ material-problem-type id                                      ^^^^^ module id
    """
    # permission_classes = (permissions.IsAuthenticated, IsLessonOwnerOrCollaborator) TODO
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = MaterialProblemTypeSandboxModuleSerializer
    # queryset = MaterialProblemTypeSandboxModule.objects.all()
    lookup_field = 'shortid'

    def get_queryset(self):
        try:
            material_problem_type = MaterialProblemType.objects.get(uuid=self.kwargs['material_problem_type_uuid'])
        except MaterialProblemType.DoesNotExist:
            raise NotFound('material_problem_type not found')
        return MaterialProblemTypeSandboxModule.objects.filter(sandbox=material_problem_type)

    def create(self, request, *args, **kwargs):
        try:
            mpt_directory = MaterialProblemTypeSandboxDirectory.objects.get(
                shortid=request.data['directory_shortid'],
                sandbox__uuid=self.kwargs['material_problem_type_uuid']
            )
        except (MaterialProblemTypeSandboxDirectory.DoesNotExist, KeyError):
            mpt_directory = None

        request.data['sandbox'] = self.kwargs['material_problem_type_uuid']
        request.data['code'] = ''
        request.data['directory'] = mpt_directory.uuid

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
