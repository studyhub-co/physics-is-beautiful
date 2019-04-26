import React from 'react'

// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Col from 'react-bootstrap/Col'
// import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import { FaChevronLeft, FaChevronRight, FaTimes, FaAsterisk, FaPlus } from 'react-icons/fa'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

// import { EditableExternalEventLabel, EditableLabel } from '../../components/label'
import { EditableExternalEventLabel } from '../../utils/editableLabel'

export default class AddResourceProblemsView extends React.Component {
  constructor (props) {
    super(props)
    // calculate number of chapters
    // var chaptersList = null
    // if (props.chaptersList) {
    //   if (props.chaptersList.length < props.numberOfChapters) {
    //     var a = props.chaptersList
    //     var b = this.generateChaptersList(props.numberOfChapters)
    //
    //     var diffFunc = function comparer (otherArray) {
    //       return function (current) {
    //         return otherArray.filter(function (other) {
    //           return other.position === current.position
    //         }).length === 0
    //       }
    //     }
    //
    //     var onlyInB = b.filter(diffFunc(a))
    //     chaptersList = props.chaptersList.concat(onlyInB)
    //   } else { // if new numberOfChapters < props.chaptersList
    //     chaptersList = props.chaptersList.slice(0, props.numberOfChapters - 1)
    //   }
    // } else {
    //   chaptersList = this.generateChaptersList(props.numberOfChapters)
    // }

    var problemsList = this.generateProblemsList(props.numberOfProblems)

    this.state = {
      problemsList: problemsList,
      lastAddedProblem: null // need to enable edit mode after adding a problem
    }

    this.addProblemClick = this.addProblemClick.bind(this)
    this.onChangeProblemTitle = this.onChangeProblemTitle.bind(this)
    this.nextStepClick = this.nextStepClick.bind(this)
    this.prevStepClick = this.prevStepClick.bind(this)
    this.isOneProblemInResource = this.isOneProblemInResource.bind(this)
  }

  generateProblemsList (numberOfProblem) {
    var problemsList = []
    for (var x = 0; x < numberOfProblem; x++) {
      problemsList.push({title: 'Problem ' + (x + 1), position: x})
    }
    return problemsList
  }

  isOneProblemInResource () {
    var problemsList = this.state.problemsList

    if (problemsList.length > 0) {
      return true
    }

    return false
  }

  addProblemClick () {
    var problemsList = this.state.problemsList
    problemsList.push({
      title: 'Problem ' + (problemsList.length + 1),
      position: problemsList.length
    })

    this.setState({problemsList: problemsList})
  }

  nextStepClick () {
    this.props.onNextStep(this.state.problemsList)
  }

  prevStepClick () {
    this.props.onPrevStep(this.state.problemsList)
  }

  onChangeProblemTitle (newTitle, chapter, position) {
    // if (!newTitle) { return }
    // var chaptersList = this.state.chaptersList
    // for (var x = 0; x < chaptersList.length; x++) {
    //   if (chapter.position === chaptersList[x].position) {
    //     chaptersList[x].problems[position].title = newTitle
    //     this.setState({
    //       chaptersList: chaptersList,
    //       lastAddedProblem: null
    //     })
    //     break
    //   }
    // }
  }

  removeProblemClick (problem) {
    var problemsList = this.state.problemsList
    problemsList.splice(problem.position, 1)

    // recalculate problems positions
    for (var y = 0; y < problemsList.length; y++) {
      problemsList[y].position--
    }

    this.setState({problemsList: problemsList})

    // var chaptersList = this.state.chaptersList
    // for (var x = 0; x < chaptersList.length; x++) {
    //   if (chapter.position === chaptersList[x].position) {
    //     chaptersList[x].problems.splice(problem.position, 1)
    //     // recalculate problems positions
    //     for (var y = problem.position; y < chaptersList[x].problems.length; y++) {
    //       chaptersList[x].problems[y].position--
    //     }
    //     this.setState({
    //       chaptersList: chaptersList
    //     })
    //     break
    //   }
    // }
  }

  render () {
    return (
      <div>
        <div className={'blue-title'}>
          <Button
            onClick={this.prevStepClick}
          ><FaChevronLeft /> Previous</Button>
          <span style={{padding: '0 2rem'}}>Second step</span>
          <Button
            disabled={!this.isOneProblemInResource()}
            onClick={this.nextStepClick}
          >Next <FaChevronRight /></Button>
        </div>
        <div className={'gray-text'}>Add at least one problem</div>
        <br />
        <Row>
          <Col sm={12} md={12}>
            { this.state.problemsList // ============ problems
              ? <div style={{paddingLeft: '2rem'}}>
                { this.state.problemsList.map(function (problem, i) {
                  var editMode = false
                  // if (this.state.lastAddedProblem &&
                  //   this.state.lastAddedProblem.chapter.position === chapter.position &&
                  //   this.state.lastAddedProblem.position === problem.position) {
                  //   editMode = true
                  // }

                  return <div key={i} className={'blue-text'}>
                    {/* remove problem button */}
                    <span
                      className={'red-text'}
                      style={{cursor: 'pointer'}}
                      onClick={() => this.removeProblemClick(problem)}
                      title={'Remove the problem'}
                    >
                      <FaTimes />&nbsp;
                    </span>
                    <FaAsterisk />&nbsp;
                    <EditableExternalEventLabel
                      editMode={editMode}
                      value={problem.title}
                      onChange={(problemString) => { this.onChangeProblemTitle(problemString, i) }}
                      defaultValue={i + 1} />
                  </div>
                }, this)}</div>
              : null }
            <div // Add problem button
              style={{paddingLeft: '2rem', cursor: 'pointer'}}
              onClick={() => this.addProblemClick()}
              className={'blue-text'}>
              <FaPlus /> Add problem
              {/*<Glyphicon glyph='plus' /> Add problem*/}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

AddResourceProblemsView.propTypes = {
  numberOfProblems: PropTypes.number.isRequired,
  problemsList: PropTypes.array,
  onNextStep: PropTypes.func.isRequired,
  onPrevStep: PropTypes.func.isRequired
}
