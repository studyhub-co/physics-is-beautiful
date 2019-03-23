
import React from 'react'

function getCookie (name) {
  var cookieValue = null
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';')
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

export default class CSRFToken extends React.Component {
  render () {
    return (
      <input type='hidden' name='csrfmiddlewaretoken' value={getCookie('csrftoken')} />
    )
  }
}
