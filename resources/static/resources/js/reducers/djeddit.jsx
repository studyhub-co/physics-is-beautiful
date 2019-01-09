import {
  DJEDDIT_RECEIVE_THREAD, DJEDDIT_VOTES_FOR_POST_CHANGED
} from '../constants'

const initialState = {
}

export default function resourcesReducer (state = initialState, action) {
  switch (action.type) {
    case DJEDDIT_RECEIVE_THREAD:
      return Object.assign({}, state, {
        thread: action.payload.thread
      })
    case DJEDDIT_VOTES_FOR_POST_CHANGED:

      var thread = Object.assign({}, state.thread)

      var postIndex = thread.posts_in_tree_order.findIndex(x => x.uid === action.payload.post.uid)
      thread.posts_in_tree_order[postIndex].score = action.payload.score

      return Object.assign({}, state, {
        thread: thread
      })
    default:
      return state
  }
}
