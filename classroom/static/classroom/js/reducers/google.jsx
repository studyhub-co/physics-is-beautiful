import {
  GOOGLE_RECEIVE_CLASSROOMS_LIST, GOOGLE_INIT_STATE_CHANGED, GOOGLE_RECEIVE_CLASSROOMS_STUDENTS_LIST
} from '../constants'

const initialState = {
  googleClassroomsList: null,
  googleInitState: false
}

export default function googleReducer (state = initialState, action) {
  switch (action.type) {
    case GOOGLE_RECEIVE_CLASSROOMS_LIST:
      return Object.assign({}, state, {
        googleClassroomsList: action.payload.googleClassroomsList
      })
    case GOOGLE_INIT_STATE_CHANGED:
      return Object.assign({}, state, {
        gapiInitState: action.payload.gapiInitState
      })
    // case GOOGLE_RECEIVE_CLASSROOMS_STUDENTS_LIST:
    //   return Object.assign({}, state, {
    //     googleClassroomsStudentsList: action.payload.googleClassroomsStudentsList
    //   })
    default:
      return state
  }
}
