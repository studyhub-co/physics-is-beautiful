import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { push } from 'connected-react-router'
import { FaChevronLeft } from 'react-icons/fa'
import Clipboard from 'react-clipboard.js'
import { Container, Row, Col, OverlayTrigger, Tooltip, InputGroup, FormControl, Modal } from 'react-bootstrap'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import { BASE_URL } from '../../utils/config'
import history from '../../history'
import EditableLabel from '../../utils/editableLabel'
import { CurriculumRow } from '../../components/CurriculumRow'
import { AssignmentTeacherRow } from '../../components/AssignmentTeacherRow'
import { AssignmentView, AssignmentEdit, TeacherClassroomStudentsView } from '../index'

import * as assignmentCreators from '../../actions/assignment'
import * as classroomCreators from '../../actions/classroom'
import * as studentCreators from '../../actions/student'
import * as tabsCreators from '../../actions/tab'
import * as googleCreators from '../../actions/google'

class TeacherClassroomView extends React.Component {
  componentWillMount () {
    // tabs
    this.props.tabActions.changeSelectedTab('teacher', 'tab', true)
    // if (this.props.match) {
    //   this.props.tabActions.changeTeacherClassroomSelectedTab('settings', 'teacherClassroomTab', this.props.match)
    // }
    if (this.props.teacherClassroomTab === 'students') {
      this.props.tabActions.changeTeacherClassroomSelectedTab('students', 'teacherClassroomTab', this.props.match)
    }
    // data
    this.props.classroomActions.classroomFetchTeacherClassroom(this.props.match.params['uuid'])
    this.props.studentActions.classroomFetchStudentsClassroomList(this.props.match.params['uuid'])
    this.props.assignmentActions.assignmentFetchAssignmentList(this.props.match.params['uuid'])
  }

  constructor (props) {
    super(props)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleCreateAssigment = this.handleCreateAssigment.bind(this)
    this.handleEditAssignmentModal = this.handleEditAssignmentModal.bind(this)
    this.hideCopiedToolTip = this.hideCopiedToolTip.bind(this)

    this.state = {
      showCreateAssigment: false,
      showAssingment: false,
      createNewAssigment: false
    }
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   if (nextProps.match && nextProps.match.params) {
  //     if (nextProps.match.params.uuid === 'create') {
  //       return false
  //     }
  //   }
  //   return true
  // }

  handleCreateAssigment () {
    this.setState(
      {
        showCreateAssigment: !this.state.showCreateAssigment,
        createNewAssigment: !this.state.showCreateAssigment
      })
  }

  handleSettingsMenuClickAssignment (assignment, e) {
    if (e === 'edit') {
      this.props.assignmentActions.assignmentFetchAssignment(this.props.match.params['uuid'], assignment.uuid, this.handleEditAssignmentModal)
    } else if (e === 'delete') {
      this.props.assignmentActions.assignmentDeleteAssignment(
        this.props.match.params['uuid'], // may be: this.props.classroomTeacher.uuid, ? fixme
        assignment.uuid,
        true,
        this.props.match.params['uuid']
      )
    }
  }

  handleEditAssignmentModal (assignment) {
    this.setState({
      showCreateAssigment: !this.state.showCreateAssigment
    })
  }

  handleViewAssignment (assignment) {
    this.props.dispatch(push(BASE_URL + 'teacher/' + this.props.classroomTeacher.uuid + '/assignments/' + assignment.uuid))
  }

  handleTitleChange (name) {
    var newClassroom = {}

    if (!name) {
      name = 'classroom'
    }

    newClassroom.name = name
    newClassroom.uuid = this.props.classroomTeacher.uuid
    this.props.classroomActions.classroomPartialUpdateTeacherClassroom(newClassroom)
  }

  hideCopiedToolTip () {
    if (this.refs.overlay1) { this.refs.overlay1.hide() }
    if (this.refs.overlay2) { this.refs.overlay2.hide() }
  }

  render () {
    var assignmentUrl = BASE_URL + 'teacher/:uuid/assignments/:assigmentUuid'
    var studentsListUrl = this.props.match.path + 'students/'

    var isExactUrl = this.props.match.isExact // exact url for teacher view

    var studentsS = ''
    if (this.props.classroomTeacher && this.props.classroomTeacher.count_students > 1) {
      studentsS = 's'
    }

    var copiedTooltip = (
      <Tooltip id='copiedTooltip'>
        Copied!
      </Tooltip>
    )

    return (
      <div className={'pop-up-window'}>
        <Container fluid> { this.props.classroomTeacher
          ? <Col sm={12} md={12} style={{padding: 0}}>
            <Row style={{padding: 0}}>
              <Col sm={12} md={12} style={{textAlign: 'left', padding: 0}} >
                <a className={'back-button'} onClick={() => { history.push(BASE_URL + 'teacher/') }} >
                  {/*<span className='glyphicon glyphicon-menu-left' style={{fontSize: 16}} />*/}
                  <FaChevronLeft />
                  All Classrooms
                </a>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12} style={{textAlign: 'center', width: '100%'}}>
                <span className={'blue-title'}>
                  <span className={'editable-label'}>
                    <EditableLabel
                      onFocusOut={this.handleTitleChange}
                      labelClassName={'pointer'}
                      text={this.props.classroomTeacher.name} />
                  </span>
                  &nbsp;
                  <span className='glyphicon glyphicon-pencil' />
                </span>
              </Col>
            </Row>
          </Col>
          : null }
        </Container>
        <Tabs name='teacherClassroomTab'
          className='tabs'
          handleSelect={
            (tabname, tabspace) => { this.props.tabActions.changeTeacherClassroomSelectedTab(tabname, tabspace, this.props.match) }
          }
          selectedTab={this.props.teacherClassroomTab}
        >
          <div className='tab-links'>
            <TabLink to='settings'>Settings</TabLink>
            <TabLink to='students'>Students</TabLink>
            <TabLink to='assignments'>Assignments</TabLink>
          </div>
          <div className='content'>
            <TabContent for='settings'>
              { this.props.classroomTeacher
                ? <div>
                  { this.props.classroomTeacher.external_classroom ? <div className={'pop-up-window text-align-center'}>
                    {/* FIXME if we will be used other classrooms than google we must finalize this code */}
                    <div
                      className={'gray-text title'}
                      style={
                        {fontSize: '2rem',
                          color: '#676767',
                          marginBottom: '1rem'
                        }}>
                      Google Classroom Code
                    </div>
                    <div className={'gray-text title'}>Share google classroom code</div>
                    <div className={'gray-text'}>Join url: <a target={'blank'} href='https://classroom.google.com/h'>https://classroom.google.com/h</a></div>
                    <div>
                      <span className={'blue-title'} style={{ letterSpacing: '0.5rem' }}>{this.props.classroomTeacher.external_classroom.code}</span>&nbsp;
                      <span className={'gray-text pointer'}>
                        <OverlayTrigger
                          delayShow={300}
                          ref='overlay1'
                          trigger='click'
                          placement='top'
                          overlay={copiedTooltip}>
                          <Clipboard component='i' data-clipboard-text={this.props.classroomTeacher.external_classroom.code}>
                            <span onClick={() => { setTimeout(this.hideCopiedToolTip, 3000) }}>copy</span>
                          </Clipboard>
                        </OverlayTrigger>
                      </span>
                    </div>
                  </div>
                    : <div className={'pop-up-window text-align-center'}>
                      <div
                        className={'gray-text title'}
                        style={
                          {fontSize: '2rem',
                            color: '#676767',
                            marginBottom: '1rem'
                          }}>
                        Classroom Code
                      </div>
                      <div className={'gray-text title'}>Share classroom code</div>
                      <div>
                        <span className={'blue-title'} style={{ letterSpacing: '0.5rem' }}>{this.props.classroomTeacher.code}</span>&nbsp;
                        <span className={'gray-text pointer'}>
                          <OverlayTrigger
                            delayShow={300}
                            ref='overlay1'
                            trigger='click'
                            placement='top'
                            overlay={copiedTooltip}>
                            <Clipboard component='i' data-clipboard-text={this.props.classroomTeacher.code}>
                              <span onClick={() => { setTimeout(this.hideCopiedToolTip, 3000) }}>copy</span>
                            </Clipboard>
                          </OverlayTrigger>
                        </span>
                      </div>
                      <br />
                      <div className={'gray-text title'}>
                        Or invite students with link:
                      </div>
                      <InputGroup>
                        <FormControl type='text' readOnly value={window.location.origin + BASE_URL + 'student/join/' + this.props.classroomTeacher.code + '/'} />
                        <span className='input-group-btn'>
                          <Clipboard
                            className={'btn btn-default'}
                            component='button'
                            data-clipboard-text={window.location.origin + BASE_URL + 'student/join/' + this.props.classroomTeacher.code + '/'}>
                            <OverlayTrigger
                              delayShow={300}
                              trigger='click'
                              placement='top'
                              ref='overlay2'
                              overlay={copiedTooltip}>
                              <span onClick={() => { setTimeout(this.hideCopiedToolTip, 3000) }}>Copy</span>
                            </OverlayTrigger>
                          </Clipboard>
                        </span>
                      </InputGroup>
                    </div>
                  }
                  <div className={'pop-up-window text-align-center'}>
                    <div
                      className={'gray-text title'}
                      style={
                        {fontSize: '2rem',
                          color: '#676767',
                          marginBottom: '1rem'
                        }}>
                      Curriculum
                    </div>
                    <CurriculumRow curriculum={this.props.classroomTeacher.curriculum} />
                    <div
                      className={'gray-text title pointer'}
                      onClick={() => { this.props.dispatch(push(BASE_URL + 'teacher/' + this.props.classroomTeacher.uuid + '/edit/')) }}>
                      <u>Change curriculum</u>
                    </div>
                  </div>
                  <div className={'gray-text title pointer text-align-center'}
                    onClick={() => { this.props.classroomActions.classroomDeleteTeacherClassroom(this.props.classroomTeacher.uuid) }}>
                    <u>Delete this classroom</u>
                  </div>
                </div>
                : null }
            </TabContent>
            <TabContent for='students'>
              <Route path={studentsListUrl} component={TeacherClassroomStudentsView} />
            </TabContent>
            <TabContent for='assignments'>
              <Route path={assignmentUrl} component={AssignmentView} />
              {isExactUrl
                ? <span className={'title'}>Class Assignments&nbsp;</span>
                : null}
              {/* TODO refactor */}
              {this.props.classroomTeacher && isExactUrl
                ? <span className={'gray-text'}>{this.props.classroomTeacher.count_students + ' student' + studentsS}</span>
                : null}
              {this.props.assignmentsList && isExactUrl
                ? <Container fluid>
                  <Row style={{padding: '1rem 2rem', margin: '0'}} className={'small-text'}>
                    <Col sm={5} md={5}>
                      <span className={'gray-text'}>Active assignments</span>
                    </Col>
                    <Col sm={2} md={2} className={'vcenter'}>
                        Start on
                    </Col>
                    <Col sm={2} md={2} className={'vcenter'}>
                      Due on
                    </Col>
                    <Col sm={2} md={2} className={'vcenter'}>
                      <span title={'Completed'} style={{padding: '0 1rem'}} className='glyphicon glyphicon-ok' />
                      <span title={'Completed late'} style={{padding: '0 1rem'}} className='glyphicon glyphicon-time' />
                      <span title={'Missed'} style={{padding: '0 1rem'}} className='glyphicon glyphicon-remove' />
                    </Col>
                    <Col sm={1} md={1} />
                  </Row>
                  <hr style={{margin: '0'}} />
                  { this.props.assignmentsList.map(function (assignment, i) {
                    return <AssignmentTeacherRow
                      assignment={assignment}
                      onAssignmentsClick={() => this.handleViewAssignment(assignment)}
                      onSettingsMenuClick={(e) => this.handleSettingsMenuClickAssignment(assignment, e)}
                      baseUrl={BASE_URL}
                      key={i} />
                  }, this)}
                </Container> : null }
              { isExactUrl ? <div className={'join-another-classroom'} onClick={this.handleCreateAssigment}>
                + Create an assignment
              </div> : null }
              { this.state.showCreateAssigment
                ? <Modal
                  show={this.state.showCreateAssigment}
                  onHide={this.handleCreateAssigment}
                  container={this} >
                  <Modal.Header closeButton>
                    <Modal.Title>{this.state.createNewAssigment ? 'Create' : 'Edit'}  an assignment</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <AssignmentEdit createNew={this.state.createNewAssigment} assignment={this.props.assignment} onSave={this.handleCreateAssigment} />
                  </Modal.Body>
                  <Modal.Footer>
                    <div className={'gray-link'} onClick={this.handleCreateAssigment}>Back</div>
                  </Modal.Footer>
                </Modal> : null
              }
            </TabContent>
          </div>
        </Tabs>
      </div>)
  }
}

TeacherClassroomView.propTypes = {
  tabActions: PropTypes.shape({
    changeTeacherClassroomSelectedTab: PropTypes.func.isRequired,
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  teacherClassroomTab: PropTypes.string,
  studentActions: PropTypes.shape({
    classroomFetchStudentsClassroomList: PropTypes.func.isRequired
  }).isRequired,
  classroomActions: PropTypes.shape({
    classroomFetchTeacherClassroom: PropTypes.func.isRequired,
    classroomPartialUpdateTeacherClassroom: PropTypes.func.isRequired,
    classroomDeleteTeacherClassroom: PropTypes.func.isRequired
  }).isRequired,
  assignmentActions: PropTypes.shape({
    assignmentFetchAssignmentList: PropTypes.func.isRequired,
    assignmentDeleteAssignment: PropTypes.func.isRequired,
    assignmentFetchAssignment: PropTypes.func.isRequired
  }).isRequired,
  classroomTeacher: PropTypes.object,
  assignmentsList: PropTypes.array,
  assignment: PropTypes.object
  // teacherClassroomStudentsList: PropTypes.array,
  // gapiInitState: PropTypes.bool,
  // googleActions: PropTypes.shape({
  //   googleFetchAndSaveClassroomsStudents: PropTypes.func.isRequired
  // }).isRequired
}

const mapStateToProps = (state) => {
  return {
    classroomTeacher: state.classroom.classroomTeacherClassroom,
    teacherClassroomTab: state.tab.teacherClassroomTab,
    assignmentsList: state.assignment.assignmentsList,
    assignment: state.assignment.assignment,
    teacherClassroomStudentsList: state.student.classroomStudentsList,
    gapiInitState: state.google.gapiInitState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    tabActions: bindActionCreators(tabsCreators, dispatch),
    classroomActions: bindActionCreators(classroomCreators, dispatch),
    assignmentActions: bindActionCreators(assignmentCreators, dispatch),
    studentActions: bindActionCreators(studentCreators, dispatch),
    googleActions: bindActionCreators(googleCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherClassroomView)
export { TeacherClassroomView as TeacherViewNotConnected }
