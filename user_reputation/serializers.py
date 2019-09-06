from rest_framework import serializers

from .models import ReputationAction

from curricula.models import Lesson, Module
from curricula.serializers import LessonSerializer, ModuleSerializer

from curricula.services import get_progress_service


class BaseObjectRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, Lesson):
            data = LessonSerializer(value).data
            data['content_type'] = 'lesson'
            return data
        elif isinstance(value, Module):
            progress_service = get_progress_service(self.context['request'])
            data = ModuleSerializer(value, context={'progress_service': progress_service}).data
            data['content_type'] = 'module'
            return data
        raise Exception('Unexpected type of reputation action object')


class ReputationActionSerializer(serializers.ModelSerializer):
    content_object = BaseObjectRelatedField(read_only=True)  # comment

    class Meta:
        model = ReputationAction
        fields = ['value', 'content_object', 'id']


