from django.forms.fields import MultiValueField, CharField
from django.core.exceptions import ValidationError

from .widgets import UnitNameWidget, MathQuillWidget, UCWidget


class UCTField(MultiValueField):

    def __init__(self, fields=(), *args, **kwargs):
        fields = (CharField(widget=MathQuillWidget(attrs={'placeholder': 'question'})),
                  CharField(widget=UnitNameWidget(attrs={'placeholder': 'question unit'})),
                  CharField(widget=MathQuillWidget(attrs={'placeholder': 'answer'})),
                  CharField(widget=UnitNameWidget(attrs={'placeholder': 'answer unit'})))
        if 'widget' not in kwargs:
            kwargs['widget'] = UCWidget(widgets=[field.widget for field in fields])
        super(UCTField, self).__init__(fields, *args, **kwargs)

    def compress(self, data_list):
        """
        Returns a single value for the given list of values. The values can be
        assumed to be valid.
        For example, if this MultiValueField was instantiated with
        fields=(DateField(), TimeField()), this might return a datetime
        object created by combining the date and time in data_list.
        """

        non_empty_list = [d for d in data_list if d not in self.empty_values]

        if len(non_empty_list) == 0 and not self.required:
            return None
        elif len(non_empty_list) > 4:
            raise ValidationError(self.error_messages['invalid'], code='invalid')

        return non_empty_list
