import { checkHttpStatus, getAxios } from '../utils'
import {
  PROBLEM_TYPES_FETCH_PAGINATED_LIST_OBJECT_REQUEST, PROBLEM_TYPES_RECEIVE_PAGINATED_LIST_OBJECT

} from '../constants'

import { API_PREFIX as BASE_API_PREFIX } from '../utils/config'

const API_PREFIX = BASE_API_PREFIX + 'studio/material-problem-type/'

export function receiveProblemPaginatedListObject (problemTypesPaginatedListObject) {
  return {
    type: PROBLEM_TYPES_RECEIVE_PAGINATED_LIST_OBJECT,
    payload: {
      problemTypesPaginatedListObject: problemTypesPaginatedListObject
    }
  }
}
export function fetchProblemTypePaginatedListObject () {
  return {
    type: PROBLEM_TYPES_FETCH_PAGINATED_LIST_OBJECT_REQUEST
  }
}

export function fetchProblemTypes () {
  return (dispatch, state) => {
    dispatch(fetchProblemTypePaginatedListObject())
    return getAxios().get(API_PREFIX)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveProblemPaginatedListObject(response.data))
      })
  }
}
