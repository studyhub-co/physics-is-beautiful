from django.forms.widgets import MultiWidget
from django.forms.widgets import TextInput


class UCWidget(MultiWidget):
    template_name = 'django/forms/widgets/multiwidget.html'

    def decompress(self, value):
        if value:
            return value
        return [None, None, None, None]

    class Media:
        js = ('/static/curricula/admin/js/math.min.js',
              '/static/curricula/admin/js/get-units.js',
              '/static/curricula/admin/js/quantities.js',
              '/static/curricula/admin/js/uc_utils.js',
              )


class MathQuillWidget(TextInput):
    template_name = 'curricula/widgets/mq_widget.html'


class UnitNameWidget(TextInput):
    template_name = 'curricula/widgets/uc_widget.html'
