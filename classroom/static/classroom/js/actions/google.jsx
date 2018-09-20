import { push } from 'connected-react-router'

import $script from 'scriptjs'

import { checkHttpStatus, getAxios } from '../utils'

import { classroomCreateClassroom, bulkStudentsUpdate, classroomFetchTeacherClassroomsList } from '../actions/classroom'

import {
  GOOGLE_RECEIVE_CLASSROOMS_LIST, GOOGLE_INIT_STATE_CHANGED
  // , GOOGLE_RECEIVE_CLASSROOMS_STUDENTS_LIST
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

function processNextPage (pageToken, googleCourseID, googleCourceStudentsList, whenAllpageProcessedCallback) {
  var batch = gapi.client.newBatch()

  var searchRequest = function () {
    return gapi.client.classroom.courses.students.list({
      'courseId': googleCourseID,
      'pageSize': 30,
      'pageToken': pageToken
    })
  }

  var request = searchRequest()
  batch.add(request)

  batch.then(function (response) {
    for (var key in response.result) { // responses (courses)
      if ('students' in response.result[key].result) {
        for (var j = 0; j < response.result[key].result.students.length; j++) { // students
          var student = response.result[key].result.students[j]
          googleCourceStudentsList.push(
            {
              'email': student['profile']['emailAddress'],
              'first_name': student['profile']['name']['givenName'],
              'last_name': student['profile']['name']['familyName']
            }
          )
        }
      }
      if ('nextPageToken' in response.result[key].result) {
        processNextPage(response.result[key].result['nextPageToken'], googleCourseID, googleCourceStudentsList, whenAllpageProcessedCallback)
      } else {
        // stop paginations and save students
        whenAllpageProcessedCallback(googleCourceStudentsList)
      }
    }
  })
}

function listCoursesStudents (googleClassrooms, refreshClassroomsStudentsList) {
  /***
   * each classroom in googleClassrooms must contain pib_classroom_uuid key
   */
  return (dispatch, state) => {
    var batch = gapi.client.newBatch()

    for (var i = 0; i < googleClassrooms.length; i++) {
      var searchRequest = function () {
        return gapi.client.classroom.courses.students.list({
          'courseId': googleClassrooms[i].id,
          'pageSize': 30
        })
      }
      var request = searchRequest()
      batch.add(request)
    }
    batch.then(function (response) {
      for (var key in response.result) { // responses (courses)
        var googleCourseID = null

        if ('students' in response.result[key].result) {
          var pibClassroomID = null
          // var classroomId = classrooms['pib_classroom_uuid']
          var googleCourceStudentsList = []

          // if (response.result[key].result.students.length > 0) { // not need for remove students
          googleCourseID = response.result[key].result.students[0]['courseId']
          // find pib classroom uuid with google classroom uuid
          for (var i = 0; i < googleClassrooms.length; i++) {
            if (googleClassrooms[i]['id'] === googleCourseID) {
              pibClassroomID = googleClassrooms[i]['pib_classroom_uuid']
            }
          }
          // }
          // create googleCourceStudentsList with pib classroom id
          for (var j = 0; j < response.result[key].result.students.length; j++) { // students
            var student = response.result[key].result.students[j]
            googleCourceStudentsList.push(
              {
                'email': student['profile']['emailAddress'],
                'first_name': student['profile']['name']['givenName'],
                'last_name': student['profile']['name']['familyName']
              }
            )
          }
        }

        // if have next page then create a new query
        if ('nextPageToken' in response.result[key].result) {
          processNextPage(response.result[key].result['nextPageToken'],
            googleCourseID,
            googleCourceStudentsList,
            (allpagesGoogleCourceStudentsList) => {
              dispatch(bulkStudentsUpdate(pibClassroomID, allpagesGoogleCourceStudentsList, 'google', refreshClassroomsStudentsList))
            })
        } else { // we have only one students page
          // if (pibClassroomID && googleCourceStudentsList.length > 0) {
          if (pibClassroomID) {
            dispatch(bulkStudentsUpdate(pibClassroomID, googleCourceStudentsList, 'google', refreshClassroomsStudentsList))
          } else {
            dispatch(classroomFetchTeacherClassroomsList())
          }
        }
      }
    })
  }
}

export function googleFetchAndSaveClassroomsStudents (classrooms, refreshClassroomsStudentsList) {
  return (dispatch, state) => {
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      gapi.auth2.getAuthInstance().signIn().then(function () {
        dispatch(listCoursesStudents(classrooms, refreshClassroomsStudentsList))
      })
    } else {
      dispatch(listCoursesStudents(classrooms, refreshClassroomsStudentsList))
    }
  }
}

export function googleSaveClassroomsWithStudents (googleClassrooms, googleCurriculumSelected) {
  return (dispatch, state) => {
    for (var i = 0; i < googleClassrooms.length; i++) {
      var googleClassRoom = googleClassrooms[i]
      var newClassroom = {}
      newClassroom['name'] = googleClassRoom['name']
      newClassroom['curriculum_uuid'] = googleCurriculumSelected.uuid
      newClassroom['external_classroom'] = {}
      newClassroom['external_classroom']['external_id'] = googleClassRoom['id']
      newClassroom['external_classroom']['name'] = googleClassRoom['name']
      newClassroom['external_classroom']['teacher_id'] = googleClassRoom['ownerId']
      newClassroom['external_classroom']['code'] = googleClassRoom['enrollmentCode']
      newClassroom['external_classroom']['alternate_link'] = googleClassRoom['alternateLink']

      var getCallback = function (j) {
        return (createdClassroom) => {
          // add pib_classroom_uuid to each google classroom for students update
          googleClassrooms[j]['pib_classroom_uuid'] = createdClassroom.uuid
          if (j === googleClassrooms.length - 1) {
            dispatch(googleFetchAndSaveClassroomsStudents(googleClassrooms))
          }
        }
      }

      // create classroom
      dispatch(classroomCreateClassroom(newClassroom,
        false,
        getCallback(i)
      ))
    }
  }
}
