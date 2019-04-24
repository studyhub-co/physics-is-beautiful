import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as resourcesCreators from '../../actions/resources'
import { FaSearch, FaPlus } from 'react-icons/fa'

import { Row, Col, Button, Form, InputGroup } from 'react-bootstrap'

// import * as googleCreators from '../../actions/google'

// import { GoogleBookThumbnail } from '../../components/googleBookThumbnail'
// import AddTextBookChaptersView from '../AddTextBookResourceSteps/1_addTextBookChapters'
// import AddTextBookProblemsView from '../AddTextBookResourceSteps/2_addTextBookProblems'
// import AddTextBookSolutionsView from '../AddTextBookResourceSteps/3_addTextBookSolutions'

class AddStandardizedTestResourceView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      ISBNString: '',
      selectedGoogleBook: null,
      numberOfChapters: 0,
      chaptersList: null,
      step: 0
    }

    this.onAddNumberOfChapters = this.onAddNumberOfChapters.bind(this)
    this.onFinish = this.onFinish.bind(this)
    this.onNextStep = this.onNextStep.bind(this)
    this.onPrevStep = this.onPrevStep.bind(this)
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.step !== nextState.step) {
      this.props.onStepUpdated(nextState.step)
    }
  }

  onAddNumberOfChapters (number) {
    this.setState({numberOfChapters: parseInt(number), step: 2})
  }

  onNextStep (chaptersList) {
    this.setState({chaptersList: chaptersList, step: this.state.step + 1})
  }

  onPrevStep (chaptersList) {
    this.setState({chaptersList: chaptersList, step: this.state.step - 1})
  }

  onFinish (chaptersList) {
    // create resource
    var textBookResource = {resource_type: 'TS',
      metadata: {data: this.state.selectedGoogleBook},
      sections: chaptersList
    }

    this.props.resourcesActions.createResource(textBookResource)
    // { resource_type: 'TB', metadata: {data: json(this.props.selectedGoogleBook), sections: chaptersList} }
  }

  render () {
    var toReturn

    if (this.state.step === 0) {
      toReturn = <div>
        <Row>
          <Col sm={12} md={12}>
            <Form.Group>
              <InputGroup>
                {/* TODO (1) test number  (2) test year  (3) a pdf of the exam*/}
                <Form.Control
                  type='text'
                  value={this.state.ISBNString}
                  placeholder='Enter test number'
                  // onChange={this.handleISBNString}
                  // onKeyUp={this.handleISBNInputKeyUp}
                />
                {/*<InputGroup.Append>*/}
                  {/*<Button*/}
                    {/*onClick={this.searchISBNClick}*/}
                  {/*><FaSearch /></Button>*/}
                  {/*/!*><Glyphicon glyph='search' /></Button>*!/*/}
                {/*</InputGroup.Append>*/}
              </InputGroup>
              <br />
              <InputGroup>
                <Form.Control
                  type='text'
                  value={this.state.ISBNString}
                  placeholder='Enter test year'
                  // onChange={this.handleISBNString}
                  // onKeyUp={this.handleISBNInputKeyUp}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
          </Col>
        </Row>
      </div>
    } else if (this.state.step === 1) {
      // var numberOfChapters = ''
      // if (numberOfChapters !== 0) {
      //   numberOfChapters = this.state.numberOfChapters
      // }

      // toReturn = <AddTextBookChaptersView
      //   numberOfChapters={numberOfChapters}
      //   googleBook={this.state.selectedGoogleBook}
      //   onAddNumberOfChapters={this.onAddNumberOfChapters} />
    } else if (this.state.step === 2) {
      // toReturn = <AddTextBookProblemsView
      //   googleBook={this.state.selectedGoogleBook}
      //   numberOfChapters={this.state.numberOfChapters}
      //   chaptersList={this.state.chaptersList}
      //   onNextStep={this.onNextStep}
      //   onPrevStep={this.onPrevStep}
      // />
    } else if (this.state.step === 3) {
      // toReturn = <AddTextBookSolutionsView
      //   googleBook={this.state.selectedGoogleBook}
      //   numberOfChapters={this.state.numberOfChapters}
      //   chaptersList={this.state.chaptersList}
      //   onPrevStep={this.onPrevStep}
      //   onFinish={this.onFinish}
      //   gapiInitState={this.props.gapiInitState}
      // />
    }

    return (
      toReturn
    )
  }
}

AddStandardizedTestResourceView.propTypes = {
  onStepUpdated: PropTypes.func,
  resourcesActions: PropTypes.shape({
    createResource: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    // resourceOptions: state.resources.resourceOptions,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    resourcesActions: bindActionCreators(resourcesCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStandardizedTestResourceView)
export { AddStandardizedTestResourceView as AddStandardizedTestResourceViewNotConnected }
