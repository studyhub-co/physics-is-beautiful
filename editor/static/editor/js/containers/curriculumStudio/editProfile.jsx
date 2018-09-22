import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { push } from 'connected-react-router'

import history from '../../history'

import Clipboard from 'react-clipboard.js'
// import EditableLabel from '../../utils/editableLabel'

import { Grid, Row, Col, OverlayTrigger, Tooltip, InputGroup, FormControl, Modal } from 'react-bootstrap'

// import * as assignmentCreators from '../../actions/'

import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

class EditCurriculumProfileView extends React.Component {
  // componentWillMount () {
  //   // tabs
  //   this.props.tabActions.changeSelectedTab('teacher', 'tab', true)
  //   // if (this.props.match) {
  //   //   this.props.tabActions.changeTeacherClassroomSelectedTab('settings', 'teacherClassroomTab', this.props.match)
  //   // }
  //   if (this.props.teacherClassroomTab === 'students') {
  //     this.props.tabActions.changeTeacherClassroomSelectedTab('students', 'teacherClassroomTab', this.props.match)
  //   }
  //   // data
  //   this.props.classroomActions.classroomFetchTeacherClassroom(this.props.match.params['uuid'])
  //   this.props.studentActions.classroomFetchStudentsClassroomList(this.props.match.params['uuid'])
  //   this.props.assignmentActions.assignmentFetchAssignmentList(this.props.match.params['uuid'])
  // }
  //
  // constructor (props) {
  //   super(props)
  //   this.handleTitleChange = this.handleTitleChange.bind(this)
  //   this.handleCreateAssigment = this.handleCreateAssigment.bind(this)
  //   this.handleEditAssignmentModal = this.handleEditAssignmentModal.bind(this)
  //   this.hideCopiedToolTip = this.hideCopiedToolTip.bind(this)
  //
  //   this.state = {
  //     showCreateAssigment: false,
  //     showAssingment: false,
  //     createNewAssigment: false
  //   }
  // }
  //
  // handleCreateAssigment () {
  //   this.setState(
  //     {
  //       showCreateAssigment: !this.state.showCreateAssigment,
  //       createNewAssigment: !this.state.showCreateAssigment
  //     })
  // }
  //
  // handleSettingsMenuClickAssignment (assignment, e) {
  //   if (e === 'edit') {
  //     this.props.assignmentActions.assignmentFetchAssignment(this.props.match.params['uuid'], assignment.uuid, this.handleEditAssignmentModal)
  //   } else if (e === 'delete') {
  //     this.props.assignmentActions.assignmentDeleteAssignment(
  //       this.props.match.params['uuid'], // may be: this.props.classroomTeacher.uuid, ? fixme
  //       assignment.uuid,
  //       true,
  //       this.props.match.params['uuid']
  //     )
  //   }
  // }
  //
  // handleEditAssignmentModal (assignment) {
  //   this.setState({
  //     showCreateAssigment: !this.state.showCreateAssigment
  //   })
  // }
  //
  // handleViewAssignment (assignment) {
  //   this.props.dispatch(push(BASE_URL + 'teacher/' + this.props.classroomTeacher.uuid + '/assignments/' + assignment.uuid))
  // }
  //
  // handleTitleChange (name) {
  //   var newClassroom = {}
  //
  //   if (!name) {
  //     name = 'classroom'
  //   }
  //
  //   newClassroom.name = name
  //   newClassroom.uuid = this.props.classroomTeacher.uuid
  //   this.props.classroomActions.classroomPartialUpdateTeacherClassroom(newClassroom)
  // }
  //
  // hideCopiedToolTip () {
  //   if (this.refs.overlay1) { this.refs.overlay1.hide() }
  //   if (this.refs.overlay2) { this.refs.overlay2.hide() }
  // }

  render () {
    // var assignmentUrl = BASE_URL + 'teacher/:uuid/assignments/:assigmentUuid'
    // var studentsListUrl = this.props.match.path + 'students/'
    // var isExactUrl = this.props.match.isExact // exact url for teacher view

    // var studentsS = ''
    // if (this.props.classroomTeacher && this.props.classroomTeacher.count_students > 1) {
    //   studentsS = 's'
    // }

    var copiedTooltip = (
      <Tooltip id='copiedTooltip'>
        Copied!
      </Tooltip>
    )

    return (
      <div className={'pop-up-window'}>
        <Grid fluid> { this.props.classroomTeacher
          ? <Col sm={12} md={12} style={{padding: 0}}>
            <Row style={{padding: 0}}>
              <Col sm={12} md={12} style={{textAlign: 'left', padding: 0}} >
                <a className={'back-button'} onClick={() => { history.push('/') }} >
                  <span className='glyphicon glyphicon-menu-left' style={{fontSize: 16}} />
                  My Curricula
                </a>
              </Col>
            </Row>
          </Col>
          : null }
        </Grid>
        <Tabs name='editCurriculumProfileTabs'
          className='tabs'
          handleSelect={
            (tabname, tabspace) => { }
          }
          selectedTab={this.state.teacherClassroomTab}
        >
          <div className='tab-links'>
            <TabLink to='profile'>Curriculum profile</TabLink>
            <TabLink to='settings'>Curriculum settings</TabLink>
            <TabLink to='edit'>Edit content</TabLink>
          </div>
          <div className='content'>
            <TabContent for='profile'>
              profile tab
            </TabContent>
            <TabContent for='settings'>
              settings tab
            </TabContent>
            <TabContent for='edit'>
              edit tab
            </TabContent>
          </div>
        </Tabs>
      </div>)
  }
}

// TeacherClassroomView.propTypes = {
//   tabActions: PropTypes.shape({
//     changeTeacherClassroomSelectedTab: PropTypes.func.isRequired,
//     changeSelectedTab: PropTypes.func.isRequired
//   }).isRequired,
//   teacherClassroomTab: PropTypes.string,
//   studentActions: PropTypes.shape({
//     classroomFetchStudentsClassroomList: PropTypes.func.isRequired
//   }).isRequired,
//   classroomActions: PropTypes.shape({
//     classroomFetchTeacherClassroom: PropTypes.func.isRequired,
//     classroomPartialUpdateTeacherClassroom: PropTypes.func.isRequired,
//     classroomDeleteTeacherClassroom: PropTypes.func.isRequired
//   }).isRequired,
//   assignmentActions: PropTypes.shape({
//     assignmentFetchAssignmentList: PropTypes.func.isRequired,
//     assignmentDeleteAssignment: PropTypes.func.isRequired,
//     assignmentFetchAssignment: PropTypes.func.isRequired
//   }).isRequired,
//   classroomTeacher: PropTypes.object,
//   assignmentsList: PropTypes.array,
//   assignment: PropTypes.object
//   // teacherClassroomStudentsList: PropTypes.array,
//   // gapiInitState: PropTypes.bool,
//   // googleActions: PropTypes.shape({
//   //   googleFetchAndSaveClassroomsStudents: PropTypes.func.isRequired
//   // }).isRequired
// }

const mapStateToProps = (state) => {
  return {
    // classroomTeacher: state.classroom.classroomTeacherClassroom,
    // teacherClassroomTab: state.tab.teacherClassroomTab,
    // assignmentsList: state.assignment.assignmentsList,
    // assignment: state.assignment.assignment,
    // teacherClassroomStudentsList: state.student.classroomStudentsList,
    // gapiInitState: state.google.gapiInitState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    // tabActions: bindActionCreators(tabsCreators, dispatch),
    // classroomActions: bindActionCreators(classroomCreators, dispatch),
    // assignmentActions: bindActionCreators(assignmentCreators, dispatch),
    // studentActions: bindActionCreators(studentCreators, dispatch),
    // googleActions: bindActionCreators(googleCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCurriculumProfileView)
export { EditCurriculumProfileView as EditCurriculumProfileViewNotConnected }
