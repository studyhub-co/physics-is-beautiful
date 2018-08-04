import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Image } from 'react-bootstrap'

export class AssignmentTeacherRow extends React.Component {
  render () {
    var className = 'student-classroom-row'

    return (
      <Row className={className}>
        <Col sm={1} md={1}>
          {this.props.assignment.lessons[0].image
            ? <Image
              className={'pointer'}
              onClick={this.props.onAssignmentsClick}
              width={'100%'}
              src={this.props.assignment.lessons[0].image}
              circle />
            : null}
        </Col>
        <Col sm={4} md={4}>
          <div onClick={this.props.onAssignmentsClick} className={'blue-title pointer'}>{this.props.assignment.name}</div>
          <div className={'gray-text small-text'}>{this.props.assignment.lessons.length} lesson{this.props.assignment.lessons.length > 1 ? 's' : null}</div>
        </Col>
        <Col sm={2} md={2} className={'vcenter'}>
          <div className={'gray-text small-text'}>
            {new Date(this.props.assignment.start_on).toLocaleDateString()}&nbsp;
            {new Date(this.props.assignment.start_on).toLocaleTimeString()}
          </div>
        </Col>
        <Col sm={2} md={2} className={'vcenter'}>
          <span className={'gray-text small-text'}>
            {new Date(this.props.assignment.due_on).toLocaleDateString()}&nbsp;
            {new Date(this.props.assignment.due_on).toLocaleTimeString()}
          </span>
        </Col>
        <Col sm={2} md={2} className={'vcenter'}>
          <span style={{width: '15px', height: '15px'}}>1</span>
          &nbsp;
          <span style={{width: '15px', height: '15px'}}>-</span>
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
  onAssignmentsClick: PropTypes.func.isRequired
}
