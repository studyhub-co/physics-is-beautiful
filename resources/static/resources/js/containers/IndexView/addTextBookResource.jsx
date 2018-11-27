import React from 'react'

import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import * as resourcesCreators from '../../actions/resources'

import { Row, Col, Button, Glyphicon, FormGroup, InputGroup, FormControl } from 'react-bootstrap'

import history from '../../history'
import { BASE_URL } from '../../utils/config'

import * as googleCreators from '../../actions/google'

import { GoogleBookThumbnail } from '../../components/googleBookThumbnail'
import AddTextBookChaptersView from '../AddTextBookResourceSteps/1_addTextBookChapters'
import AddTextBookProblemsView from '../AddTextBookResourceSteps/2_addTextBookProblems'
import AddTextBookSolutionsView from '../AddTextBookResourceSteps/3_addTextBookSolutions'

class AddTextBookResourceView extends React.Component {
  componentWillMount () {
    this.props.googleActions.gapiInitialize()
  }

  constructor (props) {
    super(props)
    this.state = {
      ISBNString: '',
      selectedGoogleBook: null,
      numberOfChapters: 0,
      chaptersList: null,
      step: 0
    }

    this.searchISBNClick = this.searchISBNClick.bind(this)
    this.handleISBNString = this.handleISBNString.bind(this)
    this.handleISBNInputKeyUp = this.handleISBNInputKeyUp.bind(this)
    this.onSelectBook = this.onSelectBook.bind(this)
    this.onAddNumberOfChapters = this.onAddNumberOfChapters.bind(this)
    this.onFinish = this.onFinish.bind(this)
    this.onNextStep = this.onNextStep.bind(this)
    this.onPrevStep = this.onPrevStep.bind(this)
  }

  handleISBNString (e) {
    // remove all chars
    var s = e.target.value.replace(/\D/g, '')

    this.setState({ISBNString: s})
  }

  searchISBNClick (e) {
    var ISBNString = this.state.ISBNString
    if (ISBNString) {
      //  load data from google books API
      this.props.googleActions.googleFetchBooksList(ISBNString)
    }
  }

  handleISBNInputKeyUp (e) {
    if (e.keyCode === 13) { // 'enter' key
      this.searchISBNClick(e)
    }
  }

  componentDidMount () {

  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.step !== nextState.step) {
      this.props.onStepUpdated(nextState.step)
    }
  }

  onSelectBook (book) {
    this.setState({selectedGoogleBook: book, step: 1})
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
    // TODO create resource
  }

  render () {
    var toReturn

    if (this.state.step === 0) {
      toReturn = <div>
        <Row>
          <Col sm={12} md={12}>
            <FormGroup>
              <InputGroup>
                <FormControl
                  type='text'
                  disabled={!this.props.gapiInitState}
                  value={this.state.ISBNString}
                  placeholder='Enter textbook ISBN'
                  onChange={this.handleISBNString}
                  onKeyUp={this.handleISBNInputKeyUp}
                />
                <InputGroup.Button>
                  <Button
                    onClick={this.searchISBNClick}
                  ><Glyphicon glyph='search' /></Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
            {this.props.googleBooksList
              ? <div>
                { this.props.googleBooksList.length > 0
                  // TODO show array of found books
                  ? <div>
                    { this.props.googleBooksList.slice(0, 10).map(function (book, i) {
                      return <span key={book.id}>
                        <GoogleBookThumbnail googleBook={book} />
                        <Button onClick={() => { this.onSelectBook(book) }} className={'common-button'}>
                          <Glyphicon glyph='plus' /> Select
                        </Button>
                      </span>
                    }, this)
                    }
                  </div>
                  : <div>
                    Book not found
                  </div>
                }
              </div>
              : null}
          </Col>
        </Row>
      </div>
    } else if (this.state.step === 1) {
      var numberOfChapters = ''
      if (numberOfChapters !== 0) {
        numberOfChapters = this.state.numberOfChapters
      }

      toReturn = <AddTextBookChaptersView
        numberOfChapters={numberOfChapters}
        googleBook={this.state.selectedGoogleBook}
        onAddNumberOfChapters={this.onAddNumberOfChapters} />
    } else if (this.state.step === 2) {
      toReturn = <AddTextBookProblemsView
        googleBook={this.state.selectedGoogleBook}
        numberOfChapters={this.state.numberOfChapters}
        chaptersList={this.state.chaptersList}
        onNextStep={this.onNextStep}
        onPrevStep={this.onPrevStep}
      />
    } else if (this.state.step === 3) {
      toReturn = <AddTextBookSolutionsView
        googleBook={this.state.selectedGoogleBook}
        numberOfChapters={this.state.numberOfChapters}
        chaptersList={this.state.chaptersList}
        onPrevStep={this.onPrevStep}
        onFinish={this.onFinish}
      />
    }

    return (
      toReturn
    )
  }
}

AddTextBookResourceView.propTypes = {
  googleActions: PropTypes.shape({
    gapiInitialize: PropTypes.func.isRequired,
    googleFetchBooksList: PropTypes.func.isRequired
  }).isRequired,
  gapiInitState: PropTypes.bool,
  googleBooksList: PropTypes.array,
  onStepUpdated: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    gapiInitState: state.google.gapiInitState,
    googleBooksList: state.google.googleBooksList
    // resourceOptions: state.resources.resourceOptions,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    googleActions: bindActionCreators(googleCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTextBookResourceView)
export { AddTextBookResourceView as AddTextBookResourceViewNotConnected }
