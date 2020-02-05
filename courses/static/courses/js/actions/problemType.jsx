import { checkHttpStatus, getAxios } from '../utils'
import {
  PROBLEM_TYPES_FETCH_LIST_REQUEST, PROBLEM_TYPES_RECEIVE_LIST

} from '../constants'

import { API_PREFIX as BASE_API_PREFIX } from '../utils/config'

const API_PREFIX = BASE_API_PREFIX + '/studio/material-problem-type/'

export function receiveProblemTypeList (problemTypesList) {
  return {
    type: PROBLEM_TYPES_RECEIVE_LIST,
    payload: {
      problemTypesList
    }
  }
}
export function fetchProblemTypeListRequest () {
  return {
    type: PROBLEM_TYPES_FETCH_LIST_REQUEST
  }
}

export function fetchProblemTypes () {
  return (dispatch, state) => {
    dispatch(fetchProblemTypeListRequest())
    return getAxios().get(API_PREFIX)
      .then(checkHttpStatus)
      .then((response) => {

      })
  }
}
