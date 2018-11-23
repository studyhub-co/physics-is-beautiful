import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Row, Col, Glyphicon, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap'

import { GoogleBookThumbnail } from '../../components/googleBookThumbnail'

import { EditableLabel } from '../../components/label'

class AddTextBookProblemsView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // numberOfChapters: props.numberOfChapters,
      chaptersList: this.generateChaptersList(props.numberOfChapters)
    }

    // this.handleNumberOfChapters = this.handleNumberOfChapters.bind(this)
    // this.handleNumberOfChaptersInputKeyUp = this.handleNumberOfChaptersInputKeyUp.bind(this)
    // this.addNumberOfChaptersClick = this.addNumberOfChaptersClick.bind(this)
  }

  generateChaptersList (numberOfChapters) {
    var chaptersList = []
    for (var x = 0; x < numberOfChapters; x++) {
      chaptersList.push({title: 'Chapter ' + (x + 1), position: x})
    }
    return chaptersList
  }

  // handleNumberOfChapters (e) {
  //   // remove all chars
  //   var s = e.target.value.replace(/\D/g, '')
  //
  //   this.setState({numberOfChapters: s})
  // }
  //
  // handleNumberOfChaptersInputKeyUp (e) {
  //   if (e.keyCode === 13) { // 'enter' key
  //     this.addNumberOfChaptersClick(e)
  //   }
  // }
  //
  addProblemClick () {

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

  render () {
    return (
      <div>
        <div className={'blue-title'}>Second step</div>
        <div className={'gray-text'}>Add at least 1 problem</div>
        <br />
        <Row>
          <Col sm={8} md={8}>
            {this.state.chaptersList.map(function (chapter, i) {
              return <div key={chapter.position}>
                <EditableLabel
                  value={chapter.title}
                  onChange={(title) => { this.onChangeChapterTitle(title, chapter) }}
                  defaultValue={chapter.title} />
                <div
                  style={{paddingLeft: '2rem', cursor: 'pointer'}}
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
  numberOfChapters: PropTypes.number
}

const mapStateToProps = (state) => {
  return {
    // gapiInitState: state.google.gapiInitState,
    // googleBooksList: state.google.googleBooksList,
    // resourceOptions: state.resources.resourceOptions,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    // googleActions: bindActionCreators(googleCreators, dispatch)
    //resourcesActions: bindActionCreators(resourcesCreators, dispatch)
    // tabActions: bindActionCreators(tabsCreators, dispatch),
    // classroomActions: bindActionCreators(classroomCreators, dispatch),
    // googleActions: bindActionCreators(googleCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTextBookProblemsView)
export { AddTextBookProblemsView as AddTextBookProblemsViewNotConnected }
