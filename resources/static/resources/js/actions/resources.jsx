import { push } from 'connected-react-router'

import { checkHttpStatus, getAxios } from '../utils'
import {
  RESOURCE_RECEIVE_RESOURCE_OPTIONS, CREATE_RESOURCE_SUCCESS, RESOURCE_RECEIVE_POPULAR_RESOURCES,
  RESOURCE_RECEIVE_RECENT_RESOURCES, RESOURCE_RECEIVE_NEW_RESOURCES, RESOURCE_RECEIVE_RESOURCE,
  RESOURCE_RECEIVE_PROBLEM, RESOURCE_RECEIVE_SOLUTION
} from '../constants'

import { BASE_URL, API_PREFIX } from '../utils/config'

export function receiveResourceOptions (resourceOptions) {
  return {
    type: RESOURCE_RECEIVE_RESOURCE_OPTIONS,
    payload: {
      resourceOptions
    }
  }
}

export function fetchResourceOptions () {
  return (dispatch, state) => {
    return getAxios().options(API_PREFIX)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveResourceOptions(response.data))
      })
  }
}

// export function createResourceSuccess (resource) {
//   return {
//     type: CREATE_RESOURCE_SUCCESS,
//     payload: {
//       resource
//     }
//   }
// }

export function createResource (chaptersList) {
  return (dispatch, state) => {
    return getAxios().post(API_PREFIX, chaptersList)
      .then(checkHttpStatus)
      .then((response) => {
        // dispatch(createResourceSuccess(response.data))
        dispatch(push(BASE_URL)) // redirect ro main page
        // if (typeof callback === 'function') {
        //   callback(response.data)
        // }
      })
  }
}

export function receiveNewResourcesList (newResourcesList) {
  return {
    type: RESOURCE_RECEIVE_NEW_RESOURCES,
    payload: {
      newResourcesList
    }
  }
}

export function loadNewResourcesList (url) {
  return (dispatch, state) => {
    return getAxios().get(url || API_PREFIX)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveNewResourcesList(response.data))
      })
  }
}

export function receivePopularResourcesList (popularResourcesList) {
  return {
    type: RESOURCE_RECEIVE_POPULAR_RESOURCES,
    payload: {
      popularResourcesList
    }
  }
}

export function loadPopularResourcesList (url) {
  return (dispatch, state) => {
    return getAxios().get(url || API_PREFIX + '?ordering=-count_views')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receivePopularResourcesList(response.data))
      })
  }
}

export function receiveRecentResourcesList (recentResourcesList) {
  return {
    type: RESOURCE_RECEIVE_RECENT_RESOURCES,
    payload: {
      recentResourcesList
    }
  }
}

export function loadRecentResourcesList (url) {
  return (dispatch, state) => {
    return getAxios().get(url || API_PREFIX + '?filter=recent')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveRecentResourcesList(response.data))
      })
  }
}

export function receiveResource (resource) {
  return {
    type: RESOURCE_RECEIVE_RESOURCE,
    payload: {
      resource
    }
  }
}

export function fetchResource (uuid) {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + uuid)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveResource(response.data))
      })
  }
}

export function receiveProblem (problem) {
  return {
    type: RESOURCE_RECEIVE_PROBLEM,
    payload: {
      problem
    }
  }
}

export function fetchProblem (uuid) {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + 'problems/' + uuid)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveProblem(response.data))
      })
  }
}

export function receiveSolution (solution) {
  return {
    type: RESOURCE_RECEIVE_SOLUTION,
    payload: {
      solution
    }
  }
}

export function fetchSolution (uuid) {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + 'solutions/' + uuid)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveSolution(response.data))
      })
  }
}
