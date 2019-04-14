// This file specifies any needed connections between the pib_mobile app and the website.

window.appOrigin = 'http://localhost:8080'
// debugging:
// window.appOrigin = '*'

// Return to previous page upon receiving "goBack" message
window.addEventListener('message', function (event) {
  // Normally we would check event.origin for security purposes.
  // However, this script cannot accomplish anything malicious.
  // If changes are later made that could create a security risk,
  // please verify that event.origin == http://localhost:8080

  if (event.data === 'goBack') {
    // if not in discussion, use default canGoBack
    // TODO implement a better way of checking this.
    if ('BASE_URL' in window) {
      var sessionHistory = JSON.parse(window.sessionStorage.getItem('history'))
      var lastUrl = sessionHistory[sessionHistory.length - 1]

      window.sessionStorage.setItem('history', JSON.stringify(sessionHistory.splice(0, sessionHistory.length - 1)))
      window.location = lastUrl
    } else {
      window.history.back()
    }
  }
})

// Copy query string across link clicks.

if (window.IS_MOBILE_APP) {
  $('a').click(function (e) {
    if (this.href.trim().startsWith('javascript')) {
      // actually running javascript, not going to a link
      return
    }

    e.preventDefault()

    // social account provider (i.e. Google or Facebook)
    if (this.classList.contains('socialaccount_provider')) {
      if (this.classList.contains('google')) {
        window.parent.postMessage('googleLogin', '*')
      } else if (this.classList.contains('facebook')) {
        window.parent.postMessage('facebookLogin', '*')
      }
      return false
    }

    window.parent.postMessage({
      'message': 'canGoBack',
      'data': true
    }, '*')

    window.location.href = window.mobilizedUrl(this.href)
    return false
  })

  $(window).on('resize', function () {
    if ($(document.activeElement).prop('type') === 'text') {
      // If soft keyboard is visible, scroll to bottom
      $('html,body').animate({scrollTop: document.body.scrollHeight}, 'fast')
    }
  })
}

// TODO move this to window.IS_MOBILE_APP and check parent origin before sending
// Get profile data asynchronously and send it to the app
var postProfile = function () {
  var xmlHttp = new XMLHttpRequest()

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      // window.alert('posting: ' + JSON.stringify(xmlHttp.responseText))
      window.parent.postMessage({
        'message': 'loginInfo',
        'data': xmlHttp.responseText
      }, '*')
    }
  }
  xmlHttp.open('GET', '/api/v1/profiles/me', true)
  xmlHttp.send(null)
}

// TODO change to less
window.setTimeout(postProfile, 1000)

window.mobilizedUrl = function (url) {
  if (window.IS_MOBILE_APP && url.indexOf('pib_mobile') === -1) {
    return UpdateQueryString('pib_mobile', 'true', url)
  } else {
    return url
  }
}

// window.updateCanGoBack = (canGoBack) => {
window.updateCanGoBack = function (canGoBack) {
  if (canGoBack == null) {
    window.parent.postMessage({
      'message': 'canGoBack',
      'data': !(document.referrer.startsWith('http://localhost:8080')) && document.referrer.indexOf('accounts') === -1 // could be appOrigin with ending slash
    }, '*')
  } else if (window.IS_MOBILE_APP) {
    window.parent.postMessage({
      'message': 'canGoBack',
      'data': canGoBack
    }, '*')
  }
}

window.IS_IOS = navigator.platform.match(/iPhone|iPod|iPad/)

// All credit to https://stackoverflow.com/a/11654596/
function UpdateQueryString (key, value, url) {
  if (!url) url = window.location.href
  var re = new RegExp('([?&])' + key + '=.*?(&|#|$)(.*)', 'gi')
  var hash

  if (re.test(url)) {
    if (typeof value !== 'undefined' && value !== null) { return url.replace(re, '$1' + key + '=' + value + '$2$3') } else {
      hash = url.split('#')
      url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '')
      if (typeof hash[1] !== 'undefined' && hash[1] !== null) { url += '#' + hash[1] }
      return url
    }
  } else {
    if (typeof value !== 'undefined' && value !== null) {
      var separator = url.indexOf('?') !== -1 ? '&' : '?'
      hash = url.split('#')
      url = hash[0] + separator + key + '=' + value
      if (typeof hash[1] !== 'undefined' && hash[1] !== null) { url += '#' + hash[1] }
      return url
    } else { return url }
  }
}
