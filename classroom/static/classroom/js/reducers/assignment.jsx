import {
  ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST, ASSIGNMENT_RECEIVE_ASSIGNMENT_SUCCESS, ASSIGNMENT_UPDATE_ASSIGNMENT_SUCCESS,
  ASSIGNMENT_FETCH_FIRST_UNCOMPLETED_LESSON, ASSIGNMENTS_RECEIVE_ASSIGNMENT_STUDENTS_LIST
} from '../constants'

const initialState = {
  assignmentsList: null

}

export default function assignmentReducer (state = initialState, action) {
  switch (action.type) {
    case ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST:
      return Object.assign({}, state, {
        assignmentsList: action.payload.assignmentsList
      })
    case ASSIGNMENT_FETCH_FIRST_UNCOMPLETED_LESSON:
      return Object.assign({}, state, {
        uncompletedLesson: action.payload.uncompletedLesson
      })
    case ASSIGNMENT_RECEIVE_ASSIGNMENT_SUCCESS:
    case ASSIGNMENT_UPDATE_ASSIGNMENT_SUCCESS:
      return Object.assign({}, state, {
        assignment: action.payload.assignment
      })
    case ASSIGNMENTS_RECEIVE_ASSIGNMENT_STUDENTS_LIST:
      return Object.assign({}, state, {
        assignmentStudentsList: action.payload.assignmentStudentsList
      })
    default:
      return state
  }
}
