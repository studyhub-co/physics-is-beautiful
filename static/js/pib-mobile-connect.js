// This file specifies any needed connections between the pib_mobile app and the website.

// Return to previous page upon receiving "goBack" message
window.addEventListener('message', function (event) {
  // Normally we would check event.origin for security purposes.
  // However, this script cannot accomplish anything malicious.

  if (event.data === 'goBack') {
    window.history.back()
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

    // tell the parent page that we are adding to the navigation stack.
    window.parent.postMessage('pagePushed', '*')

    if (this.href.indexOf('?') !== -1) {
      if (this.href.indexOf('pib_mobile') !== -1) {
        window.location = this.href
      } else {
        window.location = this.href + '&pib_mobile=true'
      }
    } else {
      window.location = this.href + '?pib_mobile=true'
    }
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
$.get('/api/v1/profiles/me', function (data) {
  // document.body.innerHTML = data
  window.parent.postMessage({
    'message': 'loginInfo',
    'data': data
  }, 'http://localhost:8080')
})
