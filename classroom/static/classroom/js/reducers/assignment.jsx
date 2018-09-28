import {
  ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST, ASSIGNMENT_RECEIVE_ASSIGNMENT_SUCCESS, ASSIGNMENT_UPDATE_ASSIGNMENT_SUCCESS,
  ASSIGNMENT_FETCH_FIRST_UNCOMPLETED_LESSON, ASSIGNMENTS_RECEIVE_ASSIGNMENT_STUDENTS_LIST,
  ASSIGNMENT_RECEIVE_STUDENT_LESSONS_LIST
} from '../constants'

const initialState = {
  assignmentsList: null,
  assignmentsStudentLessonsList: {}
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
    case ASSIGNMENT_RECEIVE_STUDENT_LESSONS_LIST:
      var name = 'assignmentStudentLessonsList' + action.payload.assignmentUuid

      return Object.assign({}, state, {
        [name]: action.payload.assignmentStudentLessonsList
      })
    default:
      return state
  }
}
