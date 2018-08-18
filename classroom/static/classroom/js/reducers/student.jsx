import {
  STUDENT_RECEIVE_CLASSROOM_PROFILE, STUDENT_RECEIVE_CLASSROOM_ASSIGNMENTS,
  STUDENT_RECEIVE_STUDENTS_CLASSROOM_LIST
} from '../constants'

const initialState = {
  studentClassroomAssignments: null,
  studentClassroomProfile: null
}

export default function assignmentReducer (state = initialState, action) {
  switch (action.type) {
    case STUDENT_RECEIVE_CLASSROOM_ASSIGNMENTS:
      return Object.assign({}, state, {
        studentClassroomAssignments: action.payload.studentClassroomAssignments
      })
    case STUDENT_RECEIVE_CLASSROOM_PROFILE:
      return Object.assign({}, state, {
        studentClassroomProfile: action.payload.studentClassroomProfile
      })
    case STUDENT_RECEIVE_STUDENTS_CLASSROOM_LIST:
      return Object.assign({}, state, {
        classroomStudentsList: action.payload.classroomStudentsList
      })
    default:
      return state
  }
}
