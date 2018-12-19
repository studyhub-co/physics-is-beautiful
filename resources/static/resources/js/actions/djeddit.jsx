import { checkHttpStatus, getAxios } from '../utils'
import { API_DJEDDIT_PREFIX } from '../utils/config'
import { DJEDDIT_RECEIVE_THREAD } from '../constants'

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
