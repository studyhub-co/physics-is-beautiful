import { CLASSROOM_RECEIVE_CLASSROOMS_LIST, CLASSROOM_CREATE_CLASSROOM_SUCCESS,
  CLASSROOM_JOIN_CLASSROOM_SUCCESS, CLASSROOM_RECEIVE_STUDENT_CLASSROOMS_LIST,
  CLASSROOM_LEAVE_CLASSROOM_SUCCESS} from '../constants'

const initialState = {
  classroomList: null,
  classroomClassroom: undefined
}

export default function classroomReducer (state = initialState, action) {
  switch (action.type) {
    case CLASSROOM_RECEIVE_CLASSROOMS_LIST:
      return Object.assign({}, state, {
        classroomList: action.payload.classroomList
      })
    case CLASSROOM_CREATE_CLASSROOM_SUCCESS:
      return Object.assign({}, state, {
        classroomClassroom: action.payload.classroom
      })
    case CLASSROOM_JOIN_CLASSROOM_SUCCESS:
      return Object.assign({}, state, {
        classroomClassroom: action.payload.classroom
      })
    case CLASSROOM_LEAVE_CLASSROOM_SUCCESS:
      return Object.assign({}, state, {
        classroomClassroom: undefined
      })
    case CLASSROOM_RECEIVE_STUDENT_CLASSROOMS_LIST:
      return Object.assign({}, state, {
        classroomStudentList: action.payload.classroomStudentList
      })
    default:
      return state
  }
}
