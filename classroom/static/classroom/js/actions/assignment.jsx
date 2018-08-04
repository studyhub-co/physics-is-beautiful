import { checkHttpStatus, getAxios } from '../utils'
import {
  ASSIGNMENTS_RECEIVE_ASSIGNMENTS_LIST, ASSIGNMENT_CREATE_ASSIGNMENT_SUCCESS
  // ASSIGNMENT_UPDATE_ASSIGNMENT_SUCCESS
} from '../constants'

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
    return getAxios().get(API_PREFIX + classroomUuid + '/assignment/')
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(receiveAssignmentsList(response.data))
      })
  }
}

export function assignmentCreationAssignmentSuccess (assignment) {
  return {
    type: ASSIGNMENT_CREATE_ASSIGNMENT_SUCCESS,
    payload: {
      assignment
    }
  }
}

export function assignmentCreateAssignment (assignmentJson, refreshAssignmentsList = false) {
  return (dispatch, state) => {
    return getAxios().post(API_PREFIX + assignmentJson.classroom_uuid + '/assignment/', assignmentJson)
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(assignmentCreationAssignmentSuccess(response.data))
        if (refreshAssignmentsList) {
          dispatch(assignmentFetchAssignmentList(assignmentJson.classroom_uuid))
        }
      })
  }
}

// export function assignmentPartialUpdateSuccess (assignment) {
//   return {
//     type: ASSIGNMENT_UPDATE_ASSIGNMENT_SUCCESS,
//     payload: {
//       assignment
//     }
//   }
// }

export function assignmentPartialUpdateAssignment (assignmentJson, refreshAssignmentsList = false) {
  return (dispatch, state) => {
    return getAxios().patch(API_PREFIX + assignmentJson.classroom_uuid + '/assignment/' + assignmentJson.uuid + '/', assignmentJson)
      .then(checkHttpStatus)
      .then((response) => {
        if (refreshAssignmentsList) {
          dispatch(assignmentFetchAssignmentList(assignmentJson.classroom_uuid))
        }
      })
  }
}
