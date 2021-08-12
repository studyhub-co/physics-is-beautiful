from rest_framework import permissions, status, mixins, viewsets
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, ValidationError, APIException
from rest_framework.decorators import api_view, permission_classes, action

from courses.models import MaterialProblemTypeSandboxModule, MaterialProblemType, \
    MaterialProblemTypeSandboxDirectory

from ..serializers import MaterialProblemTypeSandboxModuleSerializer, MaterialProblemTypeSandboxDirectorySerializer

from ..permissions import IsMaterialProblemTypeAuthor


class GetMTPMixin:
    def get_material_problem_type(self):
        try:
            material_problem_type = MaterialProblemType.objects.get(
                uuid=self.kwargs['material_problem_type_uuid']
            )
        except MaterialProblemType.DoesNotExist:
            raise NotFound('material_problem_type not found')
        return material_problem_type


# sandbox modules API
class MaterialTypeModulesViewSet(mixins.RetrieveModelMixin,
                                 mixins.UpdateModelMixin,
                                 mixins.DestroyModelMixin,
                                 mixins.CreateModelMixin,
                                 mixins.ListModelMixin,
                                 viewsets.GenericViewSet,
                                 GetMTPMixin
                                 ):
    """
    sandbox server side implementation for modules
    /api/v1/material-problem-type/06zqu-06zqu-06zqu/modules/5QyoA
                                 ^^^^^ mpt id              ^^^^^ module short id
    """
    permission_classes = (permissions.IsAuthenticated, IsMaterialProblemTypeAuthor)
    serializer_class = MaterialProblemTypeSandboxModuleSerializer
    # queryset = MaterialProblemTypeSandboxModule.objects.all()
    lookup_field = 'shortid'

    def get_queryset(self):
        return MaterialProblemTypeSandboxModule.objects.filter(sandbox=self.get_material_problem_type())

    @action(methods=['POST'],
            detail=False,
            permission_classes=[IsMaterialProblemTypeAuthor, ], )
    def mcreate(self, request, *args, **kwargs):
        data = {'data' : {
            'directories':[],
            'modules': [], }
        }
        # mass create modules directories
        if 'directories' in request.data:
            for directory in request.data['directories']:
                # find exiting directory by short id
                try:
                    mpt_directory = MaterialProblemTypeSandboxDirectory.objects.get(
                        shortid=directory['shortid'],
                        sandbox__uuid=self.kwargs['material_problem_type_uuid']
                    )
                except (MaterialProblemTypeSandboxDirectory.DoesNotExist, KeyError):
                    mpt_directory = None

                if not mpt_directory:
                    # create directory if not exist

                    # find parent directory
                    directory['sandbox']=self.get_material_problem_type().uuid
                    try:
                        parent_dir = MaterialProblemTypeSandboxDirectory.objects.get(
                            shortid=directory['directory_shortid'],
                            sandbox__uuid=self.kwargs['material_problem_type_uuid']
                        )
                        directory['directory'] = parent_dir.uuid
                    except (MaterialProblemTypeSandboxDirectory.DoesNotExist, KeyError):
                        directory['directory'] = None

                    try:
                        directory['name'] = directory['title']
                    except KeyError:
                        directory['name'] = ''
                    serializer = MaterialProblemTypeSandboxDirectorySerializer(data=directory,
                                                                               context={'request': request})
                    serializer.is_valid(raise_exception=True)
                    self.perform_create(serializer)
                    data['data']['directories'].append(serializer.data)

        # mass create modules
        if 'modules' in request.data:
            for module in request.data['modules']:
                try:
                    parent_dir = MaterialProblemTypeSandboxDirectory.objects.get(
                        shortid=module['directory_shortid'],
                        sandbox__uuid=self.kwargs['material_problem_type_uuid']
                    )
                    module['directory'] = parent_dir.uuid
                except (MaterialProblemTypeSandboxDirectory.DoesNotExist, KeyError):
                    module['directory'] = None

                # create module
                module['sandbox']=self.get_material_problem_type().uuid

                try:
                    module['name'] = module['title']
                except KeyError:
                    module['name'] = ''
                serializer = self.get_serializer(data=module)
                serializer.is_valid(raise_exception=True)
                # TODO validate short id unique
                self.perform_create(serializer)
                data['data']['modules'].append(serializer.data)

        return Response(data, status=status.HTTP_201_CREATED)

    def create(self, request, *args, **kwargs):
        try:
            mpt_directory = MaterialProblemTypeSandboxDirectory.objects.get(
                shortid=request.data['directory_shortid'],
                sandbox__uuid=self.kwargs['material_problem_type_uuid']
            )
            request.data['directory'] = mpt_directory.uuid
        except (MaterialProblemTypeSandboxDirectory.DoesNotExist, KeyError):
            request.data['directory'] = None

        request.data['sandbox'] = self.kwargs['material_problem_type_uuid']
        request.data['code'] = ''

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class MaterialTypeDirectoriesViewSet(mixins.RetrieveModelMixin,
                                 mixins.UpdateModelMixin,
                                 mixins.DestroyModelMixin,
                                 mixins.CreateModelMixin,
                                 mixins.ListModelMixin,
                                 viewsets.GenericViewSet,
                                 GetMTPMixin):
    """
    sandbox server side implementation for modules
    /api/v1/material-problem-type/06zqu-06zqu-/directories/5QyoA
                                 ^^^^^ mpt full id       ^^^^^ directory short id
    """
    permission_classes = (permissions.IsAuthenticated, IsMaterialProblemTypeAuthor)
    serializer_class = MaterialProblemTypeSandboxDirectorySerializer
    # queryset = MaterialProblemTypeSandboxModule.objects.all()
    lookup_field = 'shortid'

    def get_queryset(self):
        return MaterialProblemTypeSandboxDirectory.objects.filter(sandbox=self.get_material_problem_type())

    def create(self, request, *args, **kwargs):
        # parent directory
        try:
            mpt_directory = MaterialProblemTypeSandboxDirectory.objects.get(
                shortid=request.data['directory_shortid'],
                sandbox__uuid=kwargs['material_problem_type_uuid']
            )
        except (MaterialProblemTypeSandboxDirectory.DoesNotExist, KeyError):
            mpt_directory = None

        request.data['sandbox'] = kwargs['material_problem_type_uuid']
        if mpt_directory:
            request.data['directory'] = mpt_directory.uuid

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        request.data['sandbox'] = kwargs['material_problem_type_uuid']
        try:
            request.data['name'] = request.data['title']
        except:
            pass
        return super().update(request, *args, **kwargs)


REGISTRY_URL = 'https://registry.npmjs.org/'


@api_view()
@permission_classes((permissions.AllowAny,))
def npm_dependencies(request, package):
    import requests
    # package == '@studyhub.co/eval@latest'
    # TODO add split validation
    [name, version] = package.rsplit('@', 1)
    if version != 'latest':
        raise ValidationError('only @latest version supports')
    r = requests.get('{}{}'.format(REGISTRY_URL, name))
    if r.status_code != 200:
        raise APIException('npmjs registry error')
    # TODO maybe better to get from versions list?
    latest_version = r.json()['dist-tags']['latest']
    """https://registry.npmjs.org/@studyhub.co/eval """
    return Response({"data": {"version": "{}".format(latest_version)}})
