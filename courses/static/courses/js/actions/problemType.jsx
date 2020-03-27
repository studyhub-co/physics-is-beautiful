import { checkHttpStatus, getAxios } from '../utils'
import {
  PROBLEM_TYPES_FETCH_PAGINATED_LIST_OBJECT_REQUEST, PROBLEM_TYPES_RECEIVE_PAGINATED_LIST_OBJECT

} from '../constants'

import { API_PREFIX as BASE_API_PREFIX } from '../utils/config'

const API_PREFIX = BASE_API_PREFIX + 'studio/material-problem-type/'

export function receiveProblemPaginatedListObject (problemTypesPaginatedListObject) {
  return {
    type: PROBLEM_TYPES_RECEIVE_PAGINATED_LIST_OBJECT,
    payload: {
      problemTypesPaginatedListObject: problemTypesPaginatedListObject
    }
  }
}
export function fetchProblemTypePaginatedListObject () {
  return {
    type: PROBLEM_TYPES_FETCH_PAGINATED_LIST_OBJECT_REQUEST
  }
}

export function fetchProblemTypes (nextHref, searchString) {
  return (dispatch, state) => {
    dispatch(fetchProblemTypePaginatedListObject())

    let url = API_PREFIX

    if (searchString) {
      url = API_PREFIX + '?query=' + searchString
    }

    if (nextHref) {
      url = nextHref
    }

    return getAxios().get(url)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveProblemPaginatedListObject(response.data))
      })
  }
}

export function resetProblemTypes () {
  return (dispatch, state) => {
    dispatch(receiveProblemPaginatedListObject(null))
  }
}

export function updateProblemTypeImage (problemType, canvas) {
  return (dispatch, state) => {
    let data = new window.FormData()
    canvas.toBlob(function (blob) {
      data.append('screenshot_url', blob, 'screenshot.png')
      getAxios().patch(`${API_PREFIX}${problemType.uuid}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).catch(error => {
        console.log(error.response)
      })
    })
  }
}
