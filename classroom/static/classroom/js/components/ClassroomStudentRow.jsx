import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'react-bootstrap'

export class ClassroomStudentRow extends React.Component {
  render () {
    var className = 'student-classroom-row'

    return (
      <div className={className}>
        <Row>
          {/*<div>{this.props.classroom.teacher.first_name} - {this.props.classroom.name}</div>*/}
          <Col sm={10} md={10}>
            {this.props.classroom.curriculum.name}
          </Col>
          <Col sm={2} md={2}>
          Assignments
          </Col>
          {/*<div>Students photos list</div>*/}
          {/*<div>{this.props.classroom.count_students} students</div>*/}
        </Row>
      </div>
    )
  }
}

ClassroomStudentRow.propTypes = {
  classroom: PropTypes.object
}
