/**
 * Created by Roman on 06-Feb-17.
 */

window.util = {
  getAbsoluteURL: function (url) {
    var absoluteURL = new URL(url, window.BASE_URL)
    return absoluteURL.href
  },
  toggleForm: function (url, post, $placeAfter, params, $toggle, onSuccessFunc) {
    if ($toggle === undefined || !$toggle.hasClass('clicked')) {
      // load a form a given url
      $.get(url, params, function (data) {
        $placeAfter.after('<div id="' + post + '-edit">' + data + '</div>')
        if (typeof onSuccessFunc === 'function') { onSuccessFunc() }
      })
    } else {
      // remove the form
      $('#' + post + '-edit').remove()
    }
    $toggle.toggleClass('clicked')
  }
}

$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
