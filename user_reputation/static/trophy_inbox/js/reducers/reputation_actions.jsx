import {
  REPUTATION_ACTIONS_RECEIVE_REPUTATION_ACTIONS, REPUTATION_ACTIONS_SET_CANCEL_SOURCE,
  // REPUTATION_ACTIONS_RECEIVE_UNREAD_COUNT
} from '../constants'

const initialState = {
}

export default function reputationActionsReducer (state = initialState, action) {
  switch (action.type) {
    case REPUTATION_ACTIONS_RECEIVE_REPUTATION_ACTIONS:
      return Object.assign({}, state, {
        reputationActionsList: action.payload.reputationActionsList
      })
    case REPUTATION_ACTIONS_SET_CANCEL_SOURCE:
      return Object.assign({}, state, {
        cancelSource: action.payload.cancelSource
      })
    // case REPUTATION_ACTIONS_RECEIVE_UNREAD_COUNT:
    //   return Object.assign({}, state, {
    //     unReadCount: action.payload.unReadCount
    //   })
    default:
      return state
  }
}
