import { checkHttpStatus, getAxios } from '../utils'
import { ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST } from '../constants'

import { BASE_URL, API_PREFIX } from '../utils/config'

export function receiveAssignmentsList (assignmentsList) {
  return {
    type: ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST,
    payload: {
      assignmentsList
    }
  }
}

export function assignmentFetchAssignmentList (classroomUuid) {
  return (dispatch, state) => {
    // dispatch(classroomFetchClassroomlistRequest()) // to the future
    return getAxios().get(API_PREFIX + '?filter=as_teacher')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveAssignmentsList(response.data))
      })
  }
}