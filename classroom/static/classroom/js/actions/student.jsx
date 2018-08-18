import { push } from 'connected-react-router'

import { checkHttpStatus, getAxios } from '../utils'

import {
  STUDENT_RECEIVE_CLASSROOM_PROFILE, STUDENT_RECEIVE_CLASSROOM_ASSIGNMENTS,
  STUDENT_RECEIVE_STUDENTS_CLASSROOM_LIST
} from '../constants'

import { API_PREFIX, BASE_URL } from '../utils/config'

// studentClassroomProfile

export function receiveStudentClassroomAssignmentsList (studentClassroomAssignments) {
  return {
    type: STUDENT_RECEIVE_CLASSROOM_ASSIGNMENTS,
    payload: {
      studentClassroomAssignments
    }
  }
}

export function classroomFetchStudentClassroomAssignmentsList (classroomUuid, userName) {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + classroomUuid + '/students/' + userName + '/assignments/')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveStudentClassroomAssignmentsList(response.data))
      })
  }
}

export function receiveStudentClassroomProfile (studentClassroomProfile) {
  return {
    type: STUDENT_RECEIVE_CLASSROOM_PROFILE,
    payload: {
      studentClassroomProfile
    }
  }
}

export function classroomFetchStudentClassroomProfile (classroomUuid, userName) {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + classroomUuid + '/students/' + userName + '/profile/')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveStudentClassroomProfile(response.data))
      })
  }
}

export function receiveStudentsClassroomList (classroomStudentsList) {
  return {
    type: STUDENT_RECEIVE_STUDENTS_CLASSROOM_LIST,
    payload: {
      classroomStudentsList
    }
  }
}

export function classroomFetchStudentsClassroomList (classroomUuid) {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + classroomUuid + '/students/')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveStudentsClassroomList(response.data))
      })
  }
}

export function removeFromClass (classroomUuid, userName) {
  return (dispatch, state) => {
    return getAxios().delete(API_PREFIX + classroomUuid + '/students/' + userName)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(classroomFetchStudentsClassroomList(classroomUuid))
        dispatch(push(BASE_URL + classroomUuid + '/teacher'))
        // todo check tabs
      })
  }
}
