import { checkHttpStatus, getAxios } from '../utils'
import { API_COURSES_PREFIX } from '../utils/config'
import { COURSE_FETCHING_SUCCESS, COURSE_FETCHING } from '../constants'

function fetchingCourseSuccess (course) {
  return {
    type: COURSE_FETCHING_SUCCESS,
    course
  }
}

const fetchingCourse = () => {
  return {
    type: COURSE_FETCHING
  }
}

export function fetchCourse (uuid) {
  return (dispatch, state) => {
    dispatch(fetchingCourse())
    let courseUuid = '00000000-0000-0000-0000-000000000000' // default
    if (uuid) {
      courseUuid = uuid
    }
    const url = `${API_COURSES_PREFIX}courses/${courseUuid}/?expand=units.modules`
    return getAxios().get(url)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(fetchingCourseSuccess(response.data))
      })
  }
}
