from rest_framework import serializers

from .models import BadgeToUser, Badge


# class BadgeToUserSerializer(serializers.ModelSerializer):
#     title = serializers.CharField(source='badge.title')
#     description = serializers.CharField(source='badge.description')
#     level = serializers.CharField(source='badge.level')
#     count = serializers.CharField(source='badge_count')
#
#     class Meta:
#         model = BadgeToUser
#         fields = ['title', 'description', 'level', 'count', 'id']

class BadgeSerializer(serializers.ModelSerializer):
    count = serializers.CharField(source='badge_count')

    class Meta:
        model = Badge
        fields = ['title', 'description', 'level', 'count', 'id']
