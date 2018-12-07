from django.db import transaction

from django.core.files.storage import get_storage_class

from rest_framework import serializers

from .models import Resource, TextBookSolutionPDF, ResourceMetaData, TextBookChapter, TextBookProblem, TextBookSolution

# from urllib.parse import urljoin
#
# from django.utils import timezone
# from django.conf import settings
# from django.urls import reverse
#
# from django.template import loader
#
# from django.core.mail import EmailMessage
#
# from django.contrib.sites.models import Site


class ResourceMetaDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = ResourceMetaData
        fields = ['data', ]


class TextBookSolutionPDFSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=False)

    class Meta:
        model = TextBookSolutionPDF
        fields = ['id', 'file']
        read_only_fields = ('file',)


class TextBookSolutionSerializer(serializers.ModelSerializer):
    pdf = TextBookSolutionPDFSerializer(many=False)

    class Meta:
        model = TextBookSolution
        fields = ['pdf', ]


class TextBookProblemSerializer(serializers.ModelSerializer):
    solutions = TextBookSolutionSerializer(many=True, required=False)

    class Meta:
        model = TextBookProblem
        fields = ['title', 'solutions']


class TextBookChapterSerializer(serializers.ModelSerializer):
    problems = TextBookProblemSerializer(many=True, required=False)

    class Meta:
        model = TextBookChapter
        fields = ['title', 'problems']


class ResourceBaseSerializer(serializers.ModelSerializer):

    metadata = ResourceMetaDataSerializer(many=False, required=False)
    sections = TextBookChapterSerializer(many=True)

    def create(self, validated_data):
        metadata_data = validated_data.pop('metadata')

        sections = validated_data.pop('sections')

        instance = super(ResourceBaseSerializer, self).create(validated_data)

        # TODO need to check that at least one solution exists
        if instance.resource_type == 'TB':
            # add TextBook Resource type sections

            sections_objects = []
            for i, section in enumerate(sections):
                sections_objects.append(
                    TextBookChapter(resource=instance, title=section['title'], position=i)
                )

            saved_sections = TextBookChapter.objects.bulk_create(sections_objects)

            for saved_section in saved_sections:
                section_data = sections[saved_section.position]
                if 'problems' in section_data:
                    problems_objects = []
                    for i, problem in enumerate(section_data['problems']):
                        problems_objects.append(
                            TextBookProblem(textbook_section=saved_section, title=problem['title'], position=i)
                        )
                    # save problems
                    saved_problems = TextBookProblem.objects.bulk_create(problems_objects)

                    for saved_problem in saved_problems:
                        problem_data = section_data['problems'][saved_problem.position]
                        if 'solutions' in problem_data:
                            solutions_objects = []
                            for y, solution in enumerate(problem_data['solutions']):
                                solutions_objects.append(
                                    TextBookSolution(pdf_id=solution['pdf']['id'],
                                                     position=y,
                                                     textbook_problem=saved_problem,
                                                     posted_by=validated_data['owner'])
                                )
                            # save solutions
                            TextBookSolution.objects.bulk_create(solutions_objects)

        ResourceMetaData.objects.create(resource=instance, **metadata_data)

        return instance

    class Meta:
        model = Resource
        fields = ['uuid', 'created_on', 'updated_on', 'resource_type', 'metadata', 'sections', 'count_views']
        read_only_fields = ('uuid',  'created_on', 'updated_on', 'count_views')


class ResourceListSerializer(ResourceBaseSerializer):
    # less_students = serializers.SerializerMethodField(read_only=True)
    #
    # def get_less_students(self, container):
    #     students = container.students.all()[:12]
    #     serializer = PublicProfileSerializer(instance=students, many=True)
    #     return serializer.data

    class Meta(ResourceBaseSerializer.Meta):
        fields = ['uuid', 'created_on', 'updated_on', 'resource_type', 'metadata', 'count_views']


class TextBookSolutionPDFSerializer(serializers.ModelSerializer):

    class Meta:
        model = TextBookSolutionPDF
        fields = '__all__'
        read_only_fields = ('created_on', )
