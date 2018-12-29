import React from 'react'

// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Row, Col, Glyphicon, Button } from 'react-bootstrap'

import { GoogleBookThumbnail } from '../../components/googleBookThumbnail'

import { EditableLabel } from '../../utils/editableLabel'

import { checkHttpStatus, getAxios } from '../../utils'
import { API_PREFIX } from '../../utils/config'

// const SCOPES = 'https://www.googleapis.com/auth/drive.readonly'

export default class AddTextBookSolutionsView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      chaptersList: props.chaptersList
    }

    this.isOneSolutionInChapters = this.isOneSolutionInChapters.bind(this)
    this.prevStepClick = this.prevStepClick.bind(this)
    this.onChangeGoogleDriveUrl = this.onChangeGoogleDriveUrl.bind(this)
    this.getGoogleDriveNameAndUpload = this.getGoogleDriveNameAndUpload.bind(this)
  }

  isOneSolutionInChapters () {
    var chaptersList = this.state.chaptersList
    for (var x = 0; x < chaptersList.length; x++) {
      if (chaptersList[x].hasOwnProperty('problems')) {
        if (chaptersList[x].problems.length > 0) {
          for (var y = 0; y < chaptersList[x].problems.length; y++) {
            if (chaptersList[x].problems[y].hasOwnProperty('solutions')) {
              if (chaptersList[x].problems[y].solutions.length > 0) {
                return true
              }
            }
          }
        }
      }
    }
    return false
  }

  addSolution (chapter, problem, file) {
    var chaptersList = this.state.chaptersList
    for (var x = 0; x < chaptersList.length; x++) {
      if (chapter.position === chaptersList[x].position) {
        if (chaptersList[x].hasOwnProperty('problems')) {
          for (var y = 0; y < chaptersList[x].problems.length; y++) {
            if (problem.position === chaptersList[x].problems[y].position) {

              if (!chaptersList[x].problems[y].hasOwnProperty('solutions')) {
                chaptersList[x].problems[y].solutions = []
              }
              chaptersList[x].problems[y].solutions.push({'pdf': file, 'position': y})
              this.setState({chaptersList: chaptersList})
              break
            }
          }
        }
      }
    }
  }

  prevStepClick () {
    this.props.onPrevStep(this.state.chaptersList)
  }

  handleFileChange (file, chapter, problem, filename) {
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
    getAxios().post(API_PREFIX + 'upload_solution_pdf/', formData)
      .then(checkHttpStatus)
      .then((response) => {
        this.addSolution(chapter, problem, response.data)
      })
  }

  getGoogleDriveNameAndUpload (id, chapter, problem, accessToken, mediaData) {
    var url = 'https://www.googleapis.com/drive/v2/files/' + id
    var that = this
    if (url) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken)
      xhr.onload = function () {
        var jsonResp = JSON.parse(xhr.response);
        that.handleFileChange(mediaData, chapter, problem, jsonResp['title'])
      }
      xhr.send()
    }
  }

  onChangeGoogleDriveUrl (urlString, chapter, problem) {
    // download from google drive and upload
    // existing link
    // https://drive.google.com/open?id=0B1Kj1ZClSFusekhNdGRhdDNYY0E
    if (!urlString || !this.props.gapiInitState) return
    // https://www.googleapis.com/drive/v2/files/fileId
    try {
      var url = new URL(urlString)
    } catch (e) {
      return
    }

    var id = url.searchParams.get('id')
    var that = this
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
          that.getGoogleDriveNameAndUpload(id, chapter, problem, accessToken, file)
        }
        xhr.send()
      })
    }
  }

  render () {
    return (
      <div>
        <div className={'blue-title'}>
          <Button
            onClick={this.prevStepClick}
          ><Glyphicon glyph='chevron-left' /> Previous</Button>
          <span style={{padding: '0 2rem'}}>Third step</span>
          <Button
            disabled={!this.isOneSolutionInChapters()}
            onClick={() => { this.props.onFinish(this.state.chaptersList) }}
          >Create Resource!</Button>
        </div>
        <div className={'gray-text'}>3. Add at least one solution (.pdf) </div>
        <br />
        <Row>
          <Col sm={8} md={8}>
            {this.props.chaptersList.map(function (chapter, i) { // chapters
              return <div key={chapter.position}>
                {/*<EditableLabel*/}
                  {/*value={chapter.title}*/}
                  {/*onChange={(title) => { this.onChangeChapterTitle(title, chapter) }}*/}
                  {/*defaultValue={chapter.title} />*/}
                <div>{chapter.title}</div>
                { chapter.problems // chapter problems
                  ? <div style={{paddingLeft: '2rem'}}>
                    { chapter.problems.map(function (problem, i) {
                      return <div key={i}>
                        <Glyphicon glyph='asterisk' />&nbsp;{problem.title}
                        { problem.hasOwnProperty('solutions') ? problem.solutions.map(function (solution, i) {
                          var filename = solution.pdf.file.replace(/^.*[\\\/]/, '')
                          return <span key={i} style={{paddingLeft: '2rem'}}>
                            { filename }
                          </span>
                        }) : null
                        }
                        &nbsp;&nbsp;<Glyphicon glyph='plus' />&nbsp;add solution
                        <span
                          className={'blue-text selectable-file'}
                          style={{ paddingLeft: '2rem' }}
                          // onClick={() => this.addSolutionClick(chapter, problem)}
                        >
                          <input
                            type='file'
                            name='pdf'
                            id={'solution-input-' + chapter.position + problem.position}
                            accept='application/pdf'
                            onChange={(file) => this.handleFileChange(file, chapter, problem)}
                            style={{fontSize: '1px'}} />
                          <label htmlFor={'solution-input-' + chapter.position + problem.position} style={{cursor: 'pointer'}}>
                            pdf
                          </label>
                        </span>
                        <span
                          style={{paddingLeft: '2rem', cursor: 'pointer'}}
                          className={'blue-text'}
                        >
                          <b>
                            <EditableLabel
                              value={'google drive link'}
                              onChange={(url) => { this.onChangeGoogleDriveUrl(url, chapter, problem) }}
                              defaultValue={'google drive link'} />
                          </b>
                        </span>
                      </div>
                    }, this)}</div>
                  : null }
              </div>
            }, this)}
          </Col>
          <Col sm={4} md={4}>
            <GoogleBookThumbnail googleBook={this.props.googleBook} />
          </Col>
        </Row>
      </div>
    )
  }
}

AddTextBookSolutionsView.propTypes = {
  googleBook: PropTypes.object,
  chaptersList: PropTypes.array,
  onPrevStep: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  gapiInitState: PropTypes.bool.isRequired
}

// const mapStateToProps = (state) => {
//   return {
//     // gapiInitState: state.google.gapiInitState,
//     // googleBooksList: state.google.googleBooksList,
//     // resourceOptions: state.resources.resourceOptions,
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch,
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(AddTextBookSolutionsView)
// export { AddTextBookSolutionsView as AddTextBookSolutionsViewNotConnected }
