# from django.template.loader import render_to_string
# from django.utils.safestring import mark_safe
#
# from django.contrib.contenttypes.models import ContentType
#
# import json
#
# from django.forms.widgets import MultiWidget
from django.forms.widgets import TextInput
# from django.forms.widgets import Widget

# class UCWidget(MultiWidget):
#     template_name = 'django/forms/widgets/multiwidget.html'
#
#     def decompress(self, value):
#         if value:
#             return value
#         return [None, None, None, None]
#
#     class Media:
#         js = ('/static/curricula/admin/js/math.min.js',
#               '/static/curricula/admin/js/get-units.js',
#               '/static/curricula/admin/js/quantities.js',
#               '/static/curricula/admin/js/uc_utils.js',
#               )


class MathQuillWidget(TextInput):
    template_name = 'curricula/widgets/mq_widget.html'

    class Media:
        js = ('/static/curricula/admin/js/math.min.js',
              '/static/curricula/admin/js/get-units.js',
              '/static/curricula/admin/js/quantities.js',
              '/static/curricula/admin/js/uc_widgets.js',
              )


class UnitNameWidget(TextInput):
    template_name = 'curricula/widgets/uc_widget.html'

    class Media:
        js = ('/static/curricula/admin/js/math.min.js',
              '/static/curricula/admin/js/get-units.js',
              '/static/curricula/admin/js/quantities.js',
              '/static/curricula/admin/js/uc_widgets.js',
              )


class ConversionStepsJSONWidget(TextInput):
    template_name = 'curricula/widgets/conversion_steps_json_widget.html'

    # def render(self, name, value, attrs=None):
    #     # if not value:
    #     #     value = '[{"numerator":"", "denominator":""},' \
    #     #             '{"numerator":"", "denominator":""},' \
    #     #             '{"numerator":"", "denominator":""},' \
    #     #             '{"numerator":"", "denominator":""}]'
    #     # else:
    #     value = json.dumps(value)
    #
    #     context = {
    #         'data': value,
    #         'name': name
    #     }
    #
    #     return mark_safe(render_to_string(self.template_name, context))

    class Media:
        js = ('/static/curricula/admin/js/math.min.js',
              '/static/curricula/admin/js/get-units.js',
              '/static/curricula/admin/js/quantities.js',
              '/static/curricula/admin/js/uc_widgets.js',
              '/static/curricula/admin/js/conversion_steps_widget.js',
              )