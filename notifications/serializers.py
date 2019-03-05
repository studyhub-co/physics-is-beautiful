from rest_framework import serializers

from django.contrib.auth import get_user_model

from profiles.serializers import PublicProfileSerializer
from .models import Notification

from djeddit.models import Thread, Post


class MiniThreadSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    def get_url(self, obj):
        return obj.relativeUrl

    class Meta:
        fields = ('title', 'url')
        model = Thread


class MiniPostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('uid',)
        model = Post


class NotificationActorRelatedField(serializers.RelatedField):
    """
    A custom field to use for the `actor` generic relationship.
    """

    def to_representation(self, value):
        if isinstance(value, get_user_model()):
            data = PublicProfileSerializer(value.profile).data
            data['content_type'] = 'profile'
            return data
        raise Exception('Unexpected type of tagged object')


class NotificationActionObjectRelatedField(serializers.RelatedField):
    """
    A custom field to use for the `actor` generic relationship.
    """
    def to_representation(self, value):
        if isinstance(value, Post):
            data = MiniPostSerializer(value).data
            data['content_type'] = 'post'
            return data
        # if isinstance(value, BaseItem):
        #     return MiniItemSerializer(value).data
        raise Exception('Unexpected type of action object')


class NotificationTargetRelatedField(serializers.RelatedField):
    """
    A custom field to use for the `target` generic relationship.
    """

    def to_representation(self, value):
        if isinstance(value, Thread):
            data = MiniThreadSerializer(value).data
            data['content_type'] = 'thread'
            return data
        raise Exception('Unexpected type of target object')


class NotificationSerializer(serializers.ModelSerializer):
    recipient = PublicProfileSerializer(source='recipient.profile', read_only=True)
    unread = serializers.BooleanField(read_only=True)
    target = NotificationTargetRelatedField(read_only=True)  # thread
    actor = NotificationActorRelatedField(read_only=True)  # sender
    action_object = NotificationActionObjectRelatedField(read_only=True)  # comment

    class Meta:
        # fields = ('recipient', 'slug', 'target', 'actor', 'unread', 'level', 'verb', 'action_object', 'timesince', 'description')
        fields = ('recipient', 'slug', 'actor', 'unread', 'level', 'verb', 'action_object', 'timesince', 'description', 'target')
        model = Notification
