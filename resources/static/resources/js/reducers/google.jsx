import {
  GOOGLE_INIT_STATE_CHANGED, GOOGLE_RECEIVE_BOOKS_LIST
} from '../constants'

const initialState = {
  googleInitState: false
}

export default function googleReducer (state = initialState, action) {
  switch (action.type) {
    case GOOGLE_RECEIVE_BOOKS_LIST:
      return Object.assign({}, state, {
        googleBooksList: action.payload.googleBooksList
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
