import { checkHttpStatus, getAxios } from '../utils'
import { API_NOTIFICATIONS_PREFIX } from '../utils/config'
import { NOTIFICATIONS_RECEIVE_NOTIFICATIONS } from '../constants'

import { dictToURI } from '../utils/urls'

export function receiveNotifications (notifications) {
  return {
    type: NOTIFICATIONS_RECEIVE_NOTIFICATIONS,
    payload: {
      notifications
    }
  }
}

export function fetchNotifications (nextPageUrl, filters) {
  var url = API_NOTIFICATIONS_PREFIX

  if (nextPageUrl) {
    url = nextPageUrl
  }

  if (filters) {
    url += '?' + dictToURI(filters)
  }

  return (dispatch, state) => {
    return getAxios().get(url)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveNotifications(response.data))
      })
  }
}

export function markAsRead (notification, markState) {
  // markState = 'read, unread'

  return (dispatch, state) => {
    return getAxios().post(API_NOTIFICATIONS_PREFIX + notification.id + '/mark_as_' + markState + '/')
      .then(checkHttpStatus)
      .then((response) => {
      })
  }
}
