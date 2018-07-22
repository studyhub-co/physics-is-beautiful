import { CLASSROOM_RECEIVE_CLASSROOMS_LIST, CLASSROOM_CREATE_CLASSROOM_SUCCESS } from '../constants'

const initialState = {
  classroomList: null
}

export default function classroomReducer (state = initialState, action) {
  switch (action.type) {
    case CLASSROOM_RECEIVE_CLASSROOMS_LIST:
      return Object.assign({}, state, {
        classroomList: action.payload.classroomList
      })
    case CLASSROOM_CREATE_CLASSROOM_SUCCESS:
      return Object.assign({}, state, {
        classroomClassroom: action.payload.classroomList
      })
    default:
      return state
  }
}
