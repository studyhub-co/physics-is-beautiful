import React from 'react'
import PropTypes from 'prop-types'

import { FaCheckCircle, FaTimes, FaClock } from 'react-icons/fa'
import { Row, Col, Image } from 'react-bootstrap'

export class TeacherAssigmentStudentRow extends React.Component {
  // Row to show user inside assignment or user profile view
  render () {
    var className = 'student-classroom-row pointer'

    var completedOnDate = null
    var delayedOnDate = null
    var statusText = 'Not started'
    var colorName = null
    var boxName = ''
    var glyphicon = ''
    var faIcon = null

    if (this.props.student.completed_on) {
      completedOnDate = new Date(this.props.student.completed_on).toLocaleDateString() + ' ' +
        new Date(this.props.student.completed_on).toLocaleTimeString()
      statusText = 'Completed'
      colorName = 'green'
      boxName = '-completed'
      // glyphicon = 'ok-sign'
      faIcon = <FaCheckCircle />
    } else if (this.props.student.delayed_on) {
      delayedOnDate = new Date(this.props.student.delayed_on).toLocaleDateString() + ' ' +
        new Date(this.props.student.delayed_on).toLocaleTimeString()
      statusText = 'Completed late'
      colorName = 'yellow'
      boxName = '-delayed'
      // glyphicon = 'time'
      faIcon = <FaClock />
    } else if (new Date(this.props.assignment.due_on) < new Date()) {
      statusText = 'Missed'
      colorName = 'red'
      boxName = '-missed'
      // glyphicon = 'remove'
      faIcon = <FaTimes />
    } else if (this.props.student.start_on) {
      statusText = 'Started'
    }

    return (
      <div className={className} onClick={() => this.props.onStudentClick()}>
        <Row>
          <Col sm={1} md={1}>
            {this.props.student && this.props.student.avatar_url
              ? <Image
                fluid
                src={this.props.student.avatar_url}
                roundedCircle />
              : null}
          </Col>
          <Col sm={6} md={6}>
            <span
              className={'blue-title pointer'}>{this.props.student.display_name}
            </span>
          </Col>
          <Col sm={2} md={2} className={'vcenter'}>
            { colorName
              ? <div className={colorName + '-text'}>
                <span className={colorName + boxName + '-box'}>
                  {/*<span className={'glyphicon glyphicon-' + glyphicon} />&nbsp;{ statusText }*/}
                  { faIcon }&nbsp;{ statusText }
                </span>
              </div> : <span>{ statusText }</span>}
          </Col>
          <Col sm={2} md={2} className={'vcenter'}>
            { completedOnDate ? <span>{completedOnDate}</span> : null}
            { delayedOnDate ? <span>{delayedOnDate}</span> : null}
          </Col>
          <Col sm={1} md={1} />
        </Row>
      </div>
    )
  }
}

TeacherAssigmentStudentRow.propTypes = {
  assignment: PropTypes.object.isRequired,
  student: PropTypes.object,
  onStudentClick: PropTypes.func.isRequired
}
