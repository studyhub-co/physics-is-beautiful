import { push } from 'connected-react-router'

// import { google } from 'googleapis'

import { checkHttpStatus, getAxios } from '../utils'

import {
  GOOGLE_RECEIVE_CLASSROOM_LIST
} from '../constants'

export function receiveClassroomsList (studentClassroomAssignments) {
  return {
    type: GOOGLE_RECEIVE_CLASSROOM_LIST,
    payload: {
      studentClassroomAssignments
    }
  }
}

export function googleFetchClassroomList (classroomUuid, userName) {
  return (dispatch, state) => {

    // TODO access google API with Bearer token

    // return getAxios().get(API_PREFIX + classroomUuid + '/students/' + userName + '/assignments/')
    //   .then(checkHttpStatus)
    //   .then((response) => {
    //     dispatch(receiveClassroomsList(response.data))
    //   })
  }
}


