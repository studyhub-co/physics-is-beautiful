from rest_framework import serializers, exceptions

from profiles.serializers import PublicProfileSerializer

from .models import Resource, TextBookSolutionPDF, ResourceMetaData, TextBookChapter, ResourceProblem, \
    TextBookSolution, StandardizedTestResource


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
        if obj.textbook_section:
            return obj.textbook_section.resource.uuid  # TODO check optimization
        elif obj.resource:
            return obj.resource.uuid
        else:
            return None

    class Meta:
        model = ResourceProblem
        fields = ['title', 'solutions', 'position', 'uuid', 'count_solutions', 'resource_uuid', 'thread']
        read_only_fields = ['thread', ]


class TextBookChapterSerializer(serializers.ModelSerializer):
    problems = ResourceProblemSerializer(many=True, required=False)

    class Meta:
        model = TextBookChapter
        fields = ['title', 'problems', 'position', 'id', 'show_ad']


class StandardizedTestInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StandardizedTestResource
        fields = '__all__'
        read_only_fields = ['resource', ]


class ResourceBaseSerializer(serializers.ModelSerializer):

    metadata = ResourceMetaDataSerializer(many=False, required=False)
    standardized_test_info = StandardizedTestInfoSerializer(many=False, required=False)
    sections = TextBookChapterSerializer(many=True, required=False)
    problems = ResourceProblemSerializer(many=True, required=False)
    owner = PublicProfileSerializer(read_only=True)

    def save_problems(self, problems_list, textbook_section, resource, posted_by):
        problems_objects = []
        for i, problem in enumerate(problems_list):
            problems_objects.append(
                ResourceProblem(textbook_section=textbook_section,
                                title=problem['title'],
                                resource=resource,
                                position=i)
            )
        # save problems
        saved_problems = ResourceProblem.objects.bulk_create(problems_objects)

        for saved_problem in saved_problems:
            problem_data = problems_list[saved_problem.position]
            if 'solutions' in problem_data:
                solutions_objects = []
                for y, solution in enumerate(problem_data['solutions']):
                    solutions_objects.append(
                        TextBookSolution(pdf_id=solution['pdf']['id'],
                                         position=y,
                                         textbook_problem=saved_problem,
                                         posted_by=posted_by)
                    )
                # save solutions
                # TODO ignore_conflicts https://docs.djangoproject.com/en/2.2/ref/models/querysets/#bulk-create
                TextBookSolution.objects.bulk_create(solutions_objects)

    def check_solution_in_problems(self, problems_list):
        for problem in problems_list:
            if 'solutions' in problem and len(problem['solutions']) > 0:
                return True
        return False

    def create(self, validated_data):
        metadata_data = {}
        if 'metadata' in validated_data:
            metadata_data = validated_data.pop('metadata')
            try:
                validated_data['title'] = metadata_data['data']['volumeInfo']['title']
            except KeyError:
                validated_data['title'] = 'Unknown resource'

        if 'standardized_test_info' in validated_data:
            standardized_test_info = validated_data.pop('standardized_test_info')
            validated_data['title'] = 'Physics GRE {} - Test {}'\
                .format(standardized_test_info.get('test_year', ''), standardized_test_info.get('test_number', ''))

        sections = []
        if 'sections' in validated_data:
            sections = validated_data.pop('sections')

        problems = []
        if 'problems' in validated_data:
            problems = validated_data.pop('problems')

        instance = super(ResourceBaseSerializer, self).create(validated_data)

        # add TextBook Resource type
        if instance.resource_type == 'TB':
            if len(sections) == 0:
                instance.delete()
                raise exceptions.ValidationError({"sections": ["This field is required."]})

            # check that at least one solution exists
            def check_solution(_sections):
                for _section in _sections:
                    if 'problems' in _section:
                        return self.check_solution_in_problems(_section['problems'])

            if not check_solution(sections):
                instance.delete()
                raise exceptions.ValidationError({"sections": ["At least one solution required."]})

            sections_objects = []
            for i, section in enumerate(sections):
                sections_objects.append(
                    TextBookChapter(resource=instance, title=section['title'], position=i)
                )

            saved_sections = TextBookChapter.objects.bulk_create(sections_objects)

            for saved_section in saved_sections:
                section_data = sections[saved_section.position]
                if 'problems' in section_data:
                    self.save_problems(problems_list=section_data['problems'],
                                       textbook_section=saved_section,
                                       # resourse=instance,
                                       resource=None,
                                       posted_by=validated_data['owner']
                                       )

                    # problems_objects = []
                    # for i, problem in enumerate(section_data['problems']):
                    #     problems_objects.append(
                    #         ResourceProblem(textbook_section=saved_section, title=problem['title'], position=i)
                    #     )
                    # # save problems
                    # saved_problems = ResourceProblem.objects.bulk_create(problems_objects)
                    #
                    # for saved_problem in saved_problems:
                    #     problem_data = section_data['problems'][saved_problem.position]
                    #     if 'solutions' in problem_data:
                    #         solutions_objects = []
                    #         for y, solution in enumerate(problem_data['solutions']):
                    #             solutions_objects.append(
                    #                 TextBookSolution(pdf_id=solution['pdf']['id'],
                    #                                  position=y,
                    #                                  textbook_problem=saved_problem,
                    #                                  posted_by=validated_data['owner'])
                    #             )
                    #         # save solutions
                    #         TextBookSolution.objects.bulk_create(solutions_objects)
        # add standartized test resource
        elif instance.resource_type == 'TS':
            if len(problems) == 0:
                instance.delete()
                raise exceptions.ValidationError({"problems": ["This field is required."]})

            if not self.check_solution_in_problems(problems):
                instance.delete()
                raise exceptions.ValidationError({"problems": ["At least one solution required."]})

            self.save_problems(problems_list=problems,
                               textbook_section=None,
                               resource=instance,
                               # resourse=None,
                               posted_by=validated_data['owner']
                               )

            # save test info
            standardized_test_info['resource'] = instance
            standardized_test_info_serializer = \
                StandardizedTestInfoSerializer(data=standardized_test_info)

            if standardized_test_info_serializer.is_valid():
                StandardizedTestResource.objects.create(resource=instance,
                                                        **standardized_test_info_serializer.validated_data)
            else:
                instance.delete()
                raise serializers.ValidationError(standardized_test_info_serializer.errors)

        if metadata_data:
            # todo validate by serializer (see upper)
            ResourceMetaData.objects.create(resource=instance, **metadata_data)

        return instance

    class Meta:
        model = Resource
        fields = ['uuid', 'created_on', 'updated_on', 'resource_type', 'metadata', 'sections', 'count_views', 'owner',
                  'thread', 'problems', 'standardized_test_info', 'title']
        read_only_fields = ('uuid',  'created_on', 'updated_on', 'count_views', 'thread')


class ResourceListSerializer(ResourceBaseSerializer):
    # less_students = serializers.SerializerMethodField(read_only=True)
    #
    # def get_less_students(self, container):
    #     students = container.students.all()[:12]
    #     serializer = PublicProfileSerializer(instance=students, many=True)
    #     return serializer.data

    class Meta(ResourceBaseSerializer.Meta):
        fields = ['uuid', 'created_on', 'updated_on', 'resource_type', 'metadata', 'count_views', 'title']


class TextBookSolutionPDFSerializer(serializers.ModelSerializer):

    class Meta:
        model = TextBookSolutionPDF
        fields = '__all__'
        read_only_fields = ('created_on', )
