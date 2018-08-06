import {
  STUDENT_RECEIVE_CLASSROOM_PROFILE, STUDENT_RECEIVE_CLASSROOM_ASSIGNMENTS
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
    default:
      return state
  }
}
