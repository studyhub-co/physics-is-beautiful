function jqueryLoaded() {
  django.jQuery(document).ready(function () {
    if (!django.hasOwnProperty('unitsList')){
      django.jQuery.ajax({
        url: '/api/v1/curricula/units',
        success: function (data, status, jqXHR) {
          django.unitsList = data
        }
      });
    }
  });
}

function checkJquery() {
  if (django.jQuery) {
      jqueryLoaded();
  } else {
      window.setTimeout(checkJquery, 100);
  }
}

checkJquery();