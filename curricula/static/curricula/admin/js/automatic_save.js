django.jQuery(function() {
  django.jQuery("#id_answer_type" ).change(function() {
    django.jQuery("input[name=_continue]").click();
});
});