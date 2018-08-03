import { ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST } from '../constants'

const initialState = {
  assignmentsList: null
}

export default function assignmentReducer (state = initialState, action) {
  switch (action.type) {
    case ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST:
      return Object.assign({}, state, {
        assignmentsList: action.payload.assignmentsList
      })
    default:
      return state
  }
}
