import { push } from 'connected-react-router'

import { checkHttpStatus, getAxios } from '../utils'
import { CLASSROOM_RECEIVE_CLASSROOMS_LIST, CLASSROOM_CREATE_CLASSROOM_SUCCESS,
  CLASSROOM_JOIN_CLASSROOM_SUCCESS, CLASSROOM_RECEIVE_STUDENT_CLASSROOMS_LIST,
  CLASSROOM_LEAVE_CLASSROOM_SUCCESS, CLASSROOM_RECEIVE_CLASSROOM} from '../constants'

const API_PREFIX = '/api/v1/classroom/'

export function receiveClassroomsList (classroomList) {
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
    return getAxios().get(API_PREFIX + '?filter=as_teacher')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveClassroomsList(response.data))
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

export function joinClassroomSuccess (classroom) {
  return {
    type: CLASSROOM_JOIN_CLASSROOM_SUCCESS,
    payload: {
      classroom
    }
  }
}

export function classroomJoinClassroom (classroomCode) {
  return (dispatch, state) => {
    return getAxios().post(API_PREFIX + 'join/', {code: classroomCode})
      .then((response) => {
        dispatch(joinClassroomSuccess(response.data))
        // todo move to claasroom page
        dispatch(push('/classroom/' + response.data['uuid'] + '/student/'))
      })
      .catch(error => {
        dispatch(joinClassroomSuccess(null))
        // console.log(error.response)
      })
  }
}

export function receiveStudentClassroomsList (classroomStudentList) {
  return {
    type: CLASSROOM_RECEIVE_STUDENT_CLASSROOMS_LIST,
    payload: {
      classroomStudentList
    }
  }
}

export function classroomFetchStudentClassroomsList () {
  return (dispatch, state) => {
    // dispatch(classroomFetchClassroomlistRequest()) // to the future
    return getAxios().get(API_PREFIX + '?filter=as_student')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveStudentClassroomsList(response.data))
      })
  }
}

export function leaveClassroomSuccess (classroom) {
  return {
    type: CLASSROOM_LEAVE_CLASSROOM_SUCCESS,
    payload: {
      classroom
    }
  }
}

export function classroomLeaveClassroom (classroom) {
  return (dispatch, state) => {
    return getAxios().post(API_PREFIX + 'leave/', {uuid: classroom.uuid})
      .then((response) => {
        dispatch(leaveClassroomSuccess(response.data))
        // todo remove class room from classrooms list
        // move to clasrooms list page
        dispatch(push('/classroom/'))
      })
  }
}

export function fetchClassroomSuccess (classroom) {
  return {
    type: CLASSROOM_RECEIVE_CLASSROOM,
    payload: {
      classroom
    }
  }
}

export function classroomFetchClassroom (classroomUuid) {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + classroomUuid + '/')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(fetchClassroomSuccess(response.data))
      })
  }
}
