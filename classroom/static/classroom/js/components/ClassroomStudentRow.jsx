import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'react-bootstrap'

export class ClassroomStudentRow extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     expand: false
  //   }
  //   this.expand = this.expand.bind(this)
  // }
  //
  // expand () {
  //   this.setState({expand: !this.state.expand})
  // }

  render () {
    var className = 'student-classroom-row'

    return (
      <div className={className}>
        <Row>
          <Row>
            <Col sm={10} md={10}>
              {this.props.classroom.name}
            </Col>
            <Col sm={2} md={2}>
              <span onClick={() => this.props.onAssignmentsClick(this.props.baseUrl +
                '/' + this.props.classroom.uuid + '/student/')} className={'pib-link'}>Assignments</span>
            </Col>
          </Row>
        </Row>
      </div>
    )
  }
}

ClassroomStudentRow.propTypes = {
  classroom: PropTypes.object,
  baseUrl: PropTypes.string.isRequired,
  onAssignmentsClick: PropTypes.func.isRequired
}
