import { push } from 'connected-react-router'

import $script from 'scriptjs'

import { checkHttpStatus, getAxios } from '../utils'

import {
  GOOGLE_RECEIVE_CLASSROOMS_LIST, GOOGLE_INIT_STATE_CHANGED
} from '../constants'

var CLIENT_ID = '1090448644110-r8o52h1sqpbq7pp1j8ougcr1e35qicqg.apps.googleusercontent.com'
var API_KEY = 'AIzaSyBNaX7xo_Vo08-myCDEzY4AKZkkfyJYIc8'

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/classroom.courses.readonly' +
  ' https://www.googleapis.com/auth/classroom.coursework.students.readonly' +
  ' https://www.googleapis.com/auth/plus.me'

// var DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest']

export function googleInitStateChanged (gapiInitState) {
  return {
    type: GOOGLE_INIT_STATE_CHANGED,
    payload: {
      gapiInitState
    }
  }
}

export function gapiInitialize () {
  return (dispatch, state) => {
    function handleClientLoad () {
      gapi.load('client:auth2', initGapiClient)
      // gapi.load('client:auth2', {'callback': initGapiClient})
    }

    function initGapiClient () {
      gapi.client.init({
        // discoveryDocs: DISCOVERY_DOCS,
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
      }).then(function () {
        gapi.client.load('classroom', 'v1', () => {
          dispatch(googleInitStateChanged(true))
        })
      }).catch(e => {
        console.log('error:', e)
      })
    }
    $script('https://apis.google.com/js/api.js', function () {
      handleClientLoad()
    })
  }
}

function listCourses (callback, dispatch) {
  gapi.client.classroom.courses.list(
    {teacherId: gapi.auth2.getAuthInstance().currentUser.get()['El']}
  ).then(function (response) {
    dispatch(callback(response.result.courses))
  })
}

export function receiveGoogleClassroomsList (googleClassroomsList) {
  return {
    type: GOOGLE_RECEIVE_CLASSROOMS_LIST,
    payload: {
      googleClassroomsList
    }
  }
}

export function googleFetchClassroomList () {
  return (dispatch, state) => {
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      gapi.auth2.getAuthInstance().signIn().then(function () {
        listCourses(receiveGoogleClassroomsList, dispatch)
      })
    } else {
      listCourses(receiveGoogleClassroomsList, dispatch)
    }
  }
}
