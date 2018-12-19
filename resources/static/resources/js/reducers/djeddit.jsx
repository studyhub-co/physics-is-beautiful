import {
  DJEDDIT_RECEIVE_THREAD
} from '../constants'

const initialState = {
}

export default function resourcesReducer (state = initialState, action) {
  switch (action.type) {
    case DJEDDIT_RECEIVE_THREAD:
      return Object.assign({}, state, {
        thread: action.payload.thread
      })
    default:
      return state
  }
}
