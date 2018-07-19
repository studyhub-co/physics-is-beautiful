import { CLASSROOM_RECEIVE_CLASSROOM_LIST } from '../constants'

const initialState = {
  classroomList: null
}

export default function classroomReducer (state = initialState, action) {
  switch (action.type) {
    case CLASSROOM_RECEIVE_CLASSROOM_LIST:
      return Object.assign({}, state, {
        classroomList: action.payload.classromList
      })
    default:
      return state
  }
}
