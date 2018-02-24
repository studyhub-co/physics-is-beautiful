django.jQuery(function() {

  // autosave click
  django.jQuery("#id_answer_type").change(function () {
      django.jQuery("input[name=_continue]").click();
  });

  // auto multichoice
  var ss = django.jQuery("#id_answer_type").val();
  if (ss==100) { //only for multi choice

    var selectedId = "";

    django.jQuery("input[id^=id_answers-][name$=-is_correct]").change(function () {

      if (django.jQuery(this).is(':checked')) {
        selectedId = django.jQuery(this).attr('id');
        // deselect others
        django.jQuery("input[id^=id_answers-][name$=-is_correct]").each(function (e) {
          if (selectedId != django.jQuery(this).attr('id')) {
            django.jQuery(this).prop('checked', false);
          }
        })
      } else { //select first
          django.jQuery("input#id_answers-0-is_correct").prop('checked', true);
      }
    })

    django.jQuery(".add-handler.djn-add-handler.djn-model-curricula-answer").click(function (e) {
        django.jQuery("input#id_answers-__prefix__-is_correct").prop('checked', false);

    });
  }
});