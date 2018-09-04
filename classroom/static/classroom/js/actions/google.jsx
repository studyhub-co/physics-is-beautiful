import { push } from 'connected-react-router'

import $script from 'scriptjs'

import { checkHttpStatus, getAxios } from '../utils'

import { bulkStudentsUpdate } from '../actions/classroom'

import {
  GOOGLE_RECEIVE_CLASSROOMS_LIST, GOOGLE_INIT_STATE_CHANGED, GOOGLE_RECEIVE_CLASSROOMS_STUDENTS_LIST
} from '../constants'

// TODO as Open Source we must replace this values with data from dev or AWS environment while webpack compiling bundle
var CLIENT_ID = '1090448644110-r8o52h1sqpbq7pp1j8ougcr1e35qicqg.apps.googleusercontent.com'
var API_KEY = 'AIzaSyBNaX7xo_Vo08-myCDEzY4AKZkkfyJYIc8'

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/classroom.courses.readonly' +
  ' https://www.googleapis.com/auth/classroom.rosters.readonly' +
  ' https://www.googleapis.com/auth/classroom.profile.emails' +
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

// export function receiveGoogleClassroomsStudentsList (googleClassroomsStudentsList) {
//   return {
//     type: GOOGLE_RECEIVE_CLASSROOMS_STUDENTS_LIST,
//     payload: {
//       googleClassroomsStudentsList
//     }
//   }
// }

function listCoursesStudents (classrooms, dispatch) {
  var batch = gapi.client.newBatch()

  for (var i = 0; i < classrooms.length; i++) {
    var searchRequest = function () {
      return gapi.client.classroom.courses.students.list({
        'courseId': classrooms[i].id,
        'pageSize': 0
      })
      // return gapi.client.request({
      //   'path': '/v1/courses/' + classrooms[i].id + '/students',
      //   'params': {'pageSize': 0}
      // })
    }
    var request = searchRequest()
    batch.add(request)
  }
  batch.then(function (response) {
    for (var key in response.result) { // responses (courses)
      if ('students' in response.result[key].result) {
        var googleCourseID = null
        var googleCourceStudentsList = []

        if (response.result[key].result.students.length > 0) {
          googleCourseID = response.result[key].result.students[0]['courseId']
        }
        // create googleCourceStudentsList with pib classroom id
        for (var j = 0; j < response.result[key].result.students.length; j++) { // students
          var student = response.result[key].result.students[j]
          googleCourceStudentsList.push(
            {'email': student['profile']['emailAddress'],
              'first_name': student['profile']['name']['givenName'],
              'second_name': student['profile']['name']['familyName'],
              'full_name': student['profile']['name']['fullName']
              // .....
            }
          )
        }
      }
      // dispatch(bulkStudentsUpdate()) TODO save students in aclassroom
    }
    //
  })
}

export function googleSaveClassroomsStudentsList (classrooms) {
  return (dispatch, state) => {
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      gapi.auth2.getAuthInstance().signIn().then(function () {
        listCoursesStudents(classrooms, dispatch)
      })
    } else {
      listCoursesStudents(classrooms, dispatch)
    }
  }
}
