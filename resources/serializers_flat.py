from rest_framework import serializers

from .models import Resource, TextBookSolutionPDF, ResourceMetaData, TextBookChapter, TextBookProblem, TextBookSolution


class TextBookChapterSerializerFlat(serializers.ModelSerializer):

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
