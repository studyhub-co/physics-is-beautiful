import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import history from '../../history'
import { BASE_URL } from '../../utils/config'
import { push } from 'connected-react-router'

import * as studentCreators from '../../actions/student'
import * as tabsCreators from '../../actions/tab'
import * as assignmentCreators from '../../actions/assignment'

import { Container, Row, Col, Image, Dropdown, Glyphicon, MenuItem } from 'react-bootstrap'
import { TeacherStudentAssignmentRow } from '../../components/TeacherStudentAssignmentRow'

class StudentClassroomProfileView extends React.Component {
  constructor (props) {
    super(props)
    this.handleSettingsClick = this.handleSettingsClick.bind(this)
  }

  componentWillMount () {
    this.props.tabActions.changeSelectedTab('teacher', 'tab', true)
    this.props.tabActions.changeTeacherClassroomSelectedTab('students', 'teacherClassroomTab', this.props.match)
    this.props.studentActions.classroomFetchStudentClassroomProfile(
      this.props.match.params['uuid'],
      this.props.match.params['username']
    )
    this.props.studentActions.classroomFetchStudentClassroomAssignmentsList(
      this.props.match.params['uuid'],
      this.props.match.params['username']
    )
  }

  handleSettingsClick (e) {
    if (e === 'remove') {
      this.props.studentActions.removeFromClass(this.props.classroomTeacher.uuid, this.props.studentClassroomProfile.username)
    }
  }

  onAssignmentTitleClick (assignment) {
    this.props.dispatch(push(BASE_URL + 'teacher/' + this.props.classroomTeacher.uuid + '/assignments/' + assignment.uuid))
  }

  render () {
    var className = 'assignment-teacher-card'
    return (
      <div>
        <Container fluid>
          <Row>
            <Col
              sm={6}
              md={6}
              style={{textAlign: 'left', paddingTop: '1rem'}} >
              <a
                className={'back-button'}
                onClick={() => { this.props.dispatch(push(BASE_URL + 'teacher/' + this.props.classroomTeacher.uuid + '/students/')) }} >
                <span
                  className='glyphicon glyphicon-menu-left'
                  style={{fontSize: 16}} />
                All students
              </a>
            </Col>
            <Col sm={6} md={6} className={'text-right'}>
              {this.props.classroomTeacher && !this.props.classroomTeacher.external_classroom ? <Dropdown onSelect={this.handleSettingsClick} id='dropdown-settings'>
                <Dropdown.Toggle className={'classroom-common-button'}>
                  <Glyphicon glyph='cog' />&nbsp;
                Manage student
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <MenuItem eventKey='remove'>Remove from class</MenuItem>
                  {/* <MenuItem eventKey='send'>Send reminder</MenuItem> */}
                  {/* <MenuItem eventKey='edit'>Move student</MenuItem> */}
                </Dropdown.Menu>
              </Dropdown> : null}
            </Col>
          </Row>
          <Row className={className}>
            <Col sm={1} md={1}>
              {this.props.studentClassroomProfile && this.props.studentClassroomProfile.avatar_url
                ? <Image
                  fluid
                  src={this.props.studentClassroomProfile.avatar_url}
                  roundedCircle />
                : null}
            </Col>
            <Col sm={8} md={8}>
              { this.props.studentClassroomProfile ? <div>
                <div className={'title'}>{this.props.studentClassroomProfile.display_name}</div>
                <div className={'deep-gray-text'}>{this.props.studentClassroomProfile.username}</div></div>
                : null }
            </Col>
            <Col sm={3} md={3} className={'vcenter'}>
              <div className={'gray-text'}>
                <span className={'green-completed-box'}>
                  <span title={'Completed'} className='glyphicon glyphicon-ok'>
                    &nbsp;{this.props.studentClassroomProfile ? this.props.studentClassroomProfile.counts.num_completed_assignments : ''}
                  </span>
                </span>
                <span className={'yellow-delayed-box'}>
                  <span title={'Completed late'} className='glyphicon glyphicon-time'>
                    &nbsp;{this.props.studentClassroomProfile ? this.props.studentClassroomProfile.counts.num_delayed_assignments : ''}
                  </span>
                </span>
                <span className={'red-missed-box'}>
                  <span title={'Missed'} className='glyphicon glyphicon-remove'>
                    &nbsp;{this.props.studentClassroomProfile ? this.props.studentClassroomProfile.counts.num_missed_assignments : ''}
                  </span>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row style={{padding: '1rem 2rem', margin: '0'}} className={'small-text'}>
            <Col sm={6} md={6}>
              <span className={'gray-text'}>Assignment</span>
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
          </Row>
        </Container>
        <hr style={{margin: '0'}} />
        <Container fluid>
          { this.props.studentAssignmentsList
            ? this.props.studentAssignmentsList.map(function (assignment, i) {
              return <TeacherStudentAssignmentRow
                isTeacher={Boolean(true)}
                assignment={assignment}
                onTitleClick={() => { this.onAssignmentTitleClick(assignment) }}
                key={i} />
            }, this) : null}
        </Container>
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
    classroomFetchStudentClassroomProfile: PropTypes.func.isRequired,
    removeFromClass: PropTypes.func.isRequired
  }).isRequired,
  studentAssignmentsList: PropTypes.array
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
    studentActions: bindActionCreators(studentCreators, dispatch),
    assignmentActions: bindActionCreators(assignmentCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentClassroomProfileView)
export { StudentClassroomProfileView as StudentClassroomProfileViewNotConnected }
