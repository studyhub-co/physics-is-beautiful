import {
  ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST, ASSIGNMENT_RECEIVE_ASSIGNMENT_SUCCESS, ASSIGNMENT_UPDATE_ASSIGNMENT_SUCCESS
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
    case ASSIGNMENT_RECEIVE_ASSIGNMENT_SUCCESS:
    case ASSIGNMENT_UPDATE_ASSIGNMENT_SUCCESS:
      return Object.assign({}, state, {
        assignment: action.payload.assignment
      })
    default:
      return state
  }
}
