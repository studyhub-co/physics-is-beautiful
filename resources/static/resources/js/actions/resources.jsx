import { push } from 'connected-react-router'

import { checkHttpStatus, checkHttpError, getAxios } from '../utils'
import {
  RESOURCE_RECEIVE_RESOURCE_OPTIONS, CREATE_RESOURCE_SUCCESS, RESOURCE_RECEIVE_POPULAR_RESOURCES,
  RESOURCE_RECEIVE_RECENT_RESOURCES, RESOURCE_RECEIVE_NEW_RESOURCES, RESOURCE_RECEIVE_RESOURCE,
  RESOURCE_RECEIVE_PROBLEM, RESOURCE_RECEIVE_PROBLEM_SOLUTION
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
        // TODO redirect to resource page!
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
    type: RESOURCE_RECEIVE_PROBLEM_SOLUTION,
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

export function solutionVote (uuid, val) {
  return (dispatch, state) => {
    return getAxios().post(API_PREFIX + 'solutions/' + uuid + '/vote/', {value: val})
      .catch(checkHttpError)
  }
}

export function solutionVoteAndRefresh (uuid, val) {
  return (dispatch, state) => {
    return dispatch(solutionVote(uuid, val)).then((response) => {
      // reload solutition
      dispatch(fetchSolution(uuid))
    })
  }
}

export function solutionVoteAndRefreshList (uuid, val, problemUuid) {
  return (dispatch, state) => {
    return dispatch(solutionVote(uuid, val)).then((response) => {
      // reload problem
      dispatch(fetchProblem(problemUuid))
    })
  }
}

export function createSolution (file, problem) {
  return (dispatch, state) => {
    let solution = {pdf_id: file.id, textbook_problem_uuid: problem.uuid}

    return getAxios().post(API_PREFIX + 'solutions/', solution)
      .catch(checkHttpError)
      .then((response) => {
        return response
      })
  }
}

export function addSolution (file, problem) {
  return (dispatch, state) => {
    return dispatch(createSolution(file, problem)).then((response) => {
      // reload problem
      dispatch(fetchProblem(problem.uuid))
    })
  }
}

export function createProblem (title, chapter) {
  return (dispatch, state) => {
    let problem = {title: title, textbook_section_id: chapter.id}

    return getAxios().post(API_PREFIX + 'problems/', problem)
      .catch(checkHttpError)
      .then((response) => {
        return response
      })
  }
}

export function addProblem (title, chapter, resource) {
  return (dispatch, state) => {
    return dispatch(createProblem(title, chapter)).then((response) => {
      // reload resource
      dispatch(fetchResource(resource.uuid))
    })
  }
}

export function updateProblem (problem) {
  return (dispatch, state) => {
    return getAxios().patch(API_PREFIX + 'problems/' + problem.uuid + '/', problem)
      .catch(checkHttpError)
      .then((response) => {
        return response
      })
  }
}

export function updateProblemReloadResource (problem, resource) {
  return (dispatch, state) => {
    return dispatch(updateProblem(problem)).then((response) => {
      // reload resource
      dispatch(fetchResource(resource.uuid))
    })
  }
}

/// chapters/sections

export function createChapter (title, resource) {
  return (dispatch, state) => {
    let chapter = {title: title, resource_uuid: resource.uuid}

    return getAxios().post(API_PREFIX + 'chapters/', chapter)
      .catch(checkHttpError)
      .then((response) => {
        return response
      })
  }
}

export function addChapter (title, resource) {
  return (dispatch, state) => {
    return dispatch(createChapter(title, resource)).then((response) => {
      // reload resource
      dispatch(fetchResource(resource.uuid))
    })
  }
}


export function updateChapter (chapter) {
  return (dispatch, state) => {
    return getAxios().patch(API_PREFIX + 'chapters/' + chapter.id + '/', chapter)
      .catch(checkHttpError)
      .then((response) => {
        return response
      })
  }
}

export function updateChapterReloadResource (chapter, resource) {
  return (dispatch, state) => {
    return dispatch(updateChapter(chapter)).then((chapter) => {
      // reload resource
      dispatch(fetchResource(resource.uuid))
    })
  }
}
