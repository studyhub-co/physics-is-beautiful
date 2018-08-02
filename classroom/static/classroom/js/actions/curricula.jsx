import { checkHttpStatus, getAxios } from '../utils'
import {
  CURRICULA_RECEIVE_CURRICULA_LIST,
  CURRICULA_RECEIVE_OTHER_CURRICULA_LIST,
  CURRICULA_RECEIVE_EXPANDED_CURRICULUM
} from '../constants'

// const API_PREFIX = '/editor/api/curricula/'
const API_PREFIX = '/api/v1/curricula/curricula/'

export function dataReceiveExpandedCurriculum (curriculum) {
  return {
    type: CURRICULA_RECEIVE_EXPANDED_CURRICULUM,
    payload: {
      curriculum
    }
  }
}

export function curriculaFetchExpandedCurriculum (curriculumUuid) {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + curriculumUuid + '?expand=units.modules')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(dataReceiveExpandedCurriculum(response.data))
      })
  }
}

export function dataReceiveCurriculaList (curriculaList) {
  return {
    type: CURRICULA_RECEIVE_CURRICULA_LIST,
    payload: {
      curriculaList
    }
  }
}

export function curriculaFetchCurriculaList () {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + '?filter=my')
      .then(checkHttpStatus)
      .then((response) => {
        // fix for editor wrong json using
        // convert { "uuid" : { curriculum}, "uuid" : { curriculum2 },  .. } to list [curriculum, curriculum2 ...]
        // var list = Object.keys(response.data).map(function(k) { return response.data[k] })
        // dispatch(dataReceiveCurriculaList(list))
        dispatch(dataReceiveCurriculaList(response.data))
      })
  }
}

export function dataReceiveOtherCurriculaList (curriculaOtherList) {
  return {
    type: CURRICULA_RECEIVE_OTHER_CURRICULA_LIST,
    payload: {
      curriculaOtherList
    }
  }
}

export function curriculaFetchOtherCurriculaList () {
  return (dispatch, state) => {
    return getAxios().get(API_PREFIX + '?filter=default')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(dataReceiveOtherCurriculaList(response.data))
      })
  }
}
