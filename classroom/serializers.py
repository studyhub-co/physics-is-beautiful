from rest_framework import serializers
from rest_framework.fields import empty

from .models import Classroom, Assignment


class ClassroomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Classroom
        # list_serializer_class = DictSerializer
        fields = ['uuid', 'name', 'image', 'url', 'units']
        read_only_fields = ('uuid', 'units')
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
