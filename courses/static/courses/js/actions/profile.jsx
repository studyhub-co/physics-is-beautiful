import { checkHttpStatus, getAxios } from '../utils'
import { API_PROFILE_PREFIX } from '../utils/config'
import {
  PROFILE_RECEIVE_ME,
  NOTIFICATIONS_RECEIVE_UNREAD_COUNT,
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
      .get(API_PROFILE_PREFIX + 'logout/')
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
      .post(API_PROFILE_PREFIX + 'login/', {
        email,
        password,
      })
      .then(checkHttpStatus)
      .then(response => {
        dispatch(receiveProfileMe(response.data))
      })
  }
}

export function signUp(firstName, lastName, email, password) {
  return (dispatch, state) => {
    return getAxios()
      .post(API_PROFILE_PREFIX + 'signup/', {
        firstName,
        lastName,
        email,
        password,
      })
      .then(checkHttpStatus)
      .then(response => {
        // TODO redirect to Welcome (Check email) page
        console.log(response)
      })
      .catch(error => {
        // TODO add
        console.log(error.response.data)
      })
  }
}
