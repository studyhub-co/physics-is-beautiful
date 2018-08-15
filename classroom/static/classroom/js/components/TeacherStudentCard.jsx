import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Grid} from 'react-bootstrap'

export class TeacherStudentCard extends React.Component {
  // Card to show user in classroom students list
  // Card to swon user inside assignment view
  render () {
    var className = 'student-card pointer vcenter'

    return (
      <Grid fluid style={{float: 'left', padding: '0'}}>
        <Row className={className} onClick={() => this.props.onStudentClick()}>
          <Col sm={1} md={1}>
            photo
          </Col>
          <Col sm={5} md={5}>
            <span className={'title'}>{this.props.student.display_name}</span>
          </Col>
          <Col sm={6} md={6}>
            <div className={'gray-text'}>
              <span className={'green-completed-box'}>
                <span title={'Completed'} className='glyphicon glyphicon-ok' />&nbsp;{this.props.student.counts.num_completed_assignments}
              </span>
              <span className={'yellow-delayed-box'}>
                <span title={'Delayed'} className='glyphicon glyphicon-time' />&nbsp;{this.props.student.counts.num_delayed_assignments}
              </span>
              <span className={'red-missed-box'}>
                <span title={'Missed'} className='glyphicon glyphicon-remove' />&nbsp;{this.props.student.counts.num_missed_assignments}
              </span>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

TeacherStudentCard.propTypes = {
  student: PropTypes.object,
  onStudentClick: PropTypes.func.isRequired
}
