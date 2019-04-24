from django.db.models import F

from rest_framework import serializers

from .models import Resource, TextBookSolutionPDF, ResourceMetaData, TextBookChapter, ResourceProblem, TextBookSolution


class TextBookChapterSerializerFlat(serializers.ModelSerializer):
    resource_uuid = serializers.SlugRelatedField(queryset=Resource.objects.all(),
                                                 source='resource',
                                                 slug_field='uuid',
                                                 many=False,
                                                 write_only=True,
                                                 required=False  # we can set existing resource
                                                 )

    def to_internal_value(self, data):
        if not self.instance:
            if 'resource_uuid' not in data:
                raise serializers.ValidationError({
                    'resource_uuid': 'This field is required.'
                })
            resource_uuid = data['resource_uuid']
        else:
            resource_uuid = self.instance.resource.uuid

        if 'position' not in data:  # default last position
            last = TextBookChapter.objects.filter(
                resource__uuid=resource_uuid
            ).last()
            if last:
                last_position = last.position + 1
            else:
                last_position = 0
            data['position'] = last_position

        return super().to_internal_value(data)

    def update(self, instance, validated_data):
        if 'position' in validated_data and instance.position != validated_data['position']:
            TextBookChapter.objects.filter(position__gte=validated_data['position'],
                                           resource=validated_data.get('resource', instance.resource))\
                .update(position=F('position')+1)
        return super().update(instance, validated_data)

    class Meta:
        model = TextBookChapter
        fields = ['title', 'position', 'id', 'resource_uuid', 'show_ad']
        extra_kwargs = {'position': {'required': False}}


class ResourceProblemSerializerFlat(serializers.ModelSerializer):
    # FIXME need to think about adding uuid to textbook_section (chapter)
    # textbook_section_uuid = serializers.SlugRelatedField(queryset=TextBookChapter.objects.all(),
    #                                                      source='textbook_section',
    #                                                      slug_field='uuid',
    #                                                      many=False,
    #                                                      write_only=True,
    #                                                      required=False  # we can set existing
    #                                                      )
    textbook_section_id = serializers.PrimaryKeyRelatedField(queryset=TextBookChapter.objects.all(),
                                                             source='textbook_section',
                                                             many=False,
                                                             write_only=True,
                                                             required=False  # we can set existing
                                                             )

    def to_internal_value(self, data):
        if not self.instance:
            if 'textbook_section_id' not in data:
                raise serializers.ValidationError({
                    'textbook_section_id': 'This field is required.'
                })
            textbook_section_id = data['textbook_section_id']
        else:
            textbook_section_id = self.instance.textbook_section_id

        if 'position' not in data:  # default last position
            last = ResourceProblem.objects.filter(
                textbook_section_id=textbook_section_id
            ).last()
            if last:
                last_position = last.position + 1
            else:
                last_position = 0
            data['position'] = last_position

        return super().to_internal_value(data)

    def update(self, instance, validated_data):
        # refresh positions for problems gt than current
        if 'position' in validated_data and instance.position != validated_data['position']:
            ResourceProblem.objects.filter(position__gte=validated_data['position'],
                                           textbook_section=validated_data.get('textbook_section', instance.textbook_section))\
                .update(position=F('position')+1)
        return super().update(instance, validated_data)

    class Meta:
        model = ResourceProblem
        fields = ['title', 'position', 'uuid', 'textbook_section_id']
        extra_kwargs = {'position': {'required': False}}
