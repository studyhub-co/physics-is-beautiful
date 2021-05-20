import {
  NOTIFICATIONS_RECEIVE_UNREAD_COUNT, PROFILE_RECEIVE_ME
} from '../constants'

const initialState = {
}

export default function profile (state = initialState, action) {
  switch (action.type) {
    case PROFILE_RECEIVE_ME:
      return Object.assign({}, state, {
        me: action.payload.me
      })
    case NOTIFICATIONS_RECEIVE_UNREAD_COUNT:
      return Object.assign({}, state, {
        unReadNotificationsCount: action.payload.unReadNotificationsCount
      })
    default:
      return state
  }
}
