from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

from rest_framework import serializers

from .models import Profile


class BaseSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        super(BaseSerializer, self).__init__(*args, **kwargs)
        self.lookup_field = getattr(self.Meta, 'lookup_field', 'pk')

    def to_internal_value(self, data):
        if isinstance(data, str):
            return self.Meta.model.objects.get(**{self.lookup_field: data})
        else:
            return super(BaseSerializer, self).to_internal_value(data)


class ProfileUserField(serializers.RelatedField):
    def to_representation(self, value):
        return '%s %s' % (value.user.first_name, value.user.last_name)


class PublicProfileSerializer(BaseSerializer):
    display_name = serializers.CharField(source='user.display_name')
    username = serializers.CharField(source='user.username')
    avatar_url = serializers.CharField(source='get_avatar_url')
    id = serializers.IntegerField(source='user.id', read_only=True)  # (sic!) user_id != profile_id
    last_activity = serializers.DateTimeField(source='user.last_activity', read_only=True)

    class Meta:
        model = Profile
        fields = ['display_name', 'username', 'avatar_url', 'id', 'get_absolute_url',
                  'created_on', 'profile_views', 'last_activity']
        read_only_fields = ['avatar_url', 'get_absolute_url', 'created_on', 'profile_views']


class ProfileSerializer(BaseSerializer):
    # TODO set PublicProfileSerializer as base
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    display_name = serializers.CharField(source='user.display_name')
    is_staff = serializers.BooleanField(source='user.is_staff')
    avatar_url = serializers.CharField(source='get_avatar_url')
    id = serializers.IntegerField(source='user.id', read_only=True)  # (sic!) user_id != profile_id
    is_current_user_profile = serializers.SerializerMethodField()
    last_activity = serializers.DateTimeField(source='user.last_activity', read_only=True)
    # selected_avatar = serializers.CharField(source='get_selected_avatar_display')

    def get_is_current_user_profile(self, obj):
        if self.context and 'request' in self.context:
            if obj.user == self.context['request'].user:
                return True
        return False

    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'sound_enabled', 'display_name', 'id', 'get_absolute_url',
                  'gravatar_url', 'avatar_url', 'google_avatar_url', 'selected_avatar', 'user_avatar', 'is_staff',
                  'is_current_user_profile', 'created_on', 'profile_views', 'last_activity'
                  ]
        read_only_fields = ['get_absolute_url', 'created_on', 'profile_views']

    def to_representation(self, obj):
        if isinstance(obj, Profile):
            return super(ProfileSerializer, self).to_representation(obj)
        else:
            # TODO make it reusable / see apis.py:135
            return {'sound_enabled': self.context['request'].session.get('sound', True),
                    'is_anonymous': True}

    def update(self, instance, validated_data):
        user = validated_data.get('user')
        if user:
            if 'first_name' in user:
                instance.user.first_name = user['first_name']
            if 'last_name' in user:
                instance.user.last_name = user['last_name']
            if 'display_name' in user:
                instance.user.display_name = user['display_name']
            instance.user.save()
        if 'sound_enabled' in validated_data:
            instance.sound_enabled = validated_data['sound_enabled']
        if 'selected_avatar' in validated_data:
            instance.selected_avatar = validated_data['selected_avatar']
        instance.save()  # ??? Need to save serializer, not instance / user can be removed from validated_data
        return instance

    def save(self):
        request = self.context['request']
        if request.user.is_authenticated:
            return super(ProfileSerializer, self).save()
        else:
            request.session['sound'] = self.validated_data['sound_enabled']

#  TODO may be it better to move to pib_auth
from pib_auth.models import User

class LoginSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=User._meta.get_field('password').max_length)

    def get_fields(self):
        fields = super().get_fields()
        fields[User.USERNAME_FIELD] = serializers.EmailField(
            max_length=User._meta.get_field(User.USERNAME_FIELD).max_length
        )
        return fields

UserModel = get_user_model()

from django.core import exceptions
import django.contrib.auth.password_validation as validators

# dj-rest-auth version

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from allauth.utils import email_address_exists
from allauth.account import app_settings as allauth_settings

class SignUpSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    def validate(self, data):
        errors = dict()

        errors['password1'] = []

        if data['password1'] != data['password2']:
            errors['password1'].extend([_('Passwords are not equal')])

        try:
            validators.validate_password(password=data['password1'], user=User)

        except exceptions.ValidationError as e:
            errors['password1'].extend(list(e.messages))

        if len(errors['password1']) > 0:
            raise serializers.ValidationError(errors)

        return data

    def custom_signup(self, request, user):
        pass

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _('A user is already registered with this e-mail address.'),
                )
        return email

    def get_cleaned_data(self):
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user

    # def create(self, validated_data):
    #     user = UserModel.objects.create_user(
    #         email=validated_data['email'],
    #         password=validated_data['password'],
    #         first_name=validated_data['first_name'],
    #         last_name=validated_data['last_name'],
    #     )
    #
    #     user.is_active = False
    #     user.set_password(validated_data['password'])
    #     user.save()
    #
    #     return user

    # class Meta:
    #     model = UserModel
    #     fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name', 'password', 'password2')
    #     write_only_fields = ('password', 'password2')
    #     read_only_fields = ('id',)

# standalone (without drf-rest-auth) version
# class SignUpSerializer(serializers.ModelSerializer):
#     # password = serializers.CharField(write_only=True)
#     password2 = serializers.CharField(write_only=True)
#     # add name's custom fields, because it's required (but blank=True in model)
#     first_name = serializers.CharField()
#     last_name = serializers.CharField()
#
#     def validate(self, data):
#         errors = dict()
#
#         if data['password'] != data['password2']:
#             errors['password'] = ['Passwords are not equal']
#
#         try:
#             validators.validate_password(password=data['password'], user=User)
#
#         except exceptions.ValidationError as e:
#             errors['password'].extend(list(e.messages))
#
#         if errors:
#             raise serializers.ValidationError(errors)
#
#         return data
#
#     # def __init__(self, *args, **kwargs):
#     #     super(SignUpSerializer, self).__init__(*args, **kwargs)
#
#
#     def create(self, validated_data):
#         user = UserModel.objects.create_user(
#             email=validated_data['email'],
#             password=validated_data['password'],
#             first_name=validated_data['first_name'],
#             last_name=validated_data['last_name'],
#         )
#
#         user.is_active = False
#         user.set_password(validated_data['password'])
#         user.save()
#
#         return user
#
#     class Meta:
#         model = UserModel
#         fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name', 'password', 'password2')
#         write_only_fields = ('password', 'password2')
#         read_only_fields = ('id',)
