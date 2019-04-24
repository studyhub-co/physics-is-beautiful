from rest_framework import serializers

from profiles.serializers import PublicProfileSerializer

from .models import Resource, TextBookSolutionPDF, ResourceMetaData, TextBookChapter, ResourceProblem, TextBookSolution


class ResourceMetaDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = ResourceMetaData
        fields = ['data', ]


class TextBookSolutionPDFSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=False)

    class Meta:
        model = TextBookSolutionPDF
        fields = ['id', 'file', 'external_url']
        read_only_fields = ('file', 'external_url')


class TextBookSolutionSerializer(serializers.ModelSerializer):
    pdf = TextBookSolutionPDFSerializer(many=False,
                                        required=False  # we can set existing pdf solution
                                        )
    posted_by = PublicProfileSerializer(read_only=True)
    # title = serializers.SerializerMethodField()
    title = serializers.CharField(required=False)

    pdf_id = serializers.PrimaryKeyRelatedField(queryset=TextBookSolutionPDF.objects.all(),
                                                source='pdf',
                                                many=False,
                                                write_only=True,
                                                required=False  # we can set existing pdf solution
                                                )
    textbook_problem_uuid = serializers.SlugRelatedField(queryset=ResourceProblem.objects.all(),
                                                         source='textbook_problem',
                                                         slug_field='uuid',
                                                         many=False,
                                                         # write_only=True,
                                                         required=False  # we can set existing textbook_problem
                                                         )

    count_comments = serializers.SerializerMethodField()

    def get_count_comments(self, obj):
        count_comments = 0

        view_class_name = self.context['view'].__class__.__name__

        # do not run sql query is resource view
        if view_class_name == 'ResourceViewSet':
            return count_comments

        if hasattr(obj, 'thread') and obj.thread:
            count_comments = obj.thread.op.get_descendant_count()

        return count_comments

    # def get_title(self, obj):
    #     return obj.title

    class Meta:
        model = TextBookSolution
        fields = ['pdf', 'posted_by', 'id', 'position', 'title', 'created_on', 'uuid', 'vote_score', 'thread',
                  'textbook_problem_uuid', 'pdf_id', 'count_comments']
        read_only_fields = ('id', 'created_on', 'uuid', 'vote_score', 'pdf', 'thread')
        extra_kwargs = {'position': {'required': False}}
        # extra_kwargs = {'textbook_problem_uuid': {'write_only': True}, 'pdf_id': {'write_only': True}}


class FullResourceProblemSerializer(serializers.ModelSerializer):
    solutions = TextBookSolutionSerializer(many=True, required=False)
    # # textbook_section_uuid = serializers.SlugRelatedField(queryset=TextBookChapter.objects.all(),
    # #                                                      source='textbook_section',
    # #                                                      slug_field='uuid',
    # #                                                      many=False,
    # #                                                      write_only=True,
    # #                                                      required=False  # we can set existing
    # #                                                      )
    # textbook_section_id = serializers.PrimaryKeyRelatedField(queryset=TextBookChapter.objects.all(),
    #                                                          source='textbook_section',
    #                                                          many=False,
    #                                                          write_only=True,
    #                                                          required=False  # we can set existing
    #                                                          )

    class Meta:
        model = ResourceProblem
        fields = ['title', 'position', 'uuid', 'solutions', 'textbook_section_id']
        extra_kwargs = {'position': {'required': False}}


class ResourceProblemSerializer(serializers.ModelSerializer):
    solutions = TextBookSolutionSerializer(many=True, required=False)
    count_solutions = serializers.SerializerMethodField()
    resource_uuid = serializers.SerializerMethodField()

    def get_count_solutions(self, obj):
        return obj.count_solutions if hasattr(obj, 'count_solutions') else 0

    def get_resource_uuid(self, obj):
        return obj.textbook_section.resource.uuid  # TODO check optimization

    class Meta:
        model = ResourceProblem
        fields = ['title', 'solutions', 'position', 'uuid', 'count_solutions', 'resource_uuid', 'thread']
        read_only_fields = ['thread', ]


class TextBookChapterSerializer(serializers.ModelSerializer):
    problems = ResourceProblemSerializer(many=True, required=False)

    class Meta:
        model = TextBookChapter
        fields = ['title', 'problems', 'position', 'id', 'show_ad']


class ResourceBaseSerializer(serializers.ModelSerializer):

    metadata = ResourceMetaDataSerializer(many=False, required=False)
    sections = TextBookChapterSerializer(many=True)
    owner = PublicProfileSerializer(read_only=True)

    def create(self, validated_data):
        metadata_data = validated_data.pop('metadata')

        sections = validated_data.pop('sections')

        if metadata_data:
            try:
                validated_data['title'] = metadata_data['data']['volumeInfo']['title']
            except:
                pass

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
                            ResourceProblem(textbook_section=saved_section, title=problem['title'], position=i)
                        )
                    # save problems
                    saved_problems = ResourceProblem.objects.bulk_create(problems_objects)

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
        fields = ['uuid', 'created_on', 'updated_on', 'resource_type', 'metadata', 'sections', 'count_views', 'owner',
                  'thread']
        read_only_fields = ('uuid',  'created_on', 'updated_on', 'count_views', 'thread')


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
