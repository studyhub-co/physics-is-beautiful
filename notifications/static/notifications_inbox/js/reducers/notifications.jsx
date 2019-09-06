import {
  NOTIFICATIONS_RECEIVE_NOTIFICATIONS, NOTIFICATIONS_SET_CANCEL_SOURCE, NOTIFICATIONS_RECEIVE_UNREAD_COUNT
} from '../constants'

const initialState = {
}

export default function notificationsReducer (state = initialState, action) {
  switch (action.type) {
    case NOTIFICATIONS_RECEIVE_NOTIFICATIONS:
      return Object.assign({}, state, {
        notifications: action.payload.notifications
      })
    case NOTIFICATIONS_SET_CANCEL_SOURCE:
      return Object.assign({}, state, {
        cancelSource: action.payload.cancelSource
      })
    case NOTIFICATIONS_RECEIVE_UNREAD_COUNT:
      return Object.assign({}, state, {
        unReadCount: action.payload.unReadCount
      })
    default:
      return state
  }
}
