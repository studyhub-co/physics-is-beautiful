from django.db import transaction

from django.core.files.storage import get_storage_class

from rest_framework import serializers

from .models import Resource


from urllib.parse import urljoin

from django.utils import timezone
from django.conf import settings
from django.urls import reverse

from django.template import loader

from django.core.mail import EmailMessage

from django.contrib.sites.models import Site


class ResourceBaseSerializer(serializers.ModelSerializer):
    # count_students = serializers.IntegerField(read_only=True)
    # teacher = PublicProfileSerializer(read_only=True)
    # curriculum = CurriculumSerializer(read_only=True)
    # # curriculum = SimpleCurriculumSerializer(read_only=True)
    # curriculum_uuid = serializers.SlugRelatedField(queryset=Curriculum.objects.all(), source='curriculum',
    #                                                slug_field='uuid', write_only=True)
    #
    # external_classroom = ExternalClassroomSerializer(many=False, required=False)

    # def create(self, validated_data):
    #     external_classroom = None
    #     if 'external_classroom' in validated_data:
    #         external_classroom = validated_data.pop('external_classroom')
    #
    #     to_return = super(ClassroomBaseSerializer, self).create(validated_data)
    #
    #     if external_classroom:
    #         # save external data
    #         kwargs = external_classroom
    #         # if 'provider' in external_classroom:
    #         #     kwargs['provider'] = external_classroom.pop('provider')
    #         # external_id=external_classroom['external_id'],
    #         #                                              name=external_classroom['name'],
    #         #                                              teacher_id=external_classroom['teacher_id'],
    #         #                                              code=external_classroom['code'],
    #         try:
    #             ExternalClassroom.objects.create(classroom=to_return,
    #                                          **kwargs)
    #         except:  # TODO raise error message
    #             pass
    #     return to_return

    class Meta:
        model = Resource
        fields = ['uuid', 'created_on', 'updated_on', 'resource_type']
        read_only_fields = ('uuid',  'created_on', 'updated_on')


class ResourceListSerializer(ResourceBaseSerializer):
    # less_students = serializers.SerializerMethodField(read_only=True)
    #
    # def get_less_students(self, container):
    #     students = container.students.all()[:12]
    #     serializer = PublicProfileSerializer(instance=students, many=True)
    #     return serializer.data
    #
    # class Meta(ClassroomBaseSerializer.Meta):
    #     fields = ClassroomBaseSerializer.Meta.fields + ['less_students']
    pass
