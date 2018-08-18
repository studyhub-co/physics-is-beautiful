import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Image } from 'react-bootstrap'

export class TeacherAssigmentStudentRow extends React.Component {
  // Row to show user inside assignment or user profile view
  render () {
    var className = 'student-classroom-row pointer'

    return (
      <div className={className}>
        <Row>
          <Col sm={1} md={1}>
            {this.props.student && this.props.student.gravatar_url
              ? <Image
                responsive
                src={this.props.student.gravatar_url}
                circle />
              : null}
          </Col>
          <Col sm={5} md={5}>
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

TeacherAssigmentStudentRow.propTypes = {
  student: PropTypes.object,
  onStudentClick: PropTypes.func.isRequired
}
