from django.forms.widgets import TextInput


class MathQuillUnitConversionWidget(TextInput):
    template_name = 'curricula/widgets/conversion/mq_widget.html'

    class Media:
        js = ('curricula/admin/js/math.min.js',
              'curricula/admin/js/get-units.js',
              'curricula/admin/js/quantities.js',
              'curricula/admin/js/uc_widgets.js',
              )


class UnitNameWidget(TextInput):
    template_name = 'curricula/widgets/conversion/uc_widget.html'

    class Media:
        js = ('curricula/admin/js/math.min.js',
              'curricula/admin/js/get-units.js',
              'curricula/admin/js/quantities.js',
              'curricula/admin/js/uc_widgets.js',
              )


class ConversionStepsJSONWidget(TextInput):
    template_name = 'curricula/widgets/conversion/steps_json_widget.html'

    class Media:
        js = ('curricula/admin/js/math.min.js',
              'curricula/admin/js/get-units.js',
              'curricula/admin/js/quantities.js',
              'curricula/admin/js/uc_widgets.js',
              'curricula/admin/js/conversion_steps_widget.js',
              )


class MathConversionWidget(TextInput):
    template_name = 'curricula/widgets/mq_widget.html'
