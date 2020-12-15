from rest_framework import permissions, status, mixins, viewsets
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, ValidationError, APIException
from rest_framework.decorators import api_view, permission_classes

from courses.helpers.mysql_problem_type import validate_mysql_schema_query


@api_view(http_method_names=['POST'])
@permission_classes((permissions.AllowAny,))
def call(request):
    # validate mysql
    if 'type' in request.query_params and request.query_params['type'] == 'validate_mysql_schema_query':
        # rewrite \courses\helpers\mysql_problem_type.py without instance
        # Only check SQLschema and SQLquery if exist
        # return is_valid or not, if not valid -> save button should be disable
        # return SQLSchemaJson and expectedOutputJson
        result = validate_mysql_schema_query(request.data)
        return Response(result)
    else:
        raise NotFound
