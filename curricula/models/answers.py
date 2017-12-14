import re
import math

from sympy import simplify, trigsimp
from piblib.latex2sympy.process_latex import process_sympy
from shortuuidfield import ShortUUIDField

from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

from jsonfield import JSONField

from . import BaseModel, Question

class AnswerQuerySet(models.QuerySet):

    def get_correct(self):
        # Right now we assume there to only be a single correct answer to a
        # question.
        return self.get(is_correct=True)


class Answer(BaseModel):

    class Meta:
        ordering = ['position']
        db_table = 'curricula_answers'

    objects = AnswerQuerySet.as_manager()

    uuid = ShortUUIDField()
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    position = models.PositiveSmallIntegerField('Position', null=True, blank=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content = GenericForeignKey('content_type', 'object_id')
    is_correct = models.BooleanField(default=False)

    def matches(self, answer):
        if isinstance(answer, Answer):
            return self == answer
        else:
            return self.content.matches(answer)

    def save(self, *args, **kwargs):
        if self.question and self.question.question_type == Question.QuestionType.SINGLE_ANSWER:
            self.is_correct = True
        super(Answer, self).save(*args, **kwargs)


class Text(BaseModel):

    class Meta:
        db_table = 'curricula_texts'

    text = models.CharField(max_length=200)

    def matches(self, obj):
        if isinstance(obj, Answer):
            return self.matches(obj.content)
        try:
            return self.text.lower() == obj.text.lower()
        except AttributeError:
            return False

    def __str__(self):
        return 'Text: {}'.format(self.text)

class MathematicalExpressionMixin:
    @staticmethod
    def match_math(val1, val2):
        # parse latex into sympy and then compare (use `.expand`, `simplify`
        # and `trigsimp` to get to a canonical form)
        try:
            left_side = process_sympy(val1)
            right_side = process_sympy(val2)
        except Exception:  # TODO too broad exception
            # if we fail to parse it, then it's not valid
            return False
        return trigsimp(simplify(left_side.expand())) == trigsimp(simplify(right_side.expand()))


class MathematicalExpression(BaseModel, MathematicalExpressionMixin):

    class Meta:
        db_table = 'curricula_mathematical_expressions'

    representation = models.CharField(max_length=255)

    vector_regex = re.compile(
        r'((?P<first_component>-?\d*)?\s*\\hat\{(?P<first_symbol>[xyij])\})?'
        r'(?P<operator>[+-])?'
        r'((?P<second_component>-?\d*)?\s*\\hat\{(?P<second_symbol>[xyij])\})?',
        re.I,
    )

    def matches(self, obj):
        if isinstance(obj, Answer):
            return self.matches(obj.content)
        elif isinstance(obj, Vector):
            try:
                return self.convert_to_vector().matches(obj)
            except ValueError:
                return False

        return self.match_math(self.representation, obj.representation)

        # # parse latex into sympy and then compare (use `.expand`, `simplify`
        # # and `trigsimp` to get to a canonical form)
        # try:
        #     left_side = process_sympy(self.representation)
        #     right_side = process_sympy(obj.representation)
        # except Exception:
        #     # if we fail to parse it, then it's not valid
        #     return False
        # return trigsimp(simplify(left_side.expand())) == trigsimp(simplify(right_side.expand()))

    def convert_to_vector(self):
        """
        For now we assume that the vector must come in the format:
            A\hat{x|i} ± B\hat{y|j}
        where A and B are the x and y components of the
        vector, respsectively.
        Note that each space specified in the typing is escaped by the `\`
        character, so we must account for those as well.
        """
        def is_x(x):
            return x in ('x', 'i')

        def is_y(y):
            return y in ('y', 'j')

        def is_xy(component):
            return component in ('x', 'y')

        def to_int(val):
            if val == '-':
                return -1
            else:
                return int(val)

        rep = self.representation.replace('\ ', '')
        match = self.vector_regex.match(rep)
        if match:
            first = match.group('first_symbol')
            second = match.group('second_symbol')
            if is_xy(first) is is_xy(second) or second is None:
                multiplier = -1 if match.group('operator') == '-' else 1
                if is_x(first) and is_y(second):
                    x = to_int(match.group('first_component') or 1)
                    y = to_int(match.group('second_component') or 1) * multiplier
                elif is_x(second) and is_y(first):
                    y = to_int(match.group('first_component') or 1)
                    x = to_int(match.group('second_component') or 1) * multiplier
                elif is_x(first):
                    x = to_int(match.group('first_component') or 1)
                    y = 0
                elif is_y(first):
                    y = to_int(match.group('first_component') or 1)
                    x = 0
                else:
                    raise ValueError('Unrecognized vector format')
                return Vector(x_component=x, y_component=y)
        raise ValueError('Unrecognized vector format')

    def __str__(self):
        return 'Mathematical Expression: {}'.format(self.representation)


class UnitConversion(BaseModel, MathematicalExpressionMixin):
    UnitConversionTypes = (
        ('10', 'LEFT SIDE BLANK'),
        ('20', 'RIGHT SIDE BLANK'),
        ('30', 'ALL SIDES BLANK'),
    )

    unit_conversion_type = models.CharField(
        max_length=2,
        choices=UnitConversionTypes,
        default='10',
    )

    # conversion matrix
    # conversion_steps = [{"numerator":"", "denominator":""},
    #   {"numerator":"", "denominator":""}, ...]
    conversion_steps = JSONField(blank=True, null=True, help_text="Numerator/Denominator steps")

    answer = models.CharField(max_length=100, help_text="Correct answer with unit: m, s, kg, m/s")
    numerator = models.CharField(blank=True, null=True,
                                 max_length=100, help_text="Numerator value with unit: m, s, kg, m/s")
    denominator = models.CharField(blank=True, null=True,
                                   max_length=100, help_text="Denominator value with unit: m, s, kg, m/s")
    show_answer = models.BooleanField(default=True,
                                      help_text="Set for showing answer, otherwise show fraction")

    def matches(self, obj):
        if isinstance(obj, Answer):
            return self.matches(obj.content)
        elif isinstance(obj, UnitConversion):
            if self.unit_conversion_type == '20':  # check only answer
                return self.match_math(obj.answer, self.answer)
            else:  # check fraction and answer
                correct = True
                for step in obj.conversion_steps:
                    if step['numerator'] and step['denominator']:
                        correct = self.match_math(str(step['numerator']),  str(step['denominator']))
                return correct and self.match_math(obj.answer, self.answer)

        return False

    def __str__(self):
        return 'UnitConversion: {}'.format(self.answer)


class Image(BaseModel):

    class Meta:
        db_table = 'curricula_images'

    image = models.ImageField(blank=True)

    def matches(self, obj):
        if isinstance(obj, Answer):
            return self.matches(obj.content)
        raise ValidationError('It does not make sense to try to compare 2 images.')

    def __str__(self):
        return 'Image: {}'.format(self.image)


class Vector(BaseModel):

    class Meta:
        db_table = 'curricula_vectors'

    magnitude = models.FloatField("Magnitude", null=True, blank=True)
    angle = models.FloatField("Angle", null=True, blank=True)
    x_component = models.FloatField("x-Component", null=True, blank=True)
    y_component = models.FloatField("y-Component", null=True, blank=True)

    def _fill_out_fields(self):
        if self.is_null:
            # null vector
            return
        if self.magnitude is None:
            self.magnitude = self._calculate_magnitude()
        if self.angle is None:
            self.angle = self._calculate_angle()
        if self.x_component is None:
            self.x_component = self._calculate_x()
        if self.y_component is None:
            self.y_component = self._calculate_y()

    @property
    def is_null(self):
        return (
            not self.magnitude and
            self.angle is None and
            not self.x_component and
            not self.y_component
        )

    def matches(self, obj):
        if isinstance(obj, Answer):
            return self.matches(obj.content)
        elif isinstance(obj, MathematicalExpression):
            try:
                return self.matches(obj.convert_to_vector())
            except ValueError:
                return False
        try:
            if obj.is_null != self.is_null:
                return False
            elif self.is_null:
                return True
            obj._fill_out_fields()
            for field in ['magnitude', 'angle', 'x_component', 'y_component']:
                value = getattr(self, field, None)
                if value is not None and value != getattr(obj, field):
                    return False
            return True
        except AttributeError:
            return False

    def for_display(self):
        angle = self.angle
        mag = self.magnitude
        x = self.x_component
        y = self.y_component

        if angle is not None or mag is not None or x is not None or y is not None:
            if angle is None and mag is not None:
                angle = 0.0
            elif mag is None and angle is not None:
                mag = 1.0
            elif angle is None and mag is None:
                angle = self._calculate_angle()
                mag = self._calculate_magnitude()

            if x is None and y is None:
                x = self._calculate_x(mag, angle)
                y = self._calculate_y(mag, angle)

        return {
            'angle': round(angle, 2),
            'magnitude': round(mag, 2),
            'x_component': round(x, 2),
            'y_component': round(y, 2),
        }

    def _calculate_magnitude(self):
        return math.sqrt(self.x_component ** 2 + self.y_component ** 2)

    def _calculate_angle(self):
        x = int(self.x_component)
        y = int(self.y_component)
        if x:
            calculated_angle = math.degrees(math.atan(self.y_component / self.x_component))
        elif y > 0:
            calculated_angle = 90
        else:
            calculated_angle = -90
        if x < 0 and y < 0:
            calculated_angle += 180
        elif x < 0:
            calculated_angle += 180
        elif y < 0:
            calculated_angle += 360
        return calculated_angle

    def _calculate_x(self, mag=None, angle=None):
        mag = mag if mag is not None else self.magnitude
        angle = angle if angle is not None else self.angle
        return mag * math.cos(math.radians(angle))

    def _calculate_y(self, mag=None, angle=None):
        mag = mag if mag is not None else self.magnitude
        angle = angle if angle is not None else self.angle
        return mag * math.sin(math.radians(angle))

    def validate_fields(self):
        if (self.x_component is None and self.y_component is not None or
                self.y_component is None and self.x_component is not None):
            raise ValidationError(
                'If you specify an X component or a Y component, you must specify both!'
            )

    def save(self, *args, **kwargs):
        self.validate_fields()
        super(Vector, self).save(*args, **kwargs)

    def __str__(self):
        return 'Vector: {}x + {}y ({}, {}°)'.format(
            self.x_component, self.y_component, self.magnitude, self.angle
        )
