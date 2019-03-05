import { checkHttpStatus, getAxios } from '../utils'
import { API_NOTIFICATIONS_PREFIX } from '../utils/config'
import { NOTIFICATIONS_RECEIVE_NOTIFICATIONS } from '../constants'

export function receiveNotifications (notifications) {
  return {
    type: NOTIFICATIONS_RECEIVE_NOTIFICATIONS,
    payload: {
      notifications
    }
  }
}

export function fetchNotifications (nextPageUrl) {
  var url = API_NOTIFICATIONS_PREFIX

  if (nextPageUrl) {
    url = nextPageUrl
  }

  return (dispatch, state) => {
    return getAxios().get(url)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveNotifications(response.data))
      })
  }
}
