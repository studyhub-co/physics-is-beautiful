django.jQuery(function() {

  var listShownIframes = [];

  // autosave click
  django.jQuery("select[id$='-answer_type']").change(function (e) {
    //find link to toggla answer
    var toggleAnswerButton = django.jQuery(this).closest("td").siblings(".field-link").find("a");

    var newValue = django.jQuery(this).val();

    // try to find iframe
    var questionIframe = django.jQuery(this).closest("tr").next().find("iframe");
    if (questionIframe[0]) {
      questionIframe.contents().find("select#id_answer_type").val(newValue).change();
      questionIframe.contents().find("input[name=_continue]").click();
    } else {
    // iframe not found
      
    if(toggleAnswerButton.attr('data-qs-id')!="None") {
      toggleAnswerButton.trigger('click');
      toggleAnswerButton[0].click();

      var openedIframe = django.jQuery(this).closest("tr").next().find("iframe");

      openedIframe.ready(function () {
        openedIframe.attr("data-new-answer-type", newValue);
      })
    } else {
      //we must save new qs before we can us it
      django.jQuery("input[name=_continue]").click();
    }

    }

  });
  iAmLoaded = function(ya) {
    var newAnswerType = ya.getAttribute("data-new-answer-type");
    if(newAnswerType){
      ya.removeAttribute("data-new-answer-type");
      django.jQuery(ya).contents().find("select#id_answer_type").val(newAnswerType).change();
      django.jQuery(ya).contents().find("input[name=_continue]").click();
    }
  }

  showQuestionIframe = function (id, iframeUrl) {

    var alreadyOpen = false;
    for (var i=0; i<listShownIframes.length; i++){
      if (listShownIframes[i].id == id){
        alreadyOpen = true;
        listShownIframes[i].iframe.remove();
        listShownIframes.splice(i, 1);
      }
    }

    if (!alreadyOpen){
      var iframe = django.jQuery('<tr><td colspan=\"7\"><div style=\"width: 100%;\">' +
        '<iframe onload=\"this.width=screen.width*0.8;this.height=screen.height*0.4;parent.iAmLoaded(this)\" src=\"' + iframeUrl + '?only-answers=true\" frameborder=\"0\">' +
        '</iframe></div></tr></td>');
      django.jQuery("#question-id-" + id).parents(':eq(2)').after(iframe)
      listShownIframes.push({'iframe': iframe, 'id': id});
    }
  }

});