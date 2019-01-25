from django.db.models import F

from rest_framework import serializers

from .models import Resource, TextBookSolutionPDF, ResourceMetaData, TextBookChapter, TextBookProblem, TextBookSolution


class TextBookChapterSerializerFlat(serializers.ModelSerializer):

    def to_internal_value(self, data):
        if data['position'] == -1:
            try:
                last_position = TextBookChapter.objects.filter(
                    resource=self.instance.resource
                ).last().position + 1
            except TextBookChapter.DoesNotExist:
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
        fields = ['title', 'position', 'id']


class TextBookProblemSerializerFlat(serializers.ModelSerializer):
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

    class Meta:
        model = TextBookProblem
        fields = ['title', 'position', 'uuid', 'textbook_section_id']
        extra_kwargs = {'position': {'required': False}}
