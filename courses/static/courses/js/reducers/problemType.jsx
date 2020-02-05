import {
  PROBLEM_TYPES_FETCH_LIST_REQUEST, PROBLEM_TYPES_RECEIVE_LIST
} from '../constants'

const initialState = {
  problemTypesList: null,
  isFetching: false
}

export default function problemType (state = initialState, action) {
  switch (action.type) {
    case PROBLEM_TYPES_RECEIVE_LIST:
      return Object.assign({}, state, {
        problemTypesList: action.payload.problemTypesList,
        isFetching: false
      })
    case PROBLEM_TYPES_FETCH_LIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    default:
      return state
  }
}
