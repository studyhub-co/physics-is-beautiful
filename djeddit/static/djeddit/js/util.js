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
  },
  mobileUrl: function (url) {
    // pib-mobile-connect.js
    return window.mobilizedUrl(url)
  }
}

$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip()
  if (window.sessionStorage.getItem('history') == null) {
    window.sessionStorage.setItem('history', JSON.stringify([window.location.href]))
  } else {
    let sessionHistory = JSON.parse(window.sessionStorage.getItem('history'))
    sessionHistory.push(window.location.href)
    window.sessionStorage.setItem('history', JSON.stringify(sessionHistory))
  }

  console.log(window.sessionStorage.getItem('history'))
})
