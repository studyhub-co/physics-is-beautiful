import axios from 'axios'

axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'

export function getAxios () {
  return axios
}

export function checkHttpStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

export function checkHttpError (error) {
  let response = error.response

  if (response.status === 403) {
    // redirect to login page
    let url = '/accounts/login/?next=' + window.location.pathname
    window.location.replace(url)
    throw new Error('redirecting...')
  }
  throw error
}
