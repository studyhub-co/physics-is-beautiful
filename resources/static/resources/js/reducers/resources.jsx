import {
  RESOURCE_RECEIVE_RESOURCE_OPTIONS, RESOURCE_RECEIVE_POPULAR_RESOURCES,
  RESOURCE_RECEIVE_RECENT_RESOURCES, RESOURCE_RECEIVE_NEW_RESOURCES,
  RESOURCE_RECEIVE_RESOURCE, RESOURCE_RECEIVE_PROBLEM, RESOURCE_RECEIVE_PROBLEM_SOLUTION
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
    case RESOURCE_RECEIVE_RESOURCE:
      return Object.assign({}, state, {
        resource: action.payload.resource
      })
    case RESOURCE_RECEIVE_PROBLEM:
      return Object.assign({}, state, {
        problem: action.payload.problem
      })
    case RESOURCE_RECEIVE_PROBLEM_SOLUTION:
      return Object.assign({}, state, {
        solution: action.payload.solution
      })
    default:
      return state
  }
}
