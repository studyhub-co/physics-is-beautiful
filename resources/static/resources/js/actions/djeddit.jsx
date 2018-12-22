import { checkHttpStatus, getAxios } from '../utils'
import { API_DJEDDIT_PREFIX, BASE_URL } from '../utils/config'
import {
  DJEDDIT_RECEIVE_THREAD,
  DJEDDIT_VOTES_FOR_POST_CHANGED
} from '../constants'

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
//     type: DJEDDIT_CREATE_POST_SUCCESS,
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

export function votesForPostsChaged (post, score) {
  return {
    type: DJEDDIT_VOTES_FOR_POST_CHANGED,
    payload: {
      post,
      score
    }
  }
}

export function changePostVote (post, vote) {
  return (dispatch, state) => {
    // root djEdit API (do not support application/json !)
    var QUERY_URL = '/discussion/vote_post'

    var formData = new FormData()
    formData.append('post', post.uid)
    formData.append('vote', vote)

    // return getAxios().post(QUERY_URL, {post: post.uid, vote: vote})
    return getAxios().post(QUERY_URL, formData)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(votesForPostsChaged(post, response.data['score']))
      })
  }
}
