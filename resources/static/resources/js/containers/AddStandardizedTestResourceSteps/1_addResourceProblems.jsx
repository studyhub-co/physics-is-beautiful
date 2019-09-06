import React from 'react'

// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Row, Col, InputGroup, Form, Button } from 'react-bootstrap'
import { FaChevronRight } from 'react-icons/fa'

export default class AddNumberOfProblemsView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      numberOfProblems: this.props.numberOfProblems || ''
    }

    this.handleNumberOfProblems = this.handleNumberOfProblems.bind(this)
    this.handleNumberOfProblemsInputKeyUp = this.handleNumberOfProblemsInputKeyUp.bind(this)
    this.addNumberOfProblemsClick = this.addNumberOfProblemsClick.bind(this)
  }

  handleNumberOfProblems (e) {
    // remove all chars
    var s = e.target.value.replace(/\D/g, '')

    this.setState({numberOfProblems: s})
  }

  handleNumberOfProblemsInputKeyUp (e) {
    if (e.keyCode === 13) { // 'enter' key
      this.addNumberOfProblemsClick(e)
    }
  }

  addNumberOfProblemsClick () {
    this.props.onAddNumberOfProblems(this.state.numberOfProblems)
  }

  render () {
    return (
      <div>
        <div className={'blue-title'}>First step</div>
        <Row>
          <Col sm={12} md={12}>
            <Form.Group>
              <InputGroup>
                <Form.Control
                  type='text'
                  value={this.state.numberOfProblems}
                  placeholder='Enter number of problems...'
                  autoFocus={Boolean(true)}
                  onChange={this.handleNumberOfProblems}
                  onKeyUp={this.handleNumberOfProblemsInputKeyUp}
                />
                <InputGroup.Append>
                  <Button
                    disabled={!parseInt(this.state.numberOfProblems)}
                    onClick={this.addNumberOfProblemsClick}
                  >Next <FaChevronRight /></Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </div>
    )
  }
}

AddNumberOfProblemsView.propTypes = {
  onAddNumberOfProblems: PropTypes.func.isRequired,
  numberOfProblems: PropTypes.number
}
