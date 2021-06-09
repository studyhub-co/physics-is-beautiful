import {
  NOTIFICATIONS_RECEIVE_UNREAD_COUNT,
  PROFILE_RECEIVE_ME,
  SIGNUP_FORM_ERRORS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from '../constants'

const initialState = {
  signUpFormErrors: null,
  signUpProcessRequesting: false,
  signUpSuccess: false,
}

export default function profile(state = initialState, action) {
  switch (action.type) {
    case PROFILE_RECEIVE_ME:
      return Object.assign({}, state, {
        me: action.payload.me,
      })
    case NOTIFICATIONS_RECEIVE_UNREAD_COUNT:
      return Object.assign({}, state, {
        unReadNotificationsCount: action.payload.unReadNotificationsCount,
      })
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        signUpProcessRequesting: true,
      })
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        signUpProcessRequesting: false,
        signUpSuccess: true,
      })
    case SIGNUP_FORM_ERRORS:
      return Object.assign({}, state, {
        signUpFormErrors: action.payload.signUpFormErrors,
        signUpProcessRequesting: false,
      })
    default:
      return state
  }
}
