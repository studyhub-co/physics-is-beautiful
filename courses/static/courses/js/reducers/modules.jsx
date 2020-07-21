import {
  MODULE_FETCHING, MODULE_FETCHING_SUCCESS
} from '../constants'

const initialState = {
  module: { isFetching: false, uuid: null }
}

export default function modules (state = initialState, action) {
  switch (action.type) {
    case MODULE_FETCHING:
      return {
        ...state,
        module: { isFetching: true }
      }
    case MODULE_FETCHING_SUCCESS:
      return {
        ...state,
        module: { isFetching: false, ...action.module }
      }
    default:
      return state
  }
}
