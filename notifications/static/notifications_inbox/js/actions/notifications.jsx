import { checkHttpStatus, getAxios } from '../utils'
import { API_NOTIFICATIONS_PREFIX } from '../utils/config'
import { NOTIFICATIONS_RECEIVE_NOTIFICATIONS, NOTIFICATIONS_SET_CANCEL_SOURCE } from '../constants'

import { dictToURI } from '../utils/urls'

export function receiveNotifications (notifications) {
  return {
    type: NOTIFICATIONS_RECEIVE_NOTIFICATIONS,
    payload: {
      notifications
    }
  }
}

export function setCancelSource (cancelSource) {
  return {
    type: NOTIFICATIONS_SET_CANCEL_SOURCE,
    payload: {
      cancelSource
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
    const CancelToken = getAxios().CancelToken
    const source = CancelToken.source()

    dispatch(setCancelSource(source))

    return getAxios()
      .get(url,
        {
          cancelToken: source.token
        }
      )
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveNotifications(response.data))
      }).catch(function (thrown) {
        if (getAxios().isCancel(thrown)) {
          // silent cancel
        } else {
          throw thrown
        }
      })
  }
}

export function markAsRead (notification, markState) {
  // markState = 'read, unread'

  return (dispatch, state) => {
    return getAxios()
      .post(API_NOTIFICATIONS_PREFIX + notification.id + '/mark_as_' + markState + '/')
      .then(checkHttpStatus)
      .then((response) => {
      })
  }
}
