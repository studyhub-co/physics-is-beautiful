from django.forms.widgets import TextInput


class MathQuillUnitConversionWidget(TextInput):
    template_name = 'courses/widgets/conversion/mq_widget.html'

    class Media:
        js = ('courses/admin/js/math.min.js',
              'courses/admin/js/get-units.js',
              'courses/admin/js/quantities.js',
              'courses/admin/js/uc_widgets.js',
              )


class UnitNameWidget(TextInput):
    template_name = 'courses/widgets/conversion/uc_widget.html'

    class Media:
        js = ('courses/admin/js/math.min.js',
              'courses/admin/js/get-units.js',
              'courses/admin/js/quantities.js',
              'courses/admin/js/uc_widgets.js',
              )


class ConversionStepsJSONWidget(TextInput):
    template_name = 'courses/widgets/conversion/steps_json_widget.html'

    class Media:
        js = ('courses/admin/js/math.min.js',
              'courses/admin/js/get-units.js',
              'courses/admin/js/quantities.js',
              'courses/admin/js/uc_widgets.js',
              'courses/admin/js/conversion_steps_widget.js',
              )


class MathConversionWidget(TextInput):
    template_name = 'courses/widgets/mq_widget.html'
