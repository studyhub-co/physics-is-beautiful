from rest_framework import serializers

from .models import LessonProgress, UserResponse, Text, Vector, Answer, MathematicalExpression


class LessonProgressSerializer(serializers.ModelSerializer):

    class Meta:
        model = LessonProgress
        fields = ['score', 'status', 'completed_on']


class TextSerializer(serializers.ModelSerializer):

    class Meta:
        model = Text
        fields = ['text']


class MathematicalExpressionSerializer(serializers.ModelSerializer):

    class Meta:
        model = MathematicalExpression
        fields = ['representation']


class VectorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vector
        fields = ['magnitude', 'angle', 'x_component', 'y_component']


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = ['uuid']

    uuid = serializers.CharField()


class UserResponseSerializer(serializers.ModelSerializer):

    CONTENT_SERIALIZER_MAP = {
        Text.__name__.lower(): TextSerializer,
        Vector.__name__.lower(): VectorSerializer,
        Answer.__name__.lower(): AnswerSerializer,
        MathematicalExpression.__name__.lower(): MathematicalExpressionSerializer,
    }

    class Meta:
        model = UserResponse
        fields = ['question', 'content_type', 'content', 'is_correct', 'answered_on']

    content = serializers.SerializerMethodField()

    def get_content(self, obj):
        return self.CONTENT_SERIALIZER_MAP[obj.content.__class__.__name__.lower()](obj.content).data
