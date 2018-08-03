import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Image } from 'react-bootstrap'

export class AssignmentTeacherRow extends React.Component {
  render () {
    var className = 'student-classroom-row'
    
    return (
      <Row className={className}>
        <Col sm={2} md={2}>
          {this.props.assignment.lessons[0].image ? <Image width={'100%'} src={this.props.assignment.lessons[0].image} rounded /> : null}
        </Col>
        <Col sm={3} md={3}>
          <div className={'blue-title'}>{this.props.assignment.name}</div>
          <div>count lessons</div>
        </Col>
        <Col sm={2} md={2}>
          start on
        </Col>
        <Col sm={2} md={2}>
          Due On
        </Col>
        <Col sm={2} md={2}>
          Complete
          /
          Missed
        </Col>
        <Col sm={1} md={1}>
          settings
        </Col>
      </Row>
    )
  }
}

AssignmentTeacherRow.propTypes = {
  assignment: PropTypes.object,
  // baseUrl: PropTypes.string.isRequired,
  // onAssignmentsClick: PropTypes.func.isRequired
}
