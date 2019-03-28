import React from 'react'

// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Col from 'react-bootstrap/Col'
// import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import { FaChevronLeft, FaChevronRight, FaTimes, FaAsterisk, FaPlus } from 'react-icons/fa'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import { GoogleBookThumbnail } from '../../components/googleBookThumbnail'

// import { EditableExternalEventLabel, EditableLabel } from '../../components/label'
import { EditableExternalEventLabel, EditableLabel } from '../../utils/editableLabel'

export default class AddTextBookProblemsView extends React.Component {
  constructor (props) {
    super(props)
    // calculate number of chapters
    var chaptersList = null
    if (props.chaptersList) {
      if (props.chaptersList.length < props.numberOfChapters) {
        var a = props.chaptersList
        var b = this.generateChaptersList(props.numberOfChapters)

        var diffFunc = function comparer (otherArray) {
          return function (current) {
            return otherArray.filter(function (other) {
              return other.position === current.position
            }).length === 0
          }
        }

        var onlyInB = b.filter(diffFunc(a))
        chaptersList = props.chaptersList.concat(onlyInB)
      } else { // if new numberOfChapters < props.chaptersList
        chaptersList = props.chaptersList.slice(0, props.numberOfChapters - 1)
      }
    } else {
      chaptersList = this.generateChaptersList(props.numberOfChapters)
    }

    this.state = {
      // numberOfChapters: props.numberOfChapters,
      chaptersList: chaptersList,
      lastAddedProblem: null // need to enable edit mode after adding a problem
      // {chapter, problem.position}
    }

    this.addProblemClick = this.addProblemClick.bind(this)
    this.onChangeChapterTitle = this.onChangeChapterTitle.bind(this)
    this.onChangeProblemTitle = this.onChangeProblemTitle.bind(this)
    this.isOneProblemInChapters = this.isOneProblemInChapters.bind(this)
    this.nextStepClick = this.nextStepClick.bind(this)
    this.prevStepClick = this.prevStepClick.bind(this)
    this.addChapterClick = this.addChapterClick.bind(this)
  }

  generateChaptersList (numberOfChapters) {
    var chaptersList = []
    for (var x = 0; x < numberOfChapters; x++) {
      chaptersList.push({title: 'Chapter ' + (x + 1), position: x})
    }
    return chaptersList
  }

  isOneProblemInChapters () {
    var chaptersList = this.state.chaptersList
    for (var x = 0; x < chaptersList.length; x++) {
      if (chaptersList[x].hasOwnProperty('problems')) {
        if (chaptersList[x].problems.length > 0) {
          return true
        }
      }
    }
    return false
  }

  componentDidUpdate (prevProps, prevState) {

  }

  addProblemClick (chapter) {
    var chaptersList = this.state.chaptersList
    for (var x = 0; x < chaptersList.length; x++) {
      if (chapter.position === chaptersList[x].position) {
        if (!chaptersList[x].hasOwnProperty('problems')) {
          chaptersList[x].problems = []
        }
        var problemPosition = chaptersList[x].problems.length
        chaptersList[x].problems.push({
          title: '' + (chaptersList[x].problems.length + 1),
          position: problemPosition
        })
        var lastAddedProblem = {chapter: chapter, position: problemPosition}
        this.setState({chaptersList: chaptersList, lastAddedProblem: lastAddedProblem})
        break
      }
    }
  }

  nextStepClick () {
    this.props.onNextStep(this.state.chaptersList)
  }

  prevStepClick () {
    this.props.onPrevStep(this.state.chaptersList)
  }

  onChangeChapterTitle (newTitle, chapter) {
    if (!newTitle) { return }
    var chaptersList = this.state.chaptersList
    for (var x = 0; x < chaptersList.length; x++) {
      if (chapter.position === chaptersList[x].position) {
        chaptersList[x].title = newTitle
        break
      }
    }
    this.setState({chaptersList: chaptersList})
  }

  onChangeProblemTitle (newTitle, chapter, position) {
    if (!newTitle) { return }
    var chaptersList = this.state.chaptersList
    for (var x = 0; x < chaptersList.length; x++) {
      if (chapter.position === chaptersList[x].position) {
        chaptersList[x].problems[position].title = newTitle
        this.setState({
          chaptersList: chaptersList,
          lastAddedProblem: null
        })
        break
      }
    }
  }

  addChapterClick () {
    var chaptersList = this.state.chaptersList
    var chaptersListLength = this.state.chaptersList.length

    chaptersList.push({title: 'Chapter ' + (chaptersListLength + 1), position: chaptersListLength})

    this.setState({chaptersList: chaptersList})
  }

  removeChapterClick (chapter) {
    var chaptersList = this.state.chaptersList
    for (var x = 0; x < chaptersList.length; x++) {
      if (chapter.position === chaptersList[x].position) {
        chaptersList.splice(x, 1)
        // recalculate chapters positions
        for (var y = x; y < chaptersList.length; y++) {
          chaptersList[y].position--
        }
        this.setState({
          chaptersList: chaptersList
        })
        break
      }
    }
  }

  removeProblemClick (chapter, problem) {
    var chaptersList = this.state.chaptersList
    for (var x = 0; x < chaptersList.length; x++) {
      if (chapter.position === chaptersList[x].position) {
        chaptersList[x].problems.splice(problem.position, 1)
        // recalculate problems positions
        for (var y = problem.position; y < chaptersList[x].problems.length; y++) {
          chaptersList[x].problems[y].position--
        }
        this.setState({
          chaptersList: chaptersList
        })
        break
      }
    }
  }

  render () {
    return (
      <div>
        <div className={'blue-title'}>
          <Button
            onClick={this.prevStepClick}
          ><FaChevronLeft /> Previous</Button>
            {/*<Glyphicon glyph='chevron-left' /> Previous</Button>*/}
          <span style={{padding: '0 2rem'}}>Second step</span>
          <Button
            disabled={!this.isOneProblemInChapters()}
            onClick={this.nextStepClick}
          >Next <FaChevronRight /></Button>
            {/*<Glyphicon glyph='chevron-right' /></Button>*/}
        </div>
        <div className={'gray-text'}>Add at least one problem</div>
        <br />
        <Row>
          <Col sm={8} md={8}>
            {this.state.chaptersList.map(function (chapter, i) { // ============ chapters
              return <div key={chapter.position}>
                {/* remove chapter button */}
                <span
                  className={'red-text'}
                  style={{cursor: 'pointer'}}
                  onClick={() => this.removeChapterClick(chapter)}
                  title={'Remove the chapter'}
                >
                  {/*<Glyphicon glyph='remove' />&nbsp;*/}
                  <FaTimes />&nbsp;
                </span>
                <EditableLabel
                  value={chapter.title}
                  onChange={(title) => { this.onChangeChapterTitle(title, chapter) }}
                  // defaultValue={chapter.title}
                />
                { chapter.problems // ============ chapter problems
                  ? <div style={{paddingLeft: '2rem'}}>
                    { chapter.problems.map(function (problem, i) {
                      var editMode = false
                      if (this.state.lastAddedProblem &&
                        this.state.lastAddedProblem.chapter.position === chapter.position &&
                        this.state.lastAddedProblem.position === problem.position) {
                        editMode = true
                      }

                      return <div key={i} className={'blue-text'}>
                        {/* remove problem button */}
                        <span
                          className={'red-text'}
                          style={{cursor: 'pointer'}}
                          onClick={() => this.removeProblemClick(chapter, problem)}
                          title={'Remove the problem'}
                        >
                          {/*<Glyphicon glyph='remove' />&nbsp;*/}
                          <FaTimes />&nbsp;
                        </span>
                        {/*<Glyphicon glyph='asterisk' />&nbsp;*/}
                        <FaAsterisk />&nbsp;
                        <EditableExternalEventLabel
                          editMode={editMode}
                          value={problem.title}
                          onChange={(problemString) => { this.onChangeProblemTitle(problemString, chapter, i) }}
                          defaultValue={i + 1} />
                      </div>
                    }, this)}</div>
                  : null }
                <div // Add problem button
                  style={{paddingLeft: '2rem', cursor: 'pointer'}}
                  onClick={() => this.addProblemClick(chapter)}
                  className={'blue-text'}>
                  <FaPlus /> Add problem
                  {/*<Glyphicon glyph='plus' /> Add problem*/}
                </div>
              </div>
            }, this)}
            <div // Add chapter button
              style={{cursor: 'pointer'}}
              onClick={() => this.addChapterClick()}
              className={'blue-text'}>
              {/*<Glyphicon glyph='plus' /> Add chapter*/}
              <FaPlus /> Add chapter
            </div>
          </Col>
          <Col sm={4} md={4}>
            <GoogleBookThumbnail googleBook={this.props.googleBook} />
          </Col>
        </Row>
      </div>
    )
  }
}

AddTextBookProblemsView.propTypes = {
  googleBook: PropTypes.object,
  numberOfChapters: PropTypes.number.isRequired,
  chaptersList: PropTypes.array,
  onNextStep: PropTypes.func.isRequired,
  onPrevStep: PropTypes.func.isRequired
}

