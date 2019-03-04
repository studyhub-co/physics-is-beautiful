import {
  PROFILE_RECEIVE_ME, PROFILE_RECEIVE_PROFILE, PROFILE_FETCHING_PROFILE
} from '../constants'

const initialState = {
}

export default function profileReducer (state = initialState, action) {
  switch (action.type) {
    case PROFILE_RECEIVE_ME:
      return Object.assign({}, state, {
        me: action.payload.me
      })
    case PROFILE_RECEIVE_PROFILE:
      return Object.assign({}, state, {
        profile: action.payload.profile
      })
    case PROFILE_FETCHING_PROFILE:
      return Object.assign({}, state, {
        fetching: action.payload.fetching
      })
    default:
      return state
  }
}
