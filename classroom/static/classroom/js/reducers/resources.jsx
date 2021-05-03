import {
  COURSES_RECEIVE_COURSES_LIST,
  COURSES_RECEIVE_EXPANDED_COURSE,
  COURSES_RECEIVE_OTHER_COURSES_LIST
} from '../constants'

const initialState = {
  coursesList: null,
  coursesOtherList: null
}

export default function coursesReducer (state = initialState, action) {
  switch (action.type) {
    case COURSES_RECEIVE_COURSES_LIST:
      return Object.assign({}, state, {
        coursesList: action.payload.coursesList
      })
    case COURSES_RECEIVE_OTHER_COURSES_LIST:
      return Object.assign({}, state, {
        coursesOtherList: action.payload.coursesOtherList
      })
    case COURSES_RECEIVE_EXPANDED_COURSE:
      return Object.assign({}, state, {
        courseExpanded: action.payload.course
      })
    default:
      return state
  }
}
