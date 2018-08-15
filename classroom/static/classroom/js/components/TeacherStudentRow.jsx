import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'react-bootstrap'

export class TeacherStudentRow extends React.Component {
  // Row to show user inside assignment or user profile view
  render () {
    var className = 'student-classroom-row pointer'

    return (
      <div className={className}>
        <Row>
          <Col sm={6} md={6}>
            <span
              onClick={() => this.props.onStudentClick()}
              className={'blue-title pointer'}>{this.props.student.display_name}
            </span>
          </Col>
          <Col sm={2} md={2} className={'vcenter'}>
            Assigned on
          </Col>
          <Col sm={2} md={2} className={'vcenter'}>
            Status
          </Col>
          <Col sm={2} md={2} className={'vcenter'}>
            Completed on
          </Col>
          <Col sm={1} md={1} />
        </Row>
      </div>
    )
  }
}

TeacherStudentRow.propTypes = {
  student: PropTypes.object,
  onStudentClick: PropTypes.func.isRequired
}
