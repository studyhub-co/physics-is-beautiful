import {
  PROFILE_RECEIVE_ME
} from '../constants'

const initialState = {
}

export default function profileReducer (state = initialState, action) {
  switch (action.type) {
    case PROFILE_RECEIVE_ME:
      return Object.assign({}, state, {
        me: action.payload.me
      })
    default:
      return state
  }
}
