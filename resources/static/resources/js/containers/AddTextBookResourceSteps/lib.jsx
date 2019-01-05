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
      //this.addSolution(chapter, problem, response.data)
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
      var jsonResp = JSON.parse(xhr.response);
      //that.handleFileChange(mediaData, chapter, problem, jsonResp['title'])
      handleFileChange(mediaData, chapter, problem, jsonResp['title'], callback, urlString)
    }
    xhr.send()
  }
}

export function onChangeGoogleDriveUrl (urlString, chapter, problem, callback) {
  // download from google drive and upload to the API
  // https://drive.google.com/open?id=0B1Kj1ZClSFusekhNdGRhdDNYY0E
  if (!urlString) return
  // https://www.googleapis.com/drive/v2/files/fileId
  try {
    var url = new URL(urlString)
  } catch (e) {
    return
  }

  var id = url.searchParams.get('id')
  // var that = this
  url = 'https://www.googleapis.com/drive/v2/files/' + id + '?alt=media'
  if (url) {
    var SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

    var authData = {
      client_id: '1090448644110-r8o52h1sqpbq7pp1j8ougcr1e35qicqg.apps.googleusercontent.com',
      scope: SCOPES,
      immediate: false
    }
    gapi.auth.authorize(authData, function (response) {
      // TODO check if token exist
      var accessToken = gapi.auth.getToken().access_token
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.responseType = 'blob'
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken)
      xhr.onload = function () {
        var file = {}
        file.target = {}
        file.target.files = [ xhr.response, ]
        // that.handleFileChange(file, chapter, problem))
        // that.getGoogleDriveNameAndUpload(id, chapter, problem, accessToken, file)
        getGoogleDriveNameAndUpload(id, chapter, problem, accessToken, file, callback, urlString)
      }
      xhr.send()
    })
  }
}