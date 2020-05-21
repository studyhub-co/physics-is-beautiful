from rest_framework import permissions, status, mixins, viewsets
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, ValidationError, APIException
from rest_framework.decorators import api_view, permission_classes

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


REGISTRY_URL = 'https://registry.npmjs.org/'


@api_view()
@permission_classes((permissions.AllowAny,))
def npm_dependencies(request, package):
    import requests
    # package == '@physicsisbeautiful/pib-eval-library@latest'
    # TODO add split validation
    [name, version] = package.rsplit('@', 1)
    if version != 'latest':
        raise ValidationError('only @latest version supports')
    r = requests.get('{}{}'.format(REGISTRY_URL, name))
    if r.status_code != 200:
        raise APIException('npmjs registry error')
    # TODO maybe betto to get from versions list?
    latest_version = r.json()['dist-tags']['latest']
    """https://registry.npmjs.org/@physicsisbeautiful/pib-eval-library """
    return Response({"data": {"version": "{}".format(latest_version)}})
