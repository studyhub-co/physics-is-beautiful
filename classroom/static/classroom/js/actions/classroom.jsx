import axios from 'axios'

import { checkHttpStatus, parseJSON } from '../utils'
import { CLASSROOM_RECEIVE_CLASSROOM_LIST } from '../constants'

axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'

export function dataReceiveClassroomList (classromList) {
  return {
    type: CLASSROOM_RECEIVE_CLASSROOM_LIST,
    payload: {
      classromList
    }
  }
}

const API_PREFIX = '/api/v1/classroom/'

export function classroomFetchClassroomList () {
  return (dispatch, state) => {
    // dispatch(classroomFetchClassroomlistRequest()) // to the future
    return axios.get(API_PREFIX)
      .then(checkHttpStatus)
      // .then(parseJSON)
      .then((response) => {
        dispatch(dataReceiveClassroomList(response.data))
      })
  }
}
