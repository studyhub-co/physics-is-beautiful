import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Checkbox } from 'react-bootstrap'

export class GoogleClassroomRow extends React.Component {
  handleChange (classroom) {
    this.props.onGoogleClassroomClick(this.props.classroom)
  }

  render () {
    var className = 'google-classroom-row'

    return (
      <div className={className}>
        <Row>
          <Col sm={1} md={1}>
            <Checkbox onChange={() => this.handleChange(this.props.classroom)} />
          </Col>
          <Col sm={11} md={11}>
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
