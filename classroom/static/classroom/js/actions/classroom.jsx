import { push } from 'connected-react-router'

import { checkHttpStatus, getAxios } from '../utils'
import { CLASSROOM_RECEIVE_CLASSROOMS_LIST, CLASSROOM_CREATE_CLASSROOM_SUCCESS } from '../constants'

const API_PREFIX = '/api/v1/classroom/'

export function dataReceiveClassroomsList (classroomList) {
  return {
    type: CLASSROOM_RECEIVE_CLASSROOMS_LIST,
    payload: {
      classroomList
    }
  }
}

export function classroomFetchClassroomsList () {
  return (dispatch, state) => {
    // dispatch(classroomFetchClassroomlistRequest()) // to the future
    return getAxios().get(API_PREFIX)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(dataReceiveClassroomsList(response.data))
      })
  }
}

export function classroomCreationSuccess (classroom) {
  return {
    type: CLASSROOM_CREATE_CLASSROOM_SUCCESS,
    payload: {
      classroom
    }
  }
}

export function classroomCreateClassroom (classroomForm) {
  return (dispatch, state) => {
    return getAxios().post(API_PREFIX, classroomForm)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(classroomCreationSuccess(response.data))
        // todo move to edit page
        dispatch(classroomFetchClassroomsList())
        dispatch(push('/classroom/'))
      })
  }
}
