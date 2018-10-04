from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import ParseError


from .models import Profile
from .serializers import ProfileSerializer


class ProfileViewSet(ModelViewSet):

    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = []

    def get_object(self):
        if self.request.user.is_authenticated():
            return self.request.user.profile
        return self.request.user


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def find_user(request):
    # find user by public user_name or public display_name
    query_string = request.query_params.get('q', '')

    if not query_string:
        raise ParseError('Please provide query string')

    if query_string.startswith('user'):
        qs = Profile.objects.filter(user__id=query_string.replace('user', ''))
    else:
        # qs = Profile.objects.filter(user__display_name__icontains=query_string)
        qs = Profile.objects.filter(user__display_name__startswith=query_string)

    paginator = PageNumberPagination()
    paginator.page_size = 50
    result_page = paginator.paginate_queryset(qs, request)
    serializer = ProfileSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)
