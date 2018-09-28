import { checkHttpStatus, getAxios } from '../utils'
import {
  ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST, ASSIGNMENT_CREATE_ASSIGNMENT_SUCCESS,
  ASSIGNMENT_RECEIVE_ASSIGNMENT_SUCCESS, ASSIGNMENT_UPDATE_ASSIGNMENT_SUCCESS,
  ASSIGNMENT_FETCH_FIRST_UNCOMPLETED_LESSON, ASSIGNMENTS_RECEIVE_ASSIGNMENT_STUDENTS_LIST,
  ASSIGNMENT_RECEIVE_STUDENT_LESSONS_LIST
} from '../constants'

import { API_PREFIX } from '../utils/config'

export function receiveAssignment (assignment) {
  return {
    type: ASSIGNMENT_RECEIVE_ASSIGNMENT_SUCCESS,
    payload: {
      assignment
    }
  }
}

export function assignmentFetchAssignment (classroomUuid, assignmentUuid, callback = null) {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + classroomUuid + '/assignment/' + assignmentUuid + '/')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveAssignment(response.data))
        if (typeof callback === 'function') {
          callback()
        }
      })
  }
}

export function receiveAssignmentsList (assignmentsList) {
  return {
    type: ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST,
    payload: {
      assignmentsList
    }
  }
}

export function receiveAssignmentStudentsList (assignmentStudentsList) {
  return {
    type: ASSIGNMENTS_RECEIVE_ASSIGNMENT_STUDENTS_LIST,
    payload: {
      assignmentStudentsList
    }
  }
}

export function assignmentFetchStudentsList (classroomUuid, assignmentUuid, callback = null) {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + classroomUuid + '/assignment/' + assignmentUuid + '/students/')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveAssignmentStudentsList(response.data))
        if (typeof callback === 'function') {
          callback()
        }
      })
  }
}

export function assignmentFetchAssignmentList (classroomUuid) {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + classroomUuid + '/assignment/')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveAssignmentsList(response.data))
      })
  }
}

export function assignmentCreationAssignmentSuccess (assignment) {
  return {
    type: ASSIGNMENT_CREATE_ASSIGNMENT_SUCCESS,
    payload: {
      assignment
    }
  }
}

export function assignmentCreateAssignment (assignmentJson, refreshAssignmentsList = false) {
  return (dispatch, state) => {
    return getAxios().post(API_PREFIX + assignmentJson.classroom_uuid + '/assignment/', assignmentJson)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(assignmentCreationAssignmentSuccess(response.data))
        if (refreshAssignmentsList) {
          dispatch(assignmentFetchAssignmentList(assignmentJson.classroom_uuid))
        }
      })
  }
}

export function assignmentPartialUpdateSuccess (assignment) {
  return {
    type: ASSIGNMENT_UPDATE_ASSIGNMENT_SUCCESS,
    payload: {
      assignment
    }
  }
}

export function assignmentPartialUpdateAssignment (assignmentJson, refreshAssignmentsList = false, callback = null) {
  return (dispatch, state) => {
    return getAxios().patch(API_PREFIX + assignmentJson.classroom_uuid + '/assignment/' + assignmentJson.uuid + '/', assignmentJson)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(assignmentPartialUpdateSuccess(response.data))
        if (refreshAssignmentsList) {
          dispatch(assignmentFetchAssignmentList(assignmentJson.classroom_uuid))
        }
        if (typeof callback === 'function') {
          callback()
        }
      })
  }
}

export function assignmentDeleteAssignment (classroomUuid, assignmentUuid, refreshAssignmentsList = false, callback = null) {
  return (dispatch, state) => {
    return getAxios().delete(API_PREFIX + classroomUuid + '/assignment/' + assignmentUuid + '/')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(assignmentPartialUpdateSuccess(undefined))
        if (refreshAssignmentsList) {
          dispatch(assignmentFetchAssignmentList(classroomUuid))
        }
        if (typeof callback === 'function'){
          callback()
        }
      })
  }
}

export function receiveFirstUncompletedLesson (uncompletedLesson) {
  return {
    type: ASSIGNMENT_FETCH_FIRST_UNCOMPLETED_LESSON,
    payload: {
      uncompletedLesson
    }
  }
}

export function assignmentFetchFirstUncompletedLesson (classroomUuid, assignmentUuid, callback = null) {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + classroomUuid + '/assignment/' + assignmentUuid + '/first_uncompleted_lesson/')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveFirstUncompletedLesson(response.data))
        if (typeof callback === 'function') {
          callback()
        }
      })
  }
}

export function receiveAssignmentStudentLessonsList (assignmentStudentLessonsList, assignmentUuid) {
  return {
    type: ASSIGNMENT_RECEIVE_STUDENT_LESSONS_LIST,
    payload: {
      assignmentStudentLessonsList,
      assignmentUuid
    }
  }
}

export function assignmentFetchStudentLessonsList (classroomUuid, assignmentUuid, callback = null) {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + classroomUuid + '/assignment/' + assignmentUuid + '/lessons/')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveAssignmentStudentLessonsList(response.data, assignmentUuid))
        if (typeof callback === 'function') {
          callback()
        }
      })
  }
}
