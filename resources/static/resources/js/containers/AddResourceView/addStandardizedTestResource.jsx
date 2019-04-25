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

import AddNumberOfProblemsView from '../AddStandardizedTestResourceSteps/1_addResourceProblems'
import AddResourceProblemsView from '../AddStandardizedTestResourceSteps/2_addResourceProblems'
import { handleFileChange } from '../AddTextBookResourceSteps/lib'
import { checkHttpStatus, getAxios } from '../../utils'
import { API_PREFIX } from '../../utils/config'

class AddStandardizedTestResourceView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      testNumber: '',
      testYear: '',
      numberOfProblems: 0,
      problemsList: null,
      validForm: '',
      step: 0
    }

    this.onAddNumberOfProblems = this.onAddNumberOfProblems.bind(this)
    this.onFinish = this.onFinish.bind(this)
    this.onNextStep = this.onNextStep.bind(this)
    this.onPrevStep = this.onPrevStep.bind(this)
    this.handleTestYear = this.handleTestYear.bind(this)
    this.handleTestNumber = this.handleTestNumber.bind(this)
    this.onAddResource = this.onAddResource.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.step !== nextState.step) {
      this.props.onStepUpdated(nextState.step)
    }
  }

  onAddNumberOfProblems (number) {
    this.setState({numberOfProblems: parseInt(number), step: 2})
  }

  onNextStep (problemsList) {
    this.setState({problemsList: problemsList, step: this.state.step + 1})
  }

  onPrevStep (problemsList) {
    this.setState({problemsList: problemsList, step: this.state.step - 1})
  }

  onFinish (problemsList) {
    // create resource
    var standardizedTestResource = {resource_type: 'TS',
      problems: problemsList
    }

    this.props.resourcesActions.createResource(standardizedTestResource)
    // { resource_type: 'TB', metadata: {data: json(this.props.selectedGoogleBook), sections: chaptersList} }
  }

  handleTestNumber (e) {
    this.setState(
      {testNumber: e.target.value},
      this.validateForm
    )
  }

  handleTestYear (e) {
    // validate year
    var year = e.target.value
    if (new Date().getFullYear() >= year) {
      this.setState(
        {testYear: year},
        this.validateForm
      )
    }
  }

  validateForm () {
    if (this.state.testYear > 1900 &&
      this.state.testYear <= new Date().getFullYear() &&
      this.state.testNumber > 0) {
      this.setState({validForm: true})
    } else {
      this.setState({validForm: false})
    }
  }

  handleFileChange (file, filename, callback) {
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
        callback(response.data)
      })
  }

  onAddResource () {
    this.setState({step: 1})
  }

  render () {
    var toReturn

    var numberOfProblems = this.state.numberOfProblems

    if (this.state.step === 0) {
      toReturn = <div>
        <Row>
          <Col sm={12} md={12}>
            <Form.Group>
              <InputGroup>
                <Form.Control
                  type='number'
                  value={this.state.testNumber}
                  placeholder='Enter test number'
                  onChange={this.handleTestNumber}
                  // onKeyUp={this.handleISBNInputKeyUp}
                />
              </InputGroup>
              <br />
              <InputGroup>
                <Form.Control
                  type='number'
                  value={this.state.testYear}
                  placeholder='Enter test year'
                  onChange={this.handleTestYear}
                  // onKeyUp={this.handleISBNInputKeyUp}
                />
              </InputGroup>
              <InputGroup>
                <span
                  className={'blue-text selectable-file'}
                >
                  <input
                    type='file'
                    name='pdf'
                    id={'pdf-of-the-exam'}
                    accept='application/pdf'
                    onChange={(file) => { handleFileChange(file, null, (...args) => { this.addExamPdfFile(...args) }) }}
                    style={{fontSize: '1px'}} />
                  <label htmlFor={'pdf-of-the-exam'} style={{cursor: 'pointer'}}>
                    pdf
                  </label>
                </span>
              </InputGroup>
            </Form.Group>

          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
            <Button
              onClick={() => { this.onAddResource() }}
              disabled={!this.state.validForm}
              className={'common-button'}>
              <FaPlus /> Add
            </Button>
          </Col>
        </Row>
      </div>
    } else if (this.state.step === 1) {
      toReturn = <AddNumberOfProblemsView
        numberOfProblems={numberOfProblems}
        onAddNumberOfProblems={this.onAddNumberOfProblems} />
    } else if (this.state.step === 2) {
      toReturn = <AddResourceProblemsView
        numberOfProblems={numberOfProblems}
        problemsList={this.state.problemsList}
        onNextStep={this.onNextStep}
        onPrevStep={this.onPrevStep}
      />
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
