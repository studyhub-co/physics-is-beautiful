from rest_framework import serializers
from rest_framework.viewsets import ModelViewSet

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


class ProfileSerializer(BaseSerializer):

    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'sound_enabled']

    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')

    def to_representation(self, obj):
        if isinstance(obj, Profile):
            return super(ProfileSerializer, self).to_representation(obj)
        else:
            return {'sound_enabled': self.context['request'].session.get('sound', True)}

    def update(self, instance, validated_data):
        user = validated_data.get('user')
        if user:
            if 'first_name' in user:
                instance.user.first_name = user['first_name']
            if 'last_name' in user:
                instance.user.last_name = user['last_name']
            instance.user.save()
        if 'sound_enabled' in validated_data:
            instance.sound_enabled = validated_data['sound_enabled']
        instance.save()
        return instance

    def save(self):
        request = self.context['request']
        if request.user.is_authenticated():
            return super(ProfileSerializer, self).save()
        else:
            request.session['sound'] = self.validated_data['sound_enabled']


class ProfileViewSet(ModelViewSet):

    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = []

    def get_object(self):
        if self.request.user.is_authenticated():
            return self.request.user.profile
        return self.request.user
