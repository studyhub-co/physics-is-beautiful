import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { push } from 'connected-react-router'

import * as assignmentCreators from '../../actions/assignment'
import * as studentCreators from '../../actions/student'
import * as tabsCreators from '../../actions/tab'

import { AssignmentEdit } from '../index'
import { Container, Row, Col, Image, Modal, Dropdown, Glyphicon, MenuItem } from 'react-bootstrap'
import { BASE_URL } from '../../utils/config'
import history from '../../history'
import { TeacherAssigmentStudentRow } from '../../components/TeacherAssigmentStudentRow'

export class AssignmentView extends React.Component {
  constructor (props) {
    super(props)
    this.handleEditAssignmentModal = this.handleEditAssignmentModal.bind(this)
    this.handleSettingsClick = this.handleSettingsClick.bind(this)

    this.state = {
      showEditAssigment: false
    }
  }

  componentWillMount () {
    this.props.tabActions.changeSelectedTab('teacher', 'tab', true)
    this.props.tabActions.changeTeacherClassroomSelectedTab('assignments', 'teacherClassroomTab')
    this.props.assignmentActions.assignmentFetchAssignment(this.props.match.params['uuid'], this.props.match.params['assigmentUuid'])
    this.props.assignmentActions.assignmentFetchStudentsList(this.props.match.params['uuid'], this.props.match.params['assigmentUuid'])
  }

  handleEditAssignmentModal () {
    this.setState({
      showEditAssigment: !this.state.showEditAssigment
    })
  }

  handleSettingsClick (e) {
    if (e === 'edit') {
      this.handleEditAssignmentModal()
    } else if (e === 'delete') {
      this.props.assignmentActions.assignmentDeleteAssignment(
        this.props.match.params['uuid'],
        this.props.match.params['assigmentUuid'],
        true,
        () => { this.props.dispatch(push(BASE_URL + 'teacher/' + this.props.match.params['uuid'])) }
      )
    }
  }

  render () {
    var className = 'assignment-teacher-card'
    var dateText = ''
    if (this.props.assignment) {
      dateText = 'Assigned on ' + new Date(this.props.assignment.start_on).toLocaleDateString() + ' at ' +
                new Date(this.props.assignment.start_on).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) +
                ' and due on ' + new Date(this.props.assignment.due_on).toLocaleDateString() + ' at ' +
                new Date(this.props.assignment.due_on).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    }
    var postOnGoogleUrl = null
    if (this.props.classroomTeacher &&
      this.props.assignment &&
      this.props.classroomTeacher.external_classroom) {
      postOnGoogleUrl =
        this.props.classroomTeacher.external_classroom.alternate_link.replace('/c/', '/share/') +
        '/assignment?url=' + encodeURIComponent(window.location.origin + '/classroom/' + this.props.classroomTeacher.uuid +
        '/student/assignments/#' + this.props.assignment.uuid) + '&title=' +
        this.props.assignment.name + '&body=Only for ' +
        this.props.classroomTeacher.external_classroom.name + ' classroom'
      // test
      // postOnGoogleUrl =
      //   this.props.classroomTeacher.external_classroom.alternate_link.replace('/c/', '/share/') +
      //   '/assignment?url=' + encodeURIComponent('https://www.physicsisbeautiful.com/curriculum') + '&title=' +
      //   this.props.assignment.name + '&body=Only for ' +
      //   this.props.classroomTeacher.external_classroom.name + ' classroom'
    }
    return (
      <div>
        <Container fluid>
          <Row id='all-assignments'>
            <Col md={12} style={{padding: 0}}>
              <a className={'back-button'} onClick={() => { history.push(BASE_URL + 'teacher/' + this.props.match.params['uuid'] + '/') }} >
                <span className='glyphicon glyphicon-menu-left' style={{fontSize: 16}} />
                All assignments
              </a>
            </Col>
          </Row>
          <Row style={{padding: 0, marginTop: 10}} >
            <Col md={9}>
              {postOnGoogleUrl
                ? <a
                // onClick={this.getGoogleClassroomList}
                  target={'_blank'}
                  href={postOnGoogleUrl}
                  className='google-button' type='button'>
                  <div className='google-classroom-img' />
                  <span>
                    <span>Post on</span>
                    <span>Google Classroom</span>
                  </span>
                </a> : null }
            </Col>
            <Col md={3} className={'vcenter'}>
              <Dropdown onSelect={this.handleSettingsClick} id='dropdown-settings' >
                <Dropdown.Toggle className={'classroom-common-button'} style={{marginTop: 0}}>
                  <Glyphicon glyph='cog' />&nbsp;
                  Manage assignment
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <MenuItem eventKey='delete'>Delete assignment</MenuItem>
                  {/*<MenuItem eventKey='send'>Send reminder</MenuItem>*/}
                  <MenuItem eventKey='edit'>Edit assignment</MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row className={className}>
            <Col sm={1} md={1} style={{maxWidth: '35%'}}>
              {this.props.assignment && this.props.assignment.lessons[0].image
                ? <Image
                  className={'pointer'}
                  width={'100%'}
                  src={this.props.assignment.lessons[0].image}
                />
                : null}
            </Col>
            <Col sm={6} md={6}>
              <div className={'blue-title pointer'}>{this.props.assignment ? this.props.assignment.name : null}</div>
              <div className={'gray-text small-text'}>
                {this.props.assignment ? this.props.assignment.lessons.length : null}&nbsp;
                lesson{this.props.assignment && this.props.assignment.lessons.length > 1 ? 's' : null}
              </div>
            </Col>
            <Col sm={5} md={5} className={'text-right'}>
              <div className={'gray-text'}>
                <span className={'green-completed-box'}>
                  <span title={'Completed'} className='glyphicon glyphicon-ok' />
                  &nbsp;{this.props.assignment ? this.props.assignment.count_students_completed_assingment : null}
                </span>
                &nbsp;
                <span className={'yellow-delayed-box'}>
                  <span title={'Missed'} className='glyphicon glyphicon-time' />
                  &nbsp;{this.props.assignment ? this.props.assignment.count_students_delayed_assingment : null}
                </span>
                &nbsp;
                <span className={'red-missed-box'}>
                  <span title={'Missed'} className='glyphicon glyphicon-remove' />
                  &nbsp;{this.props.assignment ? this.props.assignment.count_students_missed_assingment : null}
                </span>
              </div>
              <br />
              <div className={'gray-text small-text'}>
                {dateText}
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row style={{padding: '1rem 2rem', margin: '0'}} className={'small-text'}>
            <Col sm={7} md={7}>
              <span className={'gray-text'}>Student</span>
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
          <Row className={''}>
            <Col sm={12} md={12}>
              {this.props.assignment &&
              this.props.classroomTeacher &&
              this.props.assignmentStudentsList
                ? this.props.assignmentStudentsList.map(function (student, i) {
                  return <TeacherAssigmentStudentRow
                    assignment={this.props.assignment}
                    student={student}
                    onStudentClick={() =>
                      this.props.dispatch(push(BASE_URL +
                      'teacher/' +
                      this.props.classroomTeacher.uuid +
                      '/students/' + student.username))}
                    key={i} />
                }, this) : null}
            </Col>
          </Row>
        </Container>
        { this.state.showEditAssigment
          ? <Modal
            show={this.state.showEditAssigment}
            onHide={this.handleEditAssignmentModal}
            container={this} >
            <Modal.Header closeButton>
              <Modal.Title>{this.props.assignment ? 'Edit' : 'Create'}  an assignment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AssignmentEdit createNew={false} assignment={this.props.assignment} onSave={this.handleEditAssignmentModal} />
            </Modal.Body>
            <Modal.Footer>
              <div className={'gray-link'} onClick={this.handleCreateAssigment}>Back</div>
            </Modal.Footer>
          </Modal> : null
        }
      </div>
    )
  }
}

AssignmentView.propTypes = {
  assignment: PropTypes.object,
  classroomTeacher: PropTypes.object,
  tabActions: PropTypes.shape({
    changeTeacherClassroomSelectedTab: PropTypes.func.isRequired,
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  assignmentActions: PropTypes.shape({
    assignmentFetchAssignment: PropTypes.func.isRequired,
    assignmentDeleteAssignment: PropTypes.func.isRequired,
    assignmentFetchStudentsList: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    // classroomStudent: state.classroom.classroomStudentClassroom
    classroomTeacher: state.classroom.classroomTeacherClassroom,
    teacherClassroomStudentsList: state.student.classroomStudentsList,
    assignment: state.assignment.assignment,
    assignmentStudentsList: state.assignment.assignmentStudentsList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    assignmentActions: bindActionCreators(assignmentCreators, dispatch),
    tabActions: bindActionCreators(tabsCreators, dispatch),
    studentActions: bindActionCreators(studentCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentView)
export { AssignmentView as AssignmentViewNotConnected }
