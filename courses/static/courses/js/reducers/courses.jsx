import {
  COURSE_FETCHING, COURSE_FETCHING_SUCCESS
} from '../constants'

const initialState = {
  course: { isFetching: false, uuid: null }
}

export default function courses (state = initialState, action) {
  switch (action.type) {
    case COURSE_FETCHING:
      return {
        ...state,
        course: { isFetching: true }
      }
    case COURSE_FETCHING_SUCCESS:
      return {
        ...state,
        course: { isFetching: false, ...action.course }
      }
    default:
      return state
  }
}
