from django.db import transaction

from django.core.files.storage import get_storage_class

from rest_framework import serializers

from profiles.serializers import PublicProfileSerializer

from .models import Thread, Post


class PostSerializer(serializers.ModelSerializer):
    created_by = PublicProfileSerializer(source='created_by.profile', read_only=True)

    class Meta:
        fields = ['uid', 'content', 'created_by', 'created_on', 'parent', 'modified_on', 'level', 'score']
        read_only_fields = ('level',)
        model = Post


class ThreadSerializer(serializers.ModelSerializer):
    posts_in_tree_order = serializers.SerializerMethodField()

    def get_posts_in_tree_order(self, obj):
        posts_list = obj.op.get_descendants(include_self=True).select_related('created_by__profile')
        # djeddit have one root post due 'op = models.ForeignKey('Post')' field
        serializer = PostSerializer(posts_list, many=True)
        return serializer.data

    class Meta:
        model = Thread
        fields = ['title', 'slug', 'views', 'posts_in_tree_order']


