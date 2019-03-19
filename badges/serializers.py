from rest_framework import serializers

from .models import BadgeToUser


class BadgeToUserSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='badge.title')
    description = serializers.CharField(source='badge.description')
    level = serializers.CharField(source='badge.level')
    count = serializers.CharField(source='badge_count')

    class Meta:
        model = BadgeToUser
        fields = ['title', 'description', 'level', 'count']
