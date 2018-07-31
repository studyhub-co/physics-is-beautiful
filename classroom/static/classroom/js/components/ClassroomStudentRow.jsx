import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'react-bootstrap'

export class ClassroomStudentRow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expand: false
    }
    this.expand = this.expand.bind(this)
  }

  expand () {
    this.setState({expand: !this.state.expand})
  }

  render () {
    var className = 'student-classroom-row'

    return (
      <div className={className}>
        <Row>
          {/*<div>{this.props.classroom.teacher.first_name} - {this.props.classroom.name}</div>*/}
          <Row>
            <Col sm={10} md={10}>
              {this.props.classroom.curriculum.name}
            </Col>
            <Col sm={2} md={2}>
              <span onClick={this.expand} className={'pib-link'}>Assignments</span>
            </Col>
          </Row>
          {/*<div>Students photos list</div>*/}
          {/*<div>{this.props.classroom.count_students} students</div>*/}
          {this.state.expand
            ? <Row>
              <Col sm={10} md={10} /><Col sm={2} md={2}>
                <span onClick={() => this.props.leaveClassroom(this.props.classroom)} className={'grey-link'}>Leave classroom</span>
              </Col>
            </Row> : null}
        </Row>
      </div>
    )
  }
}

ClassroomStudentRow.propTypes = {
  classroom: PropTypes.object,
  leaveClassroom: PropTypes.func.isRequired
}
