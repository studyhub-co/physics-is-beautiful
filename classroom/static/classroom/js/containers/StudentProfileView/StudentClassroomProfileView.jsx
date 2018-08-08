import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import history from '../../history'
import { BASE_URL } from '../../utils/config'

import * as studentCreators from '../../actions/student'
import * as tabsCreators from '../../actions/tab'

import { Grid, Row, Col, Image, Modal, Dropdown, Glyphicon, MenuItem } from 'react-bootstrap'

class StudentClassroomProfileView extends React.Component {
  componentWillMount () {
    this.props.tabActions.changeSelectedTab('teacher', 'tab', true)
    this.props.tabActions.changeTeacherClassroomSelectedTab('students', 'teacherClassroomTab', true)
    // this.props.studentActions.classroomFetchStudentClassroomAssignmentsList(
    //   this.props.match.params['uuid'],
    //   this.props.match.params['username']
    // )
    this.props.studentActions.classroomFetchStudentClassroomProfile(
      this.props.match.params['uuid'],
      this.props.match.params['username']
    )
  }

  handleSettingsClick (e) {
    // if (e === 'edit') {
    //   this.handleEditAssignmentModal()
    // } else if (e === 'delete') {
    //   this.props.assignmentActions.assignmentDeleteAssignment(
    //     this.props.match.params['uuid'],
    //     this.props.match.params['assigmentUuid'],
    //     true,
    //     () => { this.props.dispatch(push(BASE_URL + this.props.match.params['uuid'] + '/teacher/')) }
    //   )
    // }
  }

  render () {
    var className = 'assignment-teacher-card'
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col sm={6} md={6}>
              <a className={'pointer'} onClick={() => { history.goBack() }}>{'< All students'}</a>
            </Col>
            <Col sm={6} md={6} className={'text-right'}>
              <Dropdown onSelect={this.handleSettingsClick} id='dropdown-settings'>
                <Dropdown.Toggle className={'classroom-common-button'}>
                  <Glyphicon glyph='cog' />&nbsp;
                Manage student
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <MenuItem eventKey='remove'>Remove from class</MenuItem>
                  {/*<MenuItem eventKey='send'>Send reminder</MenuItem>*/}
                  <MenuItem eventKey='edit'>Move student</MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row className={className}>
            <Col sm={1} md={1}>
              {/*Will be image TODO */}
            </Col>
            <Col sm={8} md={8}>
              { this.props.studentClassroomProfile ? <div>
                <div className={'title'}>{this.props.studentClassroomProfile.display_name}</div>
                <div>{this.props.studentClassroomProfile.username}</div></div>
                : null }
            </Col>
            <Col sm={3} md={3} className={'text-right'}>
              <div className={'gray-text'}>
                <span className={'green-completed-box'}>
                  <span title={'Completed'} className='glyphicon glyphicon-ok' />&nbsp; 1
                </span>
                <span className={'red-missed-box'}>
                  <span title={'Missed'} className='glyphicon glyphicon-remove' />&nbsp; -
                </span>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

StudentClassroomProfileView.propTypes = {
  classroomTeacher: PropTypes.object,
  studentClassroomProfile: PropTypes.object,
  tabActions: PropTypes.shape({
    changeTeacherClassroomSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  studentActions: PropTypes.shape({
    classroomFetchStudentClassroomAssignmentsList: PropTypes.func.isRequired,
    classroomFetchStudentClassroomProfile: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    // classroomStudent: state.classroom.classroomStudentClassroom,
    classroomTeacher: state.classroom.classroomTeacherClassroom,
    studentClassroomProfile: state.student.studentClassroomProfile,
    studentAssignmentsList: state.student.studentClassroomAssignments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    // assignmentActions: bindActionCreators(assignmentCreators, dispatch),
    tabActions: bindActionCreators(tabsCreators, dispatch),
    studentActions: bindActionCreators(studentCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentClassroomProfileView)
export { StudentClassroomProfileView as StudentClassroomProfileViewNotConnected }
