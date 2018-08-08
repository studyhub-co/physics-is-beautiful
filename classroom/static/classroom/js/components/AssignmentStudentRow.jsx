import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Image} from 'react-bootstrap'

export class AssignmentStudentRow extends React.Component {
  render () {
    var className = 'student-classroom-row'

    return (
      <Row className={className}>
        <Col sm={1} md={1}>
          <div className={'gray-text small-text'}>
          image
          </div>
        </Col>
        <Col sm={4} md={4}>
          <div className={'blue-title pointer'} onClick={this.props.onTitleClick}>{this.props.assignment.name}</div>
          <div className={'gray-text small-text'}>{this.props.assignment.count_lessons} lesson{this.props.assignment.count_lessons > 1 ? 's' : null}</div>
        </Col>
        <Col sm={4} md={4} className={'vcenter'}>
          { this.props.assignment.completed_on ? <div className={'green-text'}>Complete</div> : null }
        </Col>
        <Col sm={2} md={2} className={'vcenter'}>
          { this.props.assignment.completed_on ? <div className={'green-text'}> {this.props.assignment.count_completed_lessons} / {this.props.assignment.count_lessons}</div> : null }
        </Col>
        <Col sm={1} md={1}>
          status img
        </Col>
      </Row>
    )
  }
}

AssignmentStudentRow.propTypes = {
  assignment: PropTypes.object,
  onTitleClick: PropTypes.func
}
