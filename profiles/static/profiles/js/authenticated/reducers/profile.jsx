import {
  // PROFILE_RECEIVE_ME,
  PROFILE_RECEIVE_PROFILE,
  PROFILE_FETCHING_PROFILE,
  PROFILE_RECEIVE_BADGES,
} from '../constants'

const initialState = {}

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    // this is loads in main SPA app
    // case PROFILE_RECEIVE_ME:
    //   return Object.assign({}, state, {
    //     me: action.payload.me
    //   })
    case PROFILE_RECEIVE_PROFILE:
      return Object.assign({}, state, {
        profile: action.payload.profile,
      })
    case PROFILE_FETCHING_PROFILE:
      return Object.assign({}, state, {
        fetching: action.payload.fetching,
      })
    case PROFILE_RECEIVE_BADGES:
      return Object.assign({}, state, {
        badges: action.payload.badges,
      })
    default:
      return state
  }
}
