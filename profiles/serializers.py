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


class SignUpSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = UserModel.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        return user

    class Meta:
        model = UserModel
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        write_only_fields = ('password',)
        read_only_fields = ('id',)
