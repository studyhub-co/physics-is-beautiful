from rest_framework import serializers

from expander import ExpanderSerializerMixin

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
        instance.save()  # ??? Need to save serilizer, not instance / user can be removed from validated_data
        return instance

    def save(self):
        request = self.context['request']
        if request.user.is_authenticated():
            return super(ProfileSerializer, self).save()
        else:
            request.session['sound'] = self.validated_data['sound_enabled']
