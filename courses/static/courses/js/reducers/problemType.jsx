import {
  PROBLEM_TYPES_FETCH_PAGINATED_LIST_OBJECT_REQUEST, PROBLEM_TYPES_RECEIVE_PAGINATED_LIST_OBJECT
} from '../constants'

const initialState = {
  problemTypesPaginatedListObject: null,
  isFetching: false
}

export default function problemType (state = initialState, action) {
  switch (action.type) {
    case PROBLEM_TYPES_RECEIVE_PAGINATED_LIST_OBJECT:
      
      console.log(action);
      
      return Object.assign({}, state, {
        problemTypesPaginatedListObject: action.payload.problemTypesPaginatedListObject,
        isFetching: false
      })
    case PROBLEM_TYPES_FETCH_PAGINATED_LIST_OBJECT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    default:
      return state
  }
}
