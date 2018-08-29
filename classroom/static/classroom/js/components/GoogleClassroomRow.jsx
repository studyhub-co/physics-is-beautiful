import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Checkbox } from 'react-bootstrap'

export class GoogleClassroomRow extends React.Component {
  handleChange (classroom) {
    this.props.onGoogleClassroomClick(this.props.classroom)
  }

  render () {
    var className = 'student-classroom-row'

    return (
      <div className={className}>
        <Row>
          <Col sm={2} md={2}>
            <Checkbox onChange={() => this.handleChange(this.props.classroom)} />
          </Col>
          <Col sm={10} md={10}>
            <span
              className={'blue-title'}>{this.props.classroom.name} {this.props.classroom.section}
            </span>
          </Col>
        </Row>
      </div>
    )
  }
}

GoogleClassroomRow.propTypes = {
  onGoogleClassroomClick: PropTypes.func.isRequired,
  classroom: PropTypes.object.isRequired // google classrooom
}
