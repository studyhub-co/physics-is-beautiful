import React from 'react'

// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Row, Col, Button } from 'react-bootstrap'
import { FaChevronLeft, FaAsterisk, FaPlus } from 'react-icons/fa'

import { EditableLabel } from '../../utils/editableLabel'

import { handleFileChange, onChangeExternalUrl } from '../AddTextBookResourceSteps/lib'

export default class AddResourceSolutionsView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      problemsList: props.problemsList
    }

    this.isOneSolutionInProblems = this.isOneSolutionInProblems.bind(this)
    this.prevStepClick = this.prevStepClick.bind(this)
    this.addSolution = this.addSolution.bind(this)
  }

  isOneSolutionInProblems () {
    var problemsList = this.state.problemsList
    for (var x = 0; x < problemsList.length; x++) {
      if (problemsList[x].hasOwnProperty('solutions')) {
        if (problemsList[x].solutions.length > 0) {
          return true
        }
      }
    }
    return false
  }

  addSolution (chapter, problem, file) {
    var problemsList = this.state.problemsList
    for (var x = 0; x < problemsList.length; x++) {
      if (problem.position === problemsList[x].position) {
        if (!problemsList[x].hasOwnProperty('solutions')) {
          problemsList[x].solutions = []
        }
        problemsList[x].solutions.push({'pdf': file, 'position': x})
        this.setState({problemsList: problemsList})
        break
      }
    }
  }

  prevStepClick () {
    this.props.onPrevStep(this.state.problemsList)
  }

  render () {
    return (
      <div>
        <div className={'blue-title'}>
          <Button
            onClick={this.prevStepClick}
          ><FaChevronLeft /> Previous</Button>
          <span style={{padding: '0 2rem'}}>Third step</span>
          <Button
            disabled={!this.isOneSolutionInProblems()}
            onClick={() => { this.props.onFinish(this.state.problemsList) }}
          >Create Resource!</Button>
        </div>
        <div className={'gray-text'}>Add at least one solution (.pdf) </div>
        <br />
        <Row>
          <Col sm={12} md={12}>
            {this.props.problemsList.map(function (problem, i) { // chapters
              return <div key={i}>
                <FaAsterisk />&nbsp;{problem.title}
                { problem.hasOwnProperty('solutions') ? problem.solutions.map(function (solution, i) {
                  var filename = solution.pdf.file.replace(/^.*[\\\/]/, '')
                  return <span key={i} style={{paddingLeft: '2rem'}}>
                    { filename }
                  </span>
                }) : null
                }
                &nbsp;&nbsp;<FaPlus />&nbsp;add solution
                <span
                  className={'blue-text selectable-file'}
                  style={{ paddingLeft: '2rem' }}
                >
                  <input
                    type='file'
                    name='pdf'
                    id={'solution-input-' + problem.position}
                    accept='application/pdf'
                    onChange={(file) =>
                      handleFileChange(file, null, problem, null, (...args) => { this.addSolution(...args) })}
                    style={{fontSize: '1px'}} />
                  <label htmlFor={'solution-input-' + problem.position} style={{cursor: 'pointer'}}>
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
                          onChangeExternalUrl(url, null, problem, (...args) => { this.addSolution(...args) })
                        }
                      }
                      }
                      // defaultValue={'google drive link'}
                      defaultValue={'external link'} />
                  </b>
                </span>
              </div>
            }, this)}
          </Col>
        </Row>
      </div>
    )
  }
}

AddResourceSolutionsView.propTypes = {
  problemsList: PropTypes.array,
  onPrevStep: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  gapiInitState: PropTypes.bool.isRequired
}
