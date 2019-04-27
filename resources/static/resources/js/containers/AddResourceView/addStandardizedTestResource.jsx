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
import AddResourceSolutionsView from '../AddStandardizedTestResourceSteps/3_addResourceSolutions'
// import { checkHttpStatus, getAxios } from '../../utils'
// import { API_PREFIX } from '../../utils/config'
import * as googleCreators from '../../actions/google'

class AddStandardizedTestResourceView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      testNumber: '',
      testYear: '',
      numberOfProblems: 0,
      problemsList: null,
      pdfFile: '',
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
    this.handleTestYear = this.handleTestYear.bind(this)
  }

  componentWillMount () {
    this.props.googleActions.gapiInitialize()
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.step !== nextState.step) {
      this.props.onStepUpdated(nextState.step)
    }
  }

  onAddNumberOfProblems (number) {
    this.setState({
      numberOfProblems: parseInt(number),
      step: 2
    })
  }

  onNextStep (problemsList) {
    this.setState({
      problemsList: problemsList,
      step: this.state.step + 1,
      numberOfProblems: problemsList.length
    })
  }

  onPrevStep (problemsList) {
    this.setState({
      problemsList: problemsList,
      step: this.state.step - 1,
      numberOfProblems: problemsList.length
    })
  }

  onFinish (problemsList) {
    // create resource
    var standardizedTestResource = {
      resource_type: 'TS',
      problems: problemsList,
      standardized_test_info: {
        // test_number:
      }
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
      this.state.testNumber > 0 &&
      this.state.pdfFile
    ) {
      this.setState({validForm: true})
    } else {
      this.setState({validForm: false})
    }
  }

  handleFileChange (event, callback) {
    if (!event || event.target.files.length === 0) {
      return
    }

    this.setState(
      {pdfFile: event.target.files[0]},
      this.validateForm
    )

    // var formData = new FormData()
    // if (filename) {
    //   formData.append('file', file.target.files[0], filename)
    // } else {
    //   formData.append('file', file.target.files[0])
    // }

    // getAxios().post(API_PREFIX + 'upload_exam_pdf/', formData)
    //   .then(checkHttpStatus)
    //   .then((response) => {
    //     callback(response.data)
    //   })
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
              <br />
              <InputGroup>
                { this.state.pdfFile ? <span>{this.state.pdfFile.name}&nbsp;</span> : null }
                <span
                  className={'blue-text selectable-file'}
                >
                  <input
                    type='file'
                    name='pdf'
                    id={'pdf-of-the-exam'}
                    accept='application/pdf'
                    onChange={(event) => { this.handleFileChange(event, (...args) => { this.addExamPdfFile(...args) }) }}
                    style={{fontSize: '1px'}} />
                  <label htmlFor={'pdf-of-the-exam'} style={{cursor: 'pointer'}}>
                    Attach pdf of the exam...
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
      toReturn = <AddResourceSolutionsView
        numberOfProblems={numberOfProblems}
        problemsList={this.state.problemsList}
        onPrevStep={this.onPrevStep}
        onFinish={this.onFinish}
        gapiInitState={this.props.gapiInitState}
      />
    }

    return (
      toReturn
    )
  }
}

AddStandardizedTestResourceView.propTypes = {
  googleActions: PropTypes.shape({
    gapiInitialize: PropTypes.func.isRequired,
  }).isRequired,
  gapiInitState: PropTypes.bool,
  onStepUpdated: PropTypes.func,
  resourcesActions: PropTypes.shape({
    createResource: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    gapiInitState: state.google.gapiInitState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    googleActions: bindActionCreators(googleCreators, dispatch),
    resourcesActions: bindActionCreators(resourcesCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStandardizedTestResourceView)
export { AddStandardizedTestResourceView as AddStandardizedTestResourceViewNotConnected }
