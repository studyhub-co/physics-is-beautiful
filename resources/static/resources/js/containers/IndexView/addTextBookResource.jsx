import React from 'react'

import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import * as resourcesCreators from '../../actions/resources'

import { Grid, Row, Col, Button, Glyphicon, FormGroup, InputGroup, FormControl, Image } from 'react-bootstrap'

import history from '../../history'
import { BASE_URL } from '../../utils/config'
import * as googleCreators from '../../actions/google'

class AddTextBookResourceView extends React.Component {

  componentWillMount () {
    this.props.googleActions.gapiInitialize()
  }

  constructor (props) {
    super(props)
    this.state = {
      ISBNString: '',
      //searchWasRequested: false
    }

    this.searchISBNClick = this.searchISBNClick.bind(this)
    this.handleISBNString = this.handleISBNString.bind(this)
    this.handleISBNInputKeyUp = this.handleISBNInputKeyUp.bind(this)
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
      //this.setState({searchWasRequested: true})
    }
  }

  handleISBNInputKeyUp (e) {
    if (e.keyCode === 13) { // 'enter' key
      this.searchISBNClick(e)
    }
  }

  componentDidMount () {

  }

  onSelectBook (book) {
    // Todo go to the next phase
  }

  render () {
    return (
      <div>
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
                    { this.props.googleBooksList.map(function (book, i) {
                      return <span key={book.id}>
                        <div>
                          { book.volumeInfo.imageLinks.thumbnail
                            ? <Image src={book.volumeInfo.imageLinks.thumbnail} />
                            : <span>No image</span>
                          }
                        </div>
                        <div>
                          { book.volumeInfo.title }
                        </div>
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
    )
  }
}

AddTextBookResourceView.propTypes = {
  // resourcesActions: PropTypes.shape({
  //   fetchResourceOptions: PropTypes.func.isRequired
  // }).isRequired,
  // resourceOptions: PropTypes.object
  googleActions: PropTypes.shape({
    gapiInitialize: PropTypes.func.isRequired,
    googleFetchBooksList: PropTypes.func.isRequired
  }).isRequired,
  gapiInitState: PropTypes.bool,
  googleBooksList: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    gapiInitState: state.google.gapiInitState,
    googleBooksList: state.google.googleBooksList,
    // resourceOptions: state.resources.resourceOptions,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    googleActions: bindActionCreators(googleCreators, dispatch)
    //resourcesActions: bindActionCreators(resourcesCreators, dispatch)
    // tabActions: bindActionCreators(tabsCreators, dispatch),
    // classroomActions: bindActionCreators(classroomCreators, dispatch),
    // googleActions: bindActionCreators(googleCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTextBookResourceView)
export { AddTextBookResourceView as AddTextBookResourceViewNotConnected }
