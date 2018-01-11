django.uc_calculate_lhs_number = function (lhsNumber, lhsUnit, rhsUnit) {
  lhsNumber = lhsNumber.replace(/\^{\s*(\S+)\s*}/, '^($1)'); // fix for math.parser()
  lhsNumber = lhsNumber.replace(/\\cdot/, '*'); // fix for math.parser()

  var parser = math.parser();

  try {
    var lhsNumber = parser.eval(lhsNumber);
  } catch (e) {
    return null;
  } // catch SyntaxError

  var convert = Qty.swiftConverter(lhsUnit, rhsUnit); // Configures converter

  return convert(lhsNumber);
}

var reloadUnits = function(django) {

   function unitsLoaded() {
      django.jQuery('span[id$="ucunit"]').each(function() {
        var mainElement = django.jQuery(this).children(':first');

        if (mainElement.attr('id').indexOf("__prefix__") === -1) {

          var refreshUnits = function (widget_name, unitType) {
            var INPUT_UNITS = []

            Object.getOwnPropertyNames(django.unitsList)
              .map(key => [key, Object.getOwnPropertyDescriptor(django.unitsList, key)])
              .map(([key]) => key).forEach(function (key) {
              if (!unitType || unitType === key) {
                INPUT_UNITS = INPUT_UNITS.concat(Object.keys(django.unitsList[key]));
              }
            })

            var selectedVal = django.jQuery('#id_' + widget_name).val()

            // reset all options
            django.jQuery('#id_' + widget_name).find('option').remove();

            for (x = 0; x < INPUT_UNITS.length; x++) {
              django.jQuery('#id_' + widget_name).append("<option value='" + INPUT_UNITS[x] + "'>" + INPUT_UNITS[x] + "</option>");
            }
            // try to load server value
            try {
              if (typeof django.jQuery('#id_' + widget_name).attr('value') !== 'undefined') {
                django.jQuery('#id_' + widget_name).val(django.jQuery('#id_' + widget_name).attr('value'))
                django.jQuery('#id_' + widget_name).removeAttr('value')
              }
            } catch (TypeError) {}

            // try to save selected value
            if (selectedVal) {
                django.jQuery('#id_' + widget_name).val(selectedVal);
            }

        }

          // generate speed
          if (!django.unitsList.hasOwnProperty('SPEED')) {

            django.unitsList['SPEED'] = {};

            var distanceO = django.unitsList['DISTANCE'];
            var timeO = django.unitsList['TIME'];

            Object.keys(distanceO).forEach(function (keyDist) {
              Object.keys(timeO).forEach(function (keyTime) {
                django.unitsList['SPEED'][keyDist + '/' + keyTime] = distanceO[keyDist] + '/' + timeO[keyTime];
              })
            })
          }

          refreshUnits(mainElement.attr('name'), null)

          mainElement.on('change', function (e) {
            if (e.originalEvent) { // user-triggered event
              var newVal = this.value;
              // find unit TYPE
              var selected_unit_type;
              Object.getOwnPropertyNames(django.unitsList)
                .map(key => [key, Object.getOwnPropertyDescriptor(django.unitsList, key)])
                .map(([key]) => key).forEach(function (key) {
                Object.keys(django.unitsList[key]).forEach(function (unitkey) {
                  if (unitkey === newVal) {
                    selected_unit_type = key;
                    wn = mainElement.attr('name');

                    if (wn.indexOf('answer_unit', wn.length - 'answer_unit'.length) !== -1) {
                      wn = wn.replace(new RegExp('answer_unit$'), 'question_unit');
                    } else {
                      wn = wn.replace(new RegExp('question_unit$'), 'answer_unit');
                    }

                    var oldVal = django.jQuery('#id_' + wn).val();
                    refreshUnits(wn, selected_unit_type); // reload on other
                    //restore other box with selected
                    django.jQuery('#id_' + wn).val(oldVal);
                  } else {
                    // reset current box with restore selected option
                    refreshUnits(mainElement.attr('name'), null);
                    django.jQuery('#id_' + mainElement.attr('name')).val(newVal);
                  }
                })
              })

              // fire mathquill field for recalculate rhs
              MQ = MathQuill.getInterface(MathQuill.getInterface.MAX);
              var spanId = mainElement.attr('name').replace(new RegExp('answer_unit$|question_unit$'), 'question_number-mq');
              // var spanId = mainElement.attr('name').replace(/.$/, "0-mq")
              var latexLhs = MQ(document.getElementById(spanId)).latex();
              MQ(document.getElementById(spanId)).latex(latexLhs);

              django.regenerateConversionStepsJson();

            }
          });
        } //endif __prefix__
      });
    }

    function checkUnits() {
        if (django.unitsList) {
            unitsLoaded();
        } else {
            window.setTimeout(checkUnits, 100);
        }
    }

checkUnits();

}
django.reloadUnits = reloadUnits;

var reloadMQ = function(django) {

  function unitsLoaded() {
    django.jQuery('span[id$=ucmathquill]').each(function () {

      var inputElement = django.jQuery(this).children(':first');
      
      if (inputElement.attr('id').indexOf("__prefix__") === -1){

      if (typeof django.mathFields === 'undefined') {
        django.mathFields = {};
      }

      MQ = MathQuill.getInterface(MathQuill.getInterface.MAX);

      if(!django.mathFields[inputElement.attr('name')]){

        inputElement.after('<span id="' + inputElement.attr('name') + '-mq" style="min-height: 1.5em; min-width: 5em;"></span>');

        django.mathFields[inputElement.attr('name')] = MQ.MathField(document.getElementById(inputElement.attr('name') + '-mq'), {
          handlers: {
            edit: function (field) {
              //write value to original input
              document.getElementsByName(inputElement.attr('name'))[0].value = field.latex();

              if (field.data.fromJsCall) { return }

              var lhs_id = 'id_' + inputElement.attr('name');
              lhs_id = lhs_id.replace(new RegExp('answer_number$|question_number$'), 'question_unit');
              var lhs_element = document.getElementById(lhs_id);

              var lhs_unit
              try {
                lhs_unit = lhs_element.options[lhs_element.selectedIndex].value;
              }
              catch (TypeError) {
                lhs_element.selectedIndex = 0;
                lhs_unit = lhs_element.options[lhs_element.selectedIndex].value;
              }

              var rhs_id = 'id_' + inputElement.attr('name');
              rhs_id = rhs_id.replace(new RegExp('answer_number$|question_number$'), 'answer_unit');

              var rhs_element = document.getElementById(rhs_id);

              var rhs_unit;
              try {
                rhs_unit = rhs_element.options[rhs_element.selectedIndex].value;
              }
              catch (TypeError) {
                rhs_element.selectedIndex = 0;
                rhs_unit = rhs_element.options[rhs_element.selectedIndex].value;
              }

              // recalculate rhs from lhs
              var questionBox = django.mathFields[inputElement.attr('name').replace(new RegExp('answer_number$'), 'question_number')];
              var rhs_val = django.uc_calculate_lhs_number(questionBox.latex(), lhs_unit, rhs_unit);

              var answerMQBox = django.mathFields[inputElement.attr('name').replace(new RegExp('question_number$'), 'answer_number')];

              if (typeof answerMQBox !== 'undefined') {
                answerMQBox.data.fromJsCall = true;
                answerMQBox.latex(rhs_val);
                answerMQBox.data.fromJsCall = false;
              }

              django.regenerateConversionStepsJson();
            }
          }
        });
      }

      if (inputElement.val()){
        django.mathFields[inputElement.attr('name')].latex(inputElement.val());
      }
      if (inputElement.attr('name').indexOf('answer_number') != -1) {
        django.mathFields[inputElement.attr('name')].__controller.container[0].style.pointerEvents = 'none';
      }
    }
    })
  }

   function checkUnits() {
        if (django.unitsList) {
            unitsLoaded();
    } else {
        window.setTimeout(checkUnits, 100);
    }
  }

  checkUnits();

}
django.reloadMQ = reloadMQ;

django.jQuery(function() {

  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  var observer = new MutationObserver(function(mutations, observer) {
   mutations.forEach(function(mutation) {
     if(mutation.target.className == "djn-add-item"){
        // reload for new widget
         reloadUnits(django);
         reloadMQ(django);
      }
    });
  });

  observer.observe(document, {
    subtree: true,
    attributes: true
  });

});
