import { checkHttpStatus, getAxios } from '../utils'
import { API_DJEDDIT_PREFIX, BASE_URL } from '../utils/config'
import { DJEDDIT_RECEIVE_THREAD, CREATE_POST_SUCCESS } from '../constants'

export function receiveThreadSolution (thread) {
  return {
    type: DJEDDIT_RECEIVE_THREAD,
    payload: {
      thread
    }
  }
}

export function fetchThreadSolution (threadId) {
  return (dispatch, state) => {
    return getAxios().get(API_DJEDDIT_PREFIX + 'threads/' + threadId)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveThreadSolution(response.data))
      })
  }
}

// export function createPostSuccess (post) {
//   return {
//     type: CREATE_POST_SUCCESS,
//     payload: {
//       post
//     }
//   }
// }

export function createPost (post) {
  return (dispatch, state) => {
    return getAxios().post(API_DJEDDIT_PREFIX + 'posts/', post)
      .then(checkHttpStatus)
      .then((response) => {
        // dispatch(createResourceSuccess(response.data))
      })
  }
}

export function createPostWithRefreshThread (post, threadId) {
  return (dispatch, state) => {
    return dispatch(createPost(post)).then(() => {
      dispatch(fetchThreadSolution(threadId)).then(() => {
        // todo replace with new post url
        window.scrollTo(0, document.body.scrollHeight)
      })
    })
  }
}
