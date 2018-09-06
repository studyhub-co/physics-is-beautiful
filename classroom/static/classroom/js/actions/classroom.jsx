import { push } from 'connected-react-router'

import { checkHttpStatus, getAxios } from '../utils'
import {
  CLASSROOM_RECEIVE_TEACHER_CLASSROOMS_LIST, CLASSROOM_CREATE_TEACHER_CLASSROOM_SUCCESS,
  CLASSROOM_RECEIVE_TEACHER_CLASSROOM, CLASSROOM_UPDATE_TEACHER_CLASSROOM_SUCCESS,
  CLASSROOM_JOIN_STUDENT_CLASSROOM_SUCCESS, CLASSROOM_RECEIVE_STUDENT_CLASSROOMS_LIST,
  CLASSROOM_LEAVE_STUDENT_CLASSROOM_SUCCESS, CLASSROOM_RECEIVE_STUDENT_CLASSROOM } from '../constants'

import { BASE_URL, API_PREFIX } from '../utils/config'

import { classroomFetchStudentsClassroomList } from '../actions/student'

// ----------------------  TEACHER ACTIONS

export function receiveTeacherClassroomsList (classroomList) {
  return {
    type: CLASSROOM_RECEIVE_TEACHER_CLASSROOMS_LIST,
    payload: {
      classroomList
    }
  }
}

export function classroomFetchTeacherClassroomsList () {
  return (dispatch, state) => {
    // dispatch(classroomFetchClassroomlistRequest()) // to the future
    return getAxios().get(API_PREFIX + '?filter=as_teacher')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveTeacherClassroomsList(response.data))
      })
  }
}

export function receiveTeacherClassroomSuccess (classroomTeacher) {
  return {
    type: CLASSROOM_RECEIVE_TEACHER_CLASSROOM,
    payload: {
      classroomTeacher
    }
  }
}

export function classroomFetchTeacherClassroom (classroomUuid) {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + classroomUuid + '/')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveTeacherClassroomSuccess(response.data))
      })
  }
}

export function classroomCreationSuccess (classroomTeacher) {
  return {
    type: CLASSROOM_CREATE_TEACHER_CLASSROOM_SUCCESS,
    payload: {
      classroomTeacher
    }
  }
}

export function classroomCreateClassroom (classroomForm, redirectToClassroom = false, callback = null, refreshList = false) {
  return (dispatch, state) => {
    return getAxios().post(API_PREFIX, classroomForm)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(classroomCreationSuccess(response.data))
        // update classroomslist
        if (refreshList) {
          dispatch(classroomFetchTeacherClassroomsList())
        }
        //  move to edit page
        if (redirectToClassroom) {
          dispatch(push(BASE_URL + response.data.uuid + '/teacher/'))
        }
        if (typeof callback === 'function') {
          callback(response.data)
        }
      })
  }
}

export function classroomEraseTeacherClassroom () {
  return (dispatch, state) => {
    dispatch(classroomCreationSuccess(undefined))
  }
}

export function classroomPartialUpdateSuccess (classroomTeacher) {
  return {
    type: CLASSROOM_UPDATE_TEACHER_CLASSROOM_SUCCESS,
    payload: {
      classroomTeacher
    }
  }
}

export function classroomPartialUpdateTeacherClassroom (classroomJson, redirectToTeacher = false) {
  return (dispatch, state) => {
    return getAxios().patch(API_PREFIX + classroomJson.uuid + '/', classroomJson)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(classroomPartialUpdateSuccess(response.data))
        if (redirectToTeacher) {
          dispatch(push(BASE_URL + response.data.uuid + '/teacher/'))
        }
        // update classroomslist
        dispatch(classroomFetchTeacherClassroomsList())
      })
  }
}

export function classroomDeleteTeacherClassroom (classroomUuid) {
  return (dispatch, state) => {
    return getAxios().delete(API_PREFIX + classroomUuid + '/')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(classroomPartialUpdateSuccess(undefined))
        dispatch(classroomFetchTeacherClassroomsList())
        dispatch(push(BASE_URL))
      })
  }
}

// --------------------------- STUDENT ACTIONS

export function joinClassroomSuccess (classroomStudent) {
  return {
    type: CLASSROOM_JOIN_STUDENT_CLASSROOM_SUCCESS,
    payload: {
      classroomStudent
    }
  }
}

export function classroomJoinClassroom (classroomCode) {
  return (dispatch, state) => {
    return getAxios().post(API_PREFIX + 'join/', {code: classroomCode})
      .then((response) => {
        dispatch(joinClassroomSuccess(response.data))

        // filter classroom to list
        dispatch(classroomFetchStudentClassroomsList())

        // move to classroom page
        dispatch(push(BASE_URL + response.data['uuid'] + '/student/'))
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

export function leaveStudentClassroomSuccess (classroomStudent) {
  return {
    type: CLASSROOM_LEAVE_STUDENT_CLASSROOM_SUCCESS,
    payload: {
      classroomStudent
    }
  }
}

export function classroomLeaveStudentClassroom (classroom) {
  return (dispatch, state) => {
    return getAxios().post(API_PREFIX + 'leave/', {uuid: classroom.uuid})
      .then((response) => {
        dispatch(leaveStudentClassroomSuccess(response.data))
        // remove class room from classrooms list
        dispatch(classroomFetchStudentClassroomsList())
        // move to clasrooms list page
        dispatch(push(BASE_URL))
      })
  }
}

export function receiveStudentClassroomSuccess (classroomStudent) {
  return {
    type: CLASSROOM_RECEIVE_STUDENT_CLASSROOM,
    payload: {
      classroomStudent
    }
  }
}

export function classroomFetchStudentClassroom (classroomUuid) {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + classroomUuid + '/')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveStudentClassroomSuccess(response.data))
      })
  }
}

export function bulkStudentsUpdate (classroomUuid, studentsList, origin, refreshClassrroomsStudentsList) {
  return (dispatch, state) => {
    return getAxios().post(API_PREFIX + classroomUuid + '/roster/', {students: studentsList, origin: origin})
      .then((response) => {
        if (refreshClassrroomsStudentsList){
          dispatch(classroomFetchStudentsClassroomList(classroomUuid)
          )
        }
      })
  }
}
