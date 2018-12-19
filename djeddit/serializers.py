from django.db import transaction

from django.core.files.storage import get_storage_class

from rest_framework import serializers

from  profiles.serializers import PublicProfileSerializer

from .models import Thread, Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['content', 'created_by', 'created_on', 'modified_on']
        model = Post


class ThreadSerializer(serializers.ModelSerializer):
    posts_tree = serializers.SerializerMethodField()

    def get_posts_tree(self, obj):
        threads_list = obj.op.getSortedReplies()
        serializer = PostSerializer(threads_list, many=True)
        return serializer.data

    class Meta:
        model = Thread
        fields = ['title', 'slug', 'views', 'posts_tree']


