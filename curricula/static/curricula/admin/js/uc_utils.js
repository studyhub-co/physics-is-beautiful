django.uc_calculate_lhs_number = function (lhsNumber, lhsUnit, rhsUnit) {
  lhsNumber = lhsNumber.replace(/\^{\s*(\S+)\s*}/, '^($1)') // fix for math.parser()
  var parser = math.parser();
  try {
    var lhsNumber = parser.eval(lhsNumber)
  } catch (e) {
    return null;
  } // catch SyntaxError

  var convert = Qty.swiftConverter(lhsUnit, rhsUnit); // Configures converter
  return convert(lhsNumber)
}

var reloadUnits = function(django) {
    django.jQuery('span[id$="ucunit"]').each(function() {

       var mainElement=django.jQuery(this).children(':first');

       function unitsLoaded() {

         var refreshUnits = function (widget_name, unitType) {
           
           //console.log(widget_name);
           
           var INPUT_UNITS = []

           Object.getOwnPropertyNames(django.unitsList)
             .map(key => [key, Object.getOwnPropertyDescriptor(django.unitsList, key)])
             .map(([key]) => key).forEach(function (key) {
             if (!unitType || unitType === key) {
               INPUT_UNITS = INPUT_UNITS.concat(Object.keys(django.unitsList[key]))
             }
           })

           // reset all options
           django.jQuery('#id_' + widget_name).find('option').remove()

           for (x = 0; x < INPUT_UNITS.length; x++) {
             django.jQuery('#id_' + widget_name).append("<option value='" + INPUT_UNITS[x] + "'>" + INPUT_UNITS[x] + "</option>");
           }
         }

         // generate speed
         if (!django.unitsList.hasOwnProperty('SPEED')) {

           django.unitsList['SPEED'] = {}

           var distanceO = django.unitsList['DISTANCE']
           var timeO = django.unitsList['TIME']

           Object.keys(distanceO).forEach(function (keyDist) {
             Object.keys(timeO).forEach(function (keyTime) {
               django.unitsList['SPEED'][keyDist + '/' + keyTime] = distanceO[keyDist] + '/' + timeO[keyTime]
             })
           })
         }

          refreshUnits(mainElement.attr('name'), null)

          mainElement.on('change', function() {
                var newVal = this.value;
                // find unit TYPE
                var selected_unit_type;
                Object.getOwnPropertyNames(django.unitsList)
                  .map(key => [key, Object.getOwnPropertyDescriptor(django.unitsList, key)])
                  .map(([key]) => key).forEach(function (key) {
                    Object.keys(django.unitsList[key]).forEach( function (unitkey) {
                      if (unitkey === newVal){
                        selected_unit_type = key;
                        wn = mainElement.attr('name');

                        var widgetIndex = wn.slice(-1);
                        if (widgetIndex == "1"){
                          widgetIndex="3";
                        } else {
                          widgetIndex="1";
                        }
                        wn = wn.replace(/.$/, widgetIndex);
                        var oldVal = django.jQuery('#id_'+wn).val();
                        refreshUnits(wn, selected_unit_type); // reload on other
                        //restore other box with selected
                        django.jQuery('#id_'+wn).val(oldVal);
                      }else{
                         // reset current box with restore selected option
                        refreshUnits(mainElement.attr('name'), null);
                        django.jQuery('#id_'+mainElement.attr('name')).val(newVal);
                      }
                    })
                  })

                // fire mathquill field for recalculate rhs
                MQ = MathQuill.getInterface(MathQuill.getInterface.MAX);
                var spanId = mainElement.attr('name').replace(/.$/, "0-mq")
                var latexLhs = MQ(document.getElementById(spanId)).latex()
                MQ(document.getElementById(spanId)).latex(latexLhs)
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

})
}

var reloadMQ = function(django) {

  django.jQuery('span[id$=ucmathquill]').each(function() {

    var inputElement = django.jQuery(this).children(':first');

    if (typeof django.mathFields === 'undefined') {
      django.mathFields = {};
    }

    MQ = MathQuill.getInterface(MathQuill.getInterface.MAX);
    
    django.jQuery(inputElement.attr('name') + '-mq').remove()
    inputElement.after('<span id="' + inputElement.attr('name') + '-mq" style="min-height: 1.5em; min-width: 5em;"></span>');

    django.mathFields[inputElement.attr('name')] = MQ.MathField(document.getElementById(inputElement.attr('name') + '-mq'), {
      handlers: {
        edit: function (field) {
          if (field.data.fromJsCall) { return }
          document.getElementsByName(inputElement.attr('name'))[0].value = field.latex();

          //var lhs_id = 'id_{{ widget.name }}';
          var lhs_id = 'id_' + inputElement.attr('name');
          lhs_id = lhs_id.replace(/.$/, 1);
          var lhs_element = document.getElementById(lhs_id);

          var lhs_unit = lhs_element.options[lhs_element.selectedIndex].value;

          var rhs_id = 'id_' + inputElement.attr('name');
          rhs_id = lhs_id.replace(/.$/, 3);

          var rhs_element = document.getElementById(rhs_id);

          var rhs_unit
          try {
            rhs_unit = rhs_element.options[rhs_element.selectedIndex].value;
          }
          catch (TypeError){
            rhs_unit = rhs_element.selectedIndex = 0;
          }

          var rhs_val = django.uc_calculate_lhs_number(field.latex(), lhs_unit, rhs_unit);

          django.mathFields[inputElement.attr('name').replace(/.$/, 2)].data.fromJsCall = true;
          django.mathFields[inputElement.attr('name').replace(/.$/, 2)].latex(rhs_val);
          django.mathFields[inputElement.attr('name').replace(/.$/, 2)].data.fromJsCall = false;

        }
      }
    });

    if (inputElement.val()) {
        django.mathFields[inputElement.attr('name')].latex(inputElement.val());
    }
    if (inputElement.attr('name').indexOf('initial_step_2') != -1) {
        django.mathFields[inputElement.attr('name')].__controller.container[0].style.pointerEvents = 'none'
    }
  })
}

django.jQuery(function() {
  // reloadUnits(django);
  //reloadMQ(django);

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
    //...
  });

});
