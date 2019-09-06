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

// TODO move to a lib
export function checkNestedProp (object, ...keys) {
  return keys.reduce((a, b) => (a || { })[b], object) !== undefined
}

// export function checkNestedProp (obj, ...keys) {
//   for (var i = 0; i < keys.length; i++) {
//     if (!obj || !obj.hasOwnProperty(keys[i])) {
//       return false
//     }
//     obj = obj[keys[i]]
//   }
//   return true
// }
