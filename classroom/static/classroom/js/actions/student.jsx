import { push } from 'connected-react-router'

import { checkHttpStatus, getAxios } from '../utils'

import {
  STUDENT_RECEIVE_CLASSROOM_PROFILE, STUDENT_RECEIVE_CLASSROOM_ASSIGNMENTS
} from '../constants'

import { API_PREFIX } from '../utils/config'

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
