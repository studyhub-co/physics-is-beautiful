import {
  NOTIFICATIONS_RECEIVE_NOTIFICATIONS
} from '../constants'

const initialState = {
}

export default function notificationsReducer (state = initialState, action) {
  switch (action.type) {
    case NOTIFICATIONS_RECEIVE_NOTIFICATIONS:
      return Object.assign({}, state, {
        notifications: action.payload.notifications
      })
    default:
      return state
  }
}
