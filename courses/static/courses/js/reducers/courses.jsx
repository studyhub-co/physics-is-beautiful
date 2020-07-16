import {
  COURSE_FETCHING, COURSE_FETCHING_SUCCESS
} from '../constants'

const initialState = {
  isFetching: false
}

export default function courses (state = initialState, action) {
  switch (action.type) {
    case COURSE_FETCHING:
      return {
        ...state,
        isFetching: true
      }
    case COURSE_FETCHING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.course
      }
    default:
      return state
  }
}
