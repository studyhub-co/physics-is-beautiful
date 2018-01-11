from django.forms.widgets import TextInput


class MathQuillUnitConversionWidget(TextInput):
    template_name = 'curricula/widgets/conversion/mq_widget.html'

    class Media:
        js = ('/static/curricula/admin/js/math.min.js',
              '/static/curricula/admin/js/get-units.js',
              '/static/curricula/admin/js/quantities.js',
              '/static/curricula/admin/js/uc_widgets.js',
              )


class UnitNameWidget(TextInput):
    template_name = 'curricula/widgets/conversion/uc_widget.html'

    class Media:
        js = ('/static/curricula/admin/js/math.min.js',
              '/static/curricula/admin/js/get-units.js',
              '/static/curricula/admin/js/quantities.js',
              '/static/curricula/admin/js/uc_widgets.js',
              )


class ConversionStepsJSONWidget(TextInput):
    template_name = 'curricula/widgets/conversion/steps_json_widget.html'

    class Media:
        js = ('/static/curricula/admin/js/math.min.js',
              '/static/curricula/admin/js/get-units.js',
              '/static/curricula/admin/js/quantities.js',
              '/static/curricula/admin/js/uc_widgets.js',
              '/static/curricula/admin/js/conversion_steps_widget.js',
              )


class MathConversionWidget(TextInput):
    template_name = 'curricula/widgets/mq_widget.html'
