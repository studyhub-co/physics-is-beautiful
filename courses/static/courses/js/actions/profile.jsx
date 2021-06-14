import { checkHttpStatus, getAxios } from '../utils'
import { API_PROFILE_PREFIX } from '../utils/config'
import {
  PROFILE_RECEIVE_ME,
  NOTIFICATIONS_RECEIVE_UNREAD_COUNT,
  SIGNUP_FORM_ERRORS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from '../constants'
import { API_NOTIFICATIONS_PREFIX } from '../../../../../notifications/static/notifications_inbox/js/utils/config'
import history from '../history'

export function receiveProfileMe(me) {
  return {
    type: PROFILE_RECEIVE_ME,
    payload: {
      me,
    },
  }
}

export function fetchProfileMe() {
  return (dispatch, state) => {
    return getAxios()
      .get(API_PROFILE_PREFIX + 'me/')
      .then(checkHttpStatus)
      .then(response => {
        dispatch(receiveProfileMe(response.data))
      })
  }
}

export function receiveUnreadNotificationsCount(unReadNotificationsCount) {
  return {
    type: NOTIFICATIONS_RECEIVE_UNREAD_COUNT,
    payload: {
      unReadNotificationsCount,
    },
  }
}

export function fetchUnReadNotificationCount() {
  return (dispatch, state) => {
    return getAxios()
      .get(API_NOTIFICATIONS_PREFIX + 'unread_count/')
      .then(checkHttpStatus)
      .then(response => {
        dispatch(receiveUnreadNotificationsCount(response.data))
      })
  }
}

export function logout() {
  return (dispatch, state) => {
    return getAxios()
      .post(API_PROFILE_PREFIX + 'rest-auth/logout/')
      .then(checkHttpStatus)
      .then(response => {
        dispatch(receiveProfileMe(response.data))
        history.push('/')
      })
  }
}

export function login(email, password) {
  return (dispatch, state) => {
    return getAxios()
      .post(API_PROFILE_PREFIX + 'rest-auth/login/', {
        email,
        password,
      })
      .then(checkHttpStatus)
      .then(response => {
        dispatch(receiveProfileMe(response.data))
      })
  }
}

export function signUpFormErrors(signUpFormErrors) {
  return {
    type: SIGNUP_FORM_ERRORS,
    payload: {
      signUpFormErrors,
    },
  }
}

export function signUpRequest() {
  return {
    type: SIGNUP_REQUEST,
    // payload: {},
  }
}

export function signUpSuccess() {
  return {
    type: SIGNUP_SUCCESS,
    // payload: {},
  }
}

export function signUp(firstName, lastName, email, password, password2) {
  return (dispatch, state) => {
    dispatch(signUpRequest())
    return getAxios()
      .post(API_PROFILE_PREFIX + 'rest-auth/signup/', {
        first_name: firstName,
        last_name: lastName,
        email,
        password1: password, // dj_rest_auth version
        // password
        password2,
      })
      .then(checkHttpStatus)
      .then(response => {
        // success action
        signUpFormErrors(null)
        dispatch(signUpSuccess())
      })
      .catch(error => {
        dispatch(signUpFormErrors(error.response.data))
      })
  }
}

export function passwordReset(email) {
  return (dispatch, state) => {
    return getAxios()
      .post(API_PROFILE_PREFIX + 'rest-auth/password/reset/', {
        email,
      })
      .then(checkHttpStatus)
      .then(response => {
        dispatch(receiveProfileMe(response.data))
      })
  }
}
