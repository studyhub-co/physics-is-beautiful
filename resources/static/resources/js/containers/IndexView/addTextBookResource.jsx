import React from 'react'

import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import * as resourcesCreators from '../../actions/resources'

import { Grid, Row, Col, Button, Glyphicon, FormGroup, InputGroup, FormControl } from 'react-bootstrap'

import history from '../../history'
import { BASE_URL } from '../../utils/config'

class AddTextBookResourceView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      ISBNString: ''
    }

    this.searchISBNClick = this.searchISBNClick.bind(this)
    this.handleISBNString = this.handleISBNString.bind(this)
    this.handleISBNInputKeyUp = this.handleISBNInputKeyUp.bind(this)
  }

  handleISBNString (e) {
    if (!e.target.value) {
      this.setState({ISBNString: e.target.value}) // reset
    } else {
      this.setState({ISBNString: e.target.value})
    }
  }

  searchISBNClick (e) {
    var ISBNString = this.state.ISBNString
    if (ISBNString) {
      // TODO load data from google books API
    }
  }

  handleISBNInputKeyUp (e) {
    if (e.keyCode === 13) { // 'enter' key
      this.searchISBNClick(e)
    }
  }

  componentDidMount () {

  }

  render () {
    return (
      <Row>
        <Col sm={12} md={12}>
          <FormGroup>
            <InputGroup>
              <FormControl
                type='text'
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
    )
  }
}

AddTextBookResourceView.propTypes = {
  // resourcesActions: PropTypes.shape({
  //   fetchResourceOptions: PropTypes.func.isRequired
  // }).isRequired,
  // resourceOptions: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    // resourceOptions: state.resources.resourceOptions,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    //resourcesActions: bindActionCreators(resourcesCreators, dispatch)
    // tabActions: bindActionCreators(tabsCreators, dispatch),
    // classroomActions: bindActionCreators(classroomCreators, dispatch),
    // googleActions: bindActionCreators(googleCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTextBookResourceView)
export { AddTextBookResourceView as AddTextBookResourceViewNotConnected }
