import {
  RESOURCE_RECEIVE_RESOURCE_OPTIONS,
  RESOURCE_RECEIVE_POPULAR_RESOURCES,
  RESOURCE_RECEIVE_RECENT_RESOURCES,
  RESOURCE_RECEIVE_NEW_RESOURCES
} from '../constants'

const initialState = {
  // classroomList: null,
  // classroomClassroom: undefined
}

export default function resourcesReducer (state = initialState, action) {
  switch (action.type) {
    case RESOURCE_RECEIVE_RESOURCE_OPTIONS:
      return Object.assign({}, state, {
        resourceOptions: action.payload.resourceOptions
      })
    case RESOURCE_RECEIVE_POPULAR_RESOURCES:
      return Object.assign({}, state, {
        popularResourcesList: action.payload.popularResourcesList
      })
    case RESOURCE_RECEIVE_RECENT_RESOURCES:
      return Object.assign({}, state, {
        recentResourcesList: action.payload.recentResourcesList
      })
    case RESOURCE_RECEIVE_NEW_RESOURCES:
      return Object.assign({}, state, {
        newResourcesList: action.payload.newResourcesList
      })
    default:
      return state
  }
}
