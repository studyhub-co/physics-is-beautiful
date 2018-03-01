var conversionStepsEditor = function(django) {

 function createEditor(){

   // create steps list
   django.stepsArray = [];

   var addStep = function () {

     django.jQuery('span[id$="conversion_steps-div"]').each(function () {
       var initialDiv = django.jQuery(this);

       if (initialDiv.attr('id').indexOf("__prefix__") === -1) {

         var idx = django.stepsArray.length;

         if (idx > 2){
           django.jQuery('#add-answers-0-conversion_steps-button').hide();
         }

         var rowStr = '<div style="border: 1px solid black; padding: 5px;">';
         // rowStr += '<label>N</label>';
         rowStr += '<span id="answers-0-conversion_steps-' + idx + '-question_number-ucmathquill">';
         rowStr += '<input style="display: none;" type="text" name="answers-0-conversion_steps-' + idx + '-question_number" ' +
           'id="id_answers-0-conversion_steps-' + idx + '-question_number" />';
         rowStr += '<span id="answers-0-conversion_steps-' + idx + '-question_number-mq" style="min-height: 1.5em; min-width: 5em;"></span>';
         rowStr += '</span>'
         rowStr += '<span id="answers-0-conversion_steps-' + idx + '-question_unit-ucunit">';
         rowStr += '<select name="answers-0-conversion_steps-' + idx + '-question_unit" id="id_answers-0-conversion_steps-' + idx + '-question_unit"></select>';
         rowStr += '</span>';

         //rowStr += '<input type="button" value="Add step" id="add-answers-0-conversion_steps-' + idx + '-button" style="margin: 5px;">';
         rowStr += '<br/><hr />';

         // rowStr += '<label>D</label>';
         rowStr += '<span id="answers-0-conversion_steps-' + idx + '-answer_number-ucmathquill">';
         rowStr += '<input style="display: none;" type="text" name="answers-0-conversion_steps-' + idx + '-answer_number" ' +
           'id="id_answers-0-conversion_steps-' + idx + '-answer_number" />';
         rowStr += '<span id="answers-0-conversion_steps-' + idx + '-answer_number-mq" style="min-height: 1.5em; min-width: 5em;"></span>';
         rowStr += '</span>';
         rowStr += '<span id="answers-0-conversion_steps-' + idx + '-answer_unit-ucunit">';
         rowStr += '<select name="answers-0-conversion_steps-' + idx + '-answer_unit" id="id_answers-0-conversion_steps-' + idx + '-answer_unit"></select>';
         rowStr += '</span>'

         if (idx != 0) {
          rowStr += '<input type="button" value="Remove step" id="remove-answers-0-conversion_steps-' + idx + '-button" style="margin: 5px;">';
         }

         rowStr += '</div>';

         var rowDiv = django.jQuery(rowStr).attr('id', "conversions-step-"+django.stepsArray.length);

         initialDiv.append(rowDiv);
         django.stepsArray.push(rowDiv);

         django.jQuery('#remove-answers-0-conversion_steps-' + idx + '-button').click(function(e){
           // remove-answers-0-conversion_steps-1-button click
           var id = e.target.id.match(/^remove-answers-0-conversion_steps-(\d+)-button/)[1];
           django.jQuery("#conversions-step-" + id).remove();
           for (var i=0; i < django.stepsArray.length; i++){
              if(django.stepsArray[i].get(0).id === "conversions-step-" + id){
                django.stepsArray.splice(i, 1);
              }
           }
           if (idx <= 2){
              django.jQuery('#add-answers-0-conversion_steps-button').show();
           }
           delete django.mathFields['answers-0-conversion_steps-' + idx + '-answer_number'];
           delete django.mathFields['answers-0-conversion_steps-' + idx + '-question_number'];
           // django.reloadUnits(django);
           // django.reloadMQ(django);
           django.regenerateConversionStepsJson();
         })

        }
      })
   }

   django.jQuery('#add-answers-0-conversion_steps-button').click(function(e){
           addStep();
           django.reloadUnits(django);
           django.reloadMQ(django);
         })

   var initialTextArea = django.jQuery('textarea[id$=conversion_steps]')
   if(initialTextArea.val()){

     // load data
     var initialJson =initialTextArea.val().replace(/'/g, '"')
     var stepsList = JSON.parse(initialJson);

     MQ = MathQuill.getInterface(MathQuill.getInterface.MAX);

     for (var i=0; i < stepsList.length; i++){
         addStep();
     }
     
     django.reloadUnits(django);
     django.reloadMQ(django);

     // wait for django.mathFields populated
     var intialDataLoaded = function (stepsList) {

       for (var i=0; i < stepsList.length; i++){
          var [inputNumValue, inputNumUnit] = stepsList[i]['numerator'].split('\\ ');
          var inputDenomUnit = stepsList[i]['denominator'].split('\\ ')[1];
          
          var inputElement = MQ(document.getElementById("answers-0-conversion_steps-" + i + "-question_number-mq"));
          var inputNumElement = django.jQuery('#id_answers-0-conversion_steps-'+ i +'-question_unit');
          var inputDenomElement = django.jQuery('#id_answers-0-conversion_steps-'+ i +'-answer_unit');

          inputNumElement.val(inputNumUnit);
          inputDenomElement.val(inputDenomUnit);
          inputElement.latex(inputNumValue);
       }

     }

     function checkMathFields(stepsList) {
        if (django.mathFields) {
            intialDataLoaded(stepsList);
        } else {
          window.setTimeout(checkMathFields.bind(null, stepsList), 100);
       }
    }

    checkMathFields(stepsList);


   } else { //empty initial data
     //add initial step
      addStep();
   }

 }

 function checkWidgetsLoaded() {
      if (typeof django.reloadUnits != "undefined" && typeof django.reloadMQ != "undefined") {
          createEditor();
      } else {
          window.setTimeout(checkWidgetsLoaded, 100);
      }
  }
  checkWidgetsLoaded();

}

django.jQuery(function() {
  conversionStepsEditor(django);

  django.regenerateConversionStepsJson = function () {

    if(django.stepsArray){

      var jsonSteps = []
      MQ = MathQuill.getInterface(MathQuill.getInterface.MAX);

      for(var idx=0; idx < django.stepsArray.length; idx++){
        if (MQ(document.getElementById("answers-0-conversion_steps-" + idx + "-question_number-mq"))) {
          var question_number = MQ(document.getElementById("answers-0-conversion_steps-" + idx + "-question_number-mq")).latex();
          var question_unit = django.jQuery("#id_answers-0-conversion_steps-" + idx + "-question_unit").val();
          var answer_number = MQ(document.getElementById("answers-0-conversion_steps-" + idx + "-answer_number-mq")).latex();
          var answer_unit = django.jQuery("#id_answers-0-conversion_steps-" + idx + "-answer_unit").val();
          jsonSteps.push({
            "numerator": question_number + "\\ " + question_unit,
            "denominator": answer_number + "\\ " + answer_unit
          });
        }
      }

      django.jQuery('textarea#id_answers-0-conversion_steps').val(JSON.stringify(jsonSteps));

    }
   }

});