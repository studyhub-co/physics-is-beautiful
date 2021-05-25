from django.db.models import F, Count

from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework import permissions, status, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import ParseError, NotFound
from rest_framework.response import Response

from badges.models import Badge
from badges.serializers import BadgeCountSerializer

from piblib.search_engines import is_search_engine_bot

from .models import Profile
from .serializers import ProfileSerializer, PublicProfileSerializer, LoginSerializer
from .permissions import EditDeleteByOwnerOrStaff


class ProfileViewSet(mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     GenericViewSet):
    lookup_field = 'user__id'
    # TODO add regex fo all drf viewsets
    lookup_value_regex = '\d+'
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, EditDeleteByOwnerOrStaff)  # users can upload solutions
    queryset = Profile.objects.filter(user__is_active=True)
    serializer_class = PublicProfileSerializer

    # def initialize_request(self, request, *args, **kwargs):
    #     # fix for user__id lookup_field
    #     if self.lookup_field in kwargs.keys():
    #         try:
    #             int(kwargs[self.lookup_field])
    #         except ValueError:
    #             raise ValidationError('id should be integer')
    #
    #     return super().initialize_request(request, *args, **kwargs)

    # @action(methods=['GET'], detail=False)
    # def me(self, request):
    #     if request.user.is_authenticated:
    #         return request.user.profile
    #     return request.user
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if not is_search_engine_bot(request):
            if instance.profile_views:
                instance.profile_views = F('profile_views')+1
            else:
                instance.profile_views = 1
            instance.save(update_fields=["profile_views"])
            instance.refresh_from_db()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    # show full serializer only for current user
    def get_serializer_class(self, *args, **kwargs):
        try:
            profile = self.queryset.get(**self.kwargs)
            # if profile.user == self.request.user or profile.user.is_staff:
            if profile.user == self.request.user:
                return ProfileSerializer
        except Profile.DoesNotExist:
            pass

        return self.serializer_class

    @action(methods=['GET'],
            detail=True,)
    def badges(self, request, user__id):
        # from badges.models import BadgeToUser
        # badges = BadgeToUser.objects.filter(user__id=user__id).\
        #     select_related('badge'). \
        #     annotate(badge_count=Count('badge__id'))
        # distinct('badge__id')
        badges = Badge.objects.filter(badgetouser__user=user__id).\
            annotate(badge_count=Count('badgetouser__user'))

        serializer = BadgeCountSerializer(badges, many=True)
        return Response(serializer.data)


class ProfileViewSetMe(ModelViewSet):

    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = []

    def get_object(self):
        if self.request.user.is_authenticated:
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
        qs = Profile.objects.filter(user__display_name__istartswith=query_string)

    paginator = PageNumberPagination()
    paginator.page_size = 50
    result_page = paginator.paginate_queryset(qs, request)
    serializer = ProfileSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

#  TODO may be it better to move ro pib_auth
from django.contrib.auth import logout as django_logout, login as django_login

from rest_framework.views import APIView

from django.contrib.auth import authenticate, login
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.debug import sensitive_post_parameters


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def logout(request):
    django_logout(request._request)

    # TODO make it reusable / see serializers.py:68
    data =  {'sound_enabled': request._request.session.get('sound', True),
            'is_anonymous': True}
    return Response(data=data, status=status.HTTP_200_OK)

from pib_auth.models import User


class Login(APIView):
    permission_classes = [permissions.AllowAny]

    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    # TODO why this is not working?
    # @method_decorator(sensitive_post_parameters('password'))
    def post(self, request, *args, **kwargs):
        credentials = LoginSerializer(data=request.data)

        if not credentials.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=credentials.validated_data[User.USERNAME_FIELD],
                            password=credentials.validated_data['password'])
        if user is not None:
          if user.is_active:
              login(request, user)
              data = ProfileSerializer(user.profile).data
          else:
              raise NotFound({"status" : "false", "reason" : "You need to activate your account. Please check your email"})
        else:
          raise NotFound({"status" : "false", "reason" : "Invalid username/password"})

        # response user profile?
        return Response(data=data, status=status.HTTP_200_OK)
