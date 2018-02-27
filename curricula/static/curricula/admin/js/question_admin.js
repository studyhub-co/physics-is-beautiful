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

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
  };

  // hide question part if load from iframe
  if(getUrlParameter('only-answers')){
    django.jQuery("#header").hide();
    django.jQuery("h1").hide();
    django.jQuery(".object-tools").hide();
    django.jQuery(".breadcrumbs").hide();
    django.jQuery(".deletelink-box").hide();
    django.jQuery("[name='_addanother']").hide();
    django.jQuery("[name='_save']").hide();
    django.jQuery("fieldset.module").first().hide();
    django.jQuery("#question_form").attr('action', '?only-answers=true');
  }

});