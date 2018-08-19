// This file specifies any needed connections between the pib_mobile app and the website.

// Return to previous page upon receiving "goBack" message
window.addEventListener('message', function (event) {
  // Normally we would check event.origin for security purposes.
  // However, this script cannot accomplish anything malicious.

  if (event.data === 'goBack') {
    window.history.back()
  } else if (event.data === 'profileInfo') {
    $.get('/api/v1/profiles/me', function (data, status) {
      // const loggedIn = 'is_anonymous' in data
      window.parent.postMessage({
        message: 'profileInformation',
        data: data
      }, '*')
    })
  }
})

// When the user has their finger on the vector canvas, it should not scroll.
// TODO fix on Android. Seems to work for Firefox & Chromium on desktop, strangely.

$(document).ready(function () {
  fixCanvas()
})

// Waits till at least one canvas container is loaded onto the page.
// Note that we are only going to have one.
function fixCanvas () {
  if (document.getElementsByClassName('canvas-container').length === 0) {
    window.requestAnimationFrame(fixCanvas)
  } else {
    var noScroll = document.getElementsByClassName('canvas-container')
    for (var i = 0; i < noScroll.length; i++) {
      noScroll[i].addEventListener('touchmove', function (e) {
        e.preventDefault()
      }, false)
    }
  }
};

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
}
