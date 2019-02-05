import { push } from 'connected-react-router'

import $script from 'scriptjs'

import {
  GOOGLE_RECEIVE_BOOKS_LIST, GOOGLE_INIT_STATE_CHANGED
  // , GOOGLE_RECEIVE_CLASSROOMS_STUDENTS_LIST
} from '../constants'

// TODO as Open Source we must replace this values with data from dev or AWS environment while webpack compiling bundle
var CLIENT_ID = '1090448644110-r8o52h1sqpbq7pp1j8ougcr1e35qicqg.apps.googleusercontent.com'
var API_KEY = 'AIzaSyBNaX7xo_Vo08-myCDEzY4AKZkkfyJYIc8'

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'profile https://www.googleapis.com/auth/books https://www.googleapis.com/auth/drive.readonly'

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
      gapi.auth2.init({
        // discoveryDocs: DISCOVERY_DOCS,
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
      }).then(function () {
        gapi.client.load('books', 'v1', () => {
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

export function receiveGoogleBooksList (googleBooksList) {
  return {
    type: GOOGLE_RECEIVE_BOOKS_LIST,
    payload: {
      googleBooksList
    }
  }
}

export function googleFetchBooksList (isbn) {
  return (dispatch, state) => {
    gapi.client.request({
      'path': 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn
    }).then(function (response) {
      dispatch(receiveGoogleBooksList(response.result.items || []))
    }, function (reason) {
      if (reason.status === 401) {
        // broken access token
        gapi.auth2.getAuthInstance().signIn().then(function (user) {
          gapi.client.request({
            'path': 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn
              }).then(function (response) {
                  dispatch(receiveGoogleBooksList(response.result.items || []))
              })
        })
      }
      console.log('Error: ' + reason.result.error.message)
    })
  }
}
