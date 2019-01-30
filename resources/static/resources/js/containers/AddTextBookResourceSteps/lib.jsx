import { API_PREFIX } from '../../utils/config'
import { checkHttpStatus, getAxios } from '../../utils'

export function handleFileChange (file, chapter, problem, filename, callback, urlString) {
  // Seems we don't need to use global state
  if (!file || file.target.files.length === 0) {
    return
  }

  var formData = new FormData()
  if (filename) {
    formData.append('file', file.target.files[0], filename)
  } else {
    formData.append('file', file.target.files[0])
  }

  if (urlString) {
    formData.append('external_url', urlString)
  }
  getAxios().post(API_PREFIX + 'upload_solution_pdf/', formData)
    .then(checkHttpStatus)
    .then((response) => {
      callback(chapter, problem, response.data)
    })
}

function getGoogleDriveNameAndUpload (id, chapter, problem, accessToken, mediaData, callback, urlString) {
  var url = 'https://www.googleapis.com/drive/v2/files/' + id
  // var that = this
  if (url) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken)
    xhr.onload = function () {
      var jsonResp = JSON.parse(xhr.response)
      //that.handleFileChange(mediaData, chapter, problem, jsonResp['title'])
      handleFileChange(mediaData, chapter, problem, jsonResp['title'], callback, urlString)
    }
    xhr.send()
  }
}

export function downloadGoogleDriveUrl (urlString, callback) {
  try {
    var url = new URL(urlString)
  } catch (e) {
    return
  }

  var id = url.searchParams.get('id')
  // var that = this
  url = 'https://www.googleapis.com/drive/v2/files/' + id + '?alt=media'
  if (url) {
    let downloadFile = function (accessToken) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.responseType = 'blob'
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken)
      xhr.onload = function (e) {
        if (e.target.status === 403) {
          alert('You don\'t have permission to download the file')
          return
        }
        if (e.target.status === 401) {
          // user remove permission from https://myaccount.google.com/permissions , gapi use old token
          gapi.auth2.getAuthInstance().signIn().then(function (user) {
            // need user allow popup windows
            downloadFile(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token)
          })
        } else {
          callback(xhr.response, id, accessToken)
        }
      }
      xhr.send()
    }

    // check that user logged in google
    if (gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token) {
      downloadFile(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token)
    } else {
    // user not loggen in google / TODO it seems we need to check scopes
      gapi.auth2.getAuthInstance().signIn().then(function (user) {
        downloadFile(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token)
      })
    }
  }
}

export function onChangeDirectUrl (urlString, chapter, problem, callback) {
  try {
    var url = new URL(urlString)
  } catch (e) {
    return
  }
  // download file
  getAxios().post(API_PREFIX + 'upload_direct_pdf/', {url: url})
    .then(checkHttpStatus)
    .then((response) => {
      callback(chapter, problem, response.data)
    })
}

export function onChangeGoogleDriveUrl (urlString, chapter, problem, callback) {
  // download from google drive and upload to the API
  // https://drive.google.com/open?id=0B1Kj1ZClSFusekhNdGRhdDNYY0E
  downloadGoogleDriveUrl(urlString,
    (response, id, accessToken) => {
      var file = {}
      file.target = {}
      file.target.files = [ response, ]
      // that.handleFileChange(file, chapter, problem))
      // that.getGoogleDriveNameAndUpload(id, chapter, problem, accessToken, file)
      getGoogleDriveNameAndUpload(id, chapter, problem, accessToken, file, callback, urlString)
    })
}

export function onChangeExternalUrl (...args) {
  let fileUrl = args[0]
  if (fileUrl.startsWith('https://drive.google.com/')) {
    onChangeGoogleDriveUrl(...args)
  } else {
    onChangeDirectUrl(...args)
  }
}
