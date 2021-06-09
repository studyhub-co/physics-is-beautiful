import { MATERIAL_FETCHING, MATERIAL_FETCHING_SUCCESS } from '../constants'

const initialState = {
  material: { isFetching: false, uuid: null },
}

export default function materials(state = initialState, action) {
  switch (action.type) {
    case MATERIAL_FETCHING:
      return {
        ...state,
        material: { isFetching: true },
      }
    case MATERIAL_FETCHING_SUCCESS:
      return {
        ...state,
        material: { isFetching: false, ...action.material },
      }
    default:
      return state
  }
}
