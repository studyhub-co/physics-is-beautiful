import React from 'react'

// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Row, Col, Glyphicon, Button } from 'react-bootstrap'

import { GoogleBookThumbnail } from '../../components/googleBookThumbnail'

import { EditableLabel } from '../../components/label'

export default class AddTextBookSolutionsView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      chaptersList: props.chaptersList
    }

    // this.addProblemClick = this.addProblemClick.bind(this)
    // this.onChangeChapterTitle = this.onChangeChapterTitle.bind(this)
    // this.onChangeProblemTitle = this.onChangeProblemTitle.bind(this)
    this.isOneSolutionInChapters = this.isOneSolutionInChapters.bind(this)
  }

  // generateChaptersList (numberOfChapters) {
  //   var chaptersList = []
  //   for (var x = 0; x < numberOfChapters; x++) {
  //     chaptersList.push({title: 'Chapter ' + (x + 1), position: x})
  //   }
  //   return chaptersList
  // }

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

  addSolutionClick (chapter, problem) {
    var chaptersList = this.state.chaptersList
    for (var x = 0; x < chaptersList.length; x++) {
      if (chapter.position === chaptersList[x].position) {
        if (chaptersList[x].hasOwnProperty('problems')) {
          for (var y = 0; y < chaptersList[x].problems.length; y++) {
            if (!chaptersList[x].problems[y].hasOwnProperty('solutions')) {
              chaptersList[x].problems[y].solutions = []
            }
            // TODO open file-upload box and upload file to the server
            // this.setState({chaptersList: chaptersList})
            break
          }
        }
      }
    }
  }

  // onChangeChapterTitle (newTitle, chapter) {
  //   if (!newTitle) { return }
  //   var chaptersList = this.state.chaptersList
  //   for (var x = 0; x < chaptersList.length; x++) {
  //     if (chapter.position === chaptersList[x].position) {
  //       chaptersList[x].title = newTitle
  //       break
  //     }
  //   }
  //   this.setState({chaptersList: chaptersList})
  // }
  //
  // onChangeProblemTitle (newTitle, chapter, position) {
  //   if (!newTitle) { return }
  //   var chaptersList = this.state.chaptersList
  //   for (var x = 0; x < chaptersList.length; x++) {
  //     if (chapter.position === chaptersList[x].position) {
  //       chaptersList[x].problems[position] = newTitle
  //       this.setState({chaptersList: chaptersList})
  //       break
  //     }
  //   }
  // }

  render () {
    return (
      <div>
        <div className={'blue-title'}>
          <span style={{paddingRight: '2rem'}}>Third step</span>
          <Button
            disabled={!this.isOneSolutionInChapters()}
            onClick={this.nextStepClick}
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
                        <span
                          className={'blue-text'}
                          style={{paddingLeft: '2rem', cursor: 'pointer'}}
                          onClick={() => this.addSolutionClick(chapter, problem)}
                        >
                          <Glyphicon glyph='plus' />&nbsp;add solution
                        </span>
                        {/*<EditableLabel*/}
                          {/*value={problem}*/}
                          {/*onChange={(problemString) => { this.onChangeProblemTitle(problemString, chapter, i) }}*/}
                          {/*defaultValue={i + 1} />*/}
                      </div>
                    }, this)}</div>
                  : null }
                {/*<div // Add problem button*/}
                  {/*style={{paddingLeft: '2rem', cursor: 'pointer'}}*/}
                  {/*onClick={() => this.addProblemClick(chapter)}*/}
                  {/*className={'blue-text'}>*/}
                  {/*<Glyphicon glyph='plus' /> Add problem*/}
                {/*</div>*/}
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
  chaptersList: PropTypes.array
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
