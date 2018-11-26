import React from 'react'

// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Row, Col, Glyphicon, Button } from 'react-bootstrap'

import { GoogleBookThumbnail } from '../../components/googleBookThumbnail'

import { EditableLabel } from '../../components/label'

export default class AddTextBookProblemsView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // numberOfChapters: props.numberOfChapters,
      chaptersList: this.generateChaptersList(props.numberOfChapters)
    }

    this.addProblemClick = this.addProblemClick.bind(this)
    this.onChangeChapterTitle = this.onChangeChapterTitle.bind(this)
    this.onChangeProblemTitle = this.onChangeProblemTitle.bind(this)
    this.isOneProblemInChapters = this.isOneProblemInChapters.bind(this)
    this.nextStepClick = this.nextStepClick.bind(this)
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

  addProblemClick (chapter) {
    var chaptersList = this.state.chaptersList
    for (var x = 0; x < chaptersList.length; x++) {
      if (chapter.position === chaptersList[x].position) {
        if (!chaptersList[x].hasOwnProperty('problems')) {
          chaptersList[x].problems = []
        }
        chaptersList[x].problems.push({
          title: '' + (chaptersList[x].problems.length + 1),
          index: chaptersList[x].problems.length
        })
        this.setState({chaptersList: chaptersList})
        break
      }
    }
  }

  nextStepClick () {
    this.props.onNextStep(this.state.chaptersList)
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
        this.setState({chaptersList: chaptersList})
        break
      }
    }
  }

  render () {
    return (
      <div>
        <div className={'blue-title'}>
          <span style={{paddingRight: '2rem'}}>Second step</span>
          <Button
            disabled={!this.isOneProblemInChapters()}
            onClick={this.nextStepClick}
          >Next step</Button>
        </div>
        <div className={'gray-text'}>Add at least one problem</div>
        <br />
        <Row>
          <Col sm={8} md={8}>
            {this.state.chaptersList.map(function (chapter, i) { // chapters
              return <div key={chapter.position}>
                <EditableLabel
                  value={chapter.title}
                  onChange={(title) => { this.onChangeChapterTitle(title, chapter) }}
                  defaultValue={chapter.title} />
                { chapter.problems // chapter problems
                  ? <div style={{paddingLeft: '2rem'}}>
                    { chapter.problems.map(function (problem, i) {
                      return <div key={i} className={'blue-text'}>
                        <Glyphicon glyph='asterisk' />&nbsp;
                        <EditableLabel
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
                  <Glyphicon glyph='plus' /> Add problem
                </div>
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

AddTextBookProblemsView.propTypes = {
  googleBook: PropTypes.object,
  numberOfChapters: PropTypes.number.isRequired,
  onNextStep: PropTypes.func.isRequired
}

// const mapStateToProps = (state) => {
//   return {
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(AddTextBookProblemsView)
// export { AddTextBookProblemsView as AddTextBookProblemsViewNotConnected }
