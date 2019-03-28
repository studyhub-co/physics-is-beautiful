import React from 'react'

// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Row, Col, Button } from 'react-bootstrap'
import { FaChevronLeft, FaAsterisk, FaPlus } from 'react-icons/fa'

import { GoogleBookThumbnail } from '../../components/googleBookThumbnail'

import { EditableLabel } from '../../utils/editableLabel'

import { handleFileChange, onChangeExternalUrl } from './lib'

export default class AddTextBookSolutionsView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      chaptersList: props.chaptersList
    }

    this.isOneSolutionInChapters = this.isOneSolutionInChapters.bind(this)
    this.prevStepClick = this.prevStepClick.bind(this)
    // this.onChangeGoogleDriveUrl = this.onChangeGoogleDriveUrl.bind(this)
    // this.getGoogleDriveNameAndUpload = this.getGoogleDriveNameAndUpload.bind(this)
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

  render () {
    return (
      <div>
        <div className={'blue-title'}>
          <Button
            onClick={this.prevStepClick}
          ><FaChevronLeft /> Previous</Button>
          {/*><Glyphicon glyph='chevron-left' /> Previous</Button>*/}
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
                        <FaAsterisk />&nbsp;{problem.title}
                        {/*<Glyphicon glyph='asterisk' />&nbsp;{problem.title}*/}
                        { problem.hasOwnProperty('solutions') ? problem.solutions.map(function (solution, i) {
                          var filename = solution.pdf.file.replace(/^.*[\\\/]/, '')
                          return <span key={i} style={{paddingLeft: '2rem'}}>
                            { filename }
                          </span>
                        }) : null
                        }
                        &nbsp;&nbsp;<FaPlus />&nbsp;add solution
                        {/*&nbsp;&nbsp;<Glyphicon glyph='plus' />&nbsp;add solution*/}
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
                            // onChange={(file) => this.handleFileChange(file, chapter, problem, (...args) => { this.addSolution(...args) })}
                            onChange={(file) =>
                              handleFileChange(file, chapter, problem, null, (...args) => { this.addSolution(...args) })}
                            style={{fontSize: '1px'}} />
                          <label htmlFor={'solution-input-' + chapter.position + problem.position} style={{cursor: 'pointer'}}>
                            pdf
                          </label>
                        </span>
                        <span
                          className={'blue-text'}
                        >
                          <b style={{paddingLeft: '1rem', cursor: 'pointer'}}>
                            <EditableLabel
                              // value={'google drive link'}
                              value={'external link'}
                              onChange={(url) => {
                                if (this.props.gapiInitState) {
                                  // onChangeGoogleDriveUrl(url, chapter, problem, (...args) => { this.addSolution(...args) })
                                  onChangeExternalUrl(url, chapter, problem, (...args) => { this.addSolution(...args) })
                                }
                              }
                              }
                              // defaultValue={'google drive link'}
                              defaultValue={'external link'} />
                          </b>
                          {/*<b style={{paddingLeft: '1rem', cursor: 'pointer'}}>*/}
                            {/*<EditableLabel*/}
                              {/*value={'direct link'}*/}
                              {/*onChange={(url) => {*/}
                                {/*onChangeDirectUrl(url, chapter, problem, (...args) => { this.addSolution(...args) })*/}
                              {/*}*/}
                              {/*}*/}
                              {/*defaultValue={'direct link'} />*/}
                          {/*</b>*/}
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
