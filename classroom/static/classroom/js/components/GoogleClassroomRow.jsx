import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, InputGroup } from 'react-bootstrap'

export class GoogleClassroomRow extends React.Component {
  handleChange (classroom) {
    this.props.onGoogleClassroomClick(this.props.classroom)
  }

  render () {
    var disabled = false
    for (var x = 0; x < this.props.existingClassroomsList.length; x++) {
      if (this.props.existingClassroomsList[x].external_classroom &&
       this.props.existingClassroomsList[x].external_classroom.external_id === this.props.classroom.id) {
        disabled = true
      }
    }

    var className = 'google-classroom-row'
    var opts = {}
    if (disabled) {
      opts['checked'] = 'checked'
    }

    return (
      <div className={className}>
        <Row>
          <Col sm={1} md={1}>
            <InputGroup.Checkbox
              disabled={disabled}
              onChange={() => this.handleChange(this.props.classroom)}
              {...opts}
            />
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
  existingClassroomsList: PropTypes.array.isRequired,
  classroom: PropTypes.object.isRequired // google classrooom
}
