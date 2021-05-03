import { checkHttpStatus, getAxios } from '../utils'
import {
  COURSES_RECEIVE_COURSES_LIST,
  COURSES_RECEIVE_OTHER_COURSES_LIST,
  COURSES_RECEIVE_EXPANDED_COURSE
} from '../constants'

const API_PREFIX = '/api/v1/courses/'

export function dataReceiveExpandedCourse (course) {
  return {
    type: COURSES_RECEIVE_EXPANDED_COURSE,
    payload: {
      course
    }
  }
}

export function coursesFetchExpandedCourse (courseUuid) {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + courseUuid + '?expand=units.modules.lessons')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(dataReceiveExpandedCourse(response.data))
      })
  }
}

export function dataReceiveCoursesList (coursesList) {
  return {
    type: COURSES_RECEIVE_COURSES_LIST,
    payload: {
      coursesList
    }
  }
}

export function coursesFetchCoursesList () {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + '?filter=my')
      .then(checkHttpStatus)
      .then((response) => {
        // fix for editor wrong json using
        // convert { "uuid" : { course}, "uuid" : { course2 },  .. } to list [course, course2 ...]
        // var list = Object.keys(response.data).map(function(k) { return response.data[k] })
        // dispatch(dataReceiveCoursesList(list))
        dispatch(dataReceiveCoursesList(response.data))
      })
  }
}

export function dataReceiveOtherCoursesList (coursesOtherList) {
  return {
    type: COURSES_RECEIVE_OTHER_COURSES_LIST,
    payload: {
      coursesOtherList
    }
  }
}

export function coursesFetchOtherCoursesList () {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + '?filter=default')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(dataReceiveOtherCoursesList(response.data))
      })
  }
}
