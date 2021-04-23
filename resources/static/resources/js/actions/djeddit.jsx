import { checkHttpError, checkHttpStatus, getAxios } from '../utils'
import { API_REACT_COMMENTS_PREFIX, BASE_URL } from '../utils/config'
import {
  REACT_COMMENTS_RECEIVE_THREAD,
  REACT_COMMENTS_VOTES_FOR_POST_CHANGED
} from '../constants'

export function receiveThreadSolution (thread) {
  return {
    type: REACT_COMMENTS_RECEIVE_THREAD,
    payload: {
      thread
    }
  }
}

export function fetchThread (threadId) {
  return (dispatch, state) => {
    return getAxios().get(API_REACT_COMMENTS_PREFIX + 'threads/' + threadId)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveThreadSolution(response.data))
      })
  }
}

// export function createPostSuccess (post) {
//   return {
//     type: REACT_COMMENTS_CREATE_POST_SUCCESS,
//     payload: {
//       post
//     }
//   }
// }

export function createPost (post) {
  return (dispatch, state) => {
    return getAxios().post(API_REACT_COMMENTS_PREFIX + 'posts/', post)
      .catch(checkHttpError)
      .then((response) => {
        // dispatch(createResourceSuccess(response.data))
      })
  }
}

export function createPostWithRefreshThread (post, threadId) {
  return (dispatch, state) => {
    return dispatch(createPost(post)).then(() => {
      dispatch(fetchThread(threadId)).then(() => {
        // todo replace with new post url
        window.scrollTo(0, document.body.scrollHeight)
      })
    })
  }
}

export function updatePost (post) {
  return (dispatch, state) => {
    return getAxios().patch(API_REACT_COMMENTS_PREFIX + 'posts/' + post.uid + '/', post)
      .catch(checkHttpError)
      .then((response) => {
        // dispatch(createResourceSuccess(response.data))
      })
  }
}

export function updatePostWithRefreshThread (post, threadId) {
  return (dispatch, state) => {
    return dispatch(updatePost(post)).then(() => {
      dispatch(fetchThread(threadId)).then(() => {
        // todo replace with new post url
      })
    })
  }
}

export function deletePost (post) {
  return (dispatch, state) => {
    return getAxios().delete(API_REACT_COMMENTS_PREFIX + 'posts/' + post.uid + '/', post)
      .catch(checkHttpError)
      .then((response) => {
        // dispatch(createResourceSuccess(response.data))
      })
  }
}

export function deletePostWithRefreshThread (post, threadId) {
  return (dispatch, state) => {
    return dispatch(deletePost(post)).then(() => {
      dispatch(fetchThread(threadId)).then(() => {
        // todo replace with new post url
      })
    })
  }
}

export function votesForPostsChaged (post, score) {
  return {
    type: REACT_COMMENTS_VOTES_FOR_POST_CHANGED,
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
      .catch(checkHttpError)
      .then((response) => {
        dispatch(votesForPostsChaged(post, response.data['score']))
      })
  }
}
