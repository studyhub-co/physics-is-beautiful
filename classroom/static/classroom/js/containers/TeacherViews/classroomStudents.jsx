import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { BASE_URL } from '../../utils/config'

import { StudentClassroomProfileView } from '../index'

import * as tabsCreators from '../../actions/tab'
import * as classroomCreators from '../../actions/classroom'
import * as studentCreators from '../../actions/student'

import { Route } from 'react-router'

import { Row, Col } from 'react-bootstrap'

import { TeacherStudentCard } from '../../components/TeacherStudentCard'
import * as googleCreators from '../../actions/google'

class TeacherClassroomStudentsView extends React.Component {

  constructor (props) {
    super(props)
    this.syncExternalStudents = this.syncExternalStudents.bind(this)
  }

  syncExternalStudents () {
    var googleClassroomsList = [
      {
        id: this.props.classroomTeacher.external_classroom.external_id,
        pib_classroom_uuid: this.props.classroomTeacher.uuid
      }
    ]
    this.props.googleActions.googleFetchAndSaveClassroomsStudents(googleClassroomsList, true)
  }

  componentWillMount () {
    if (!this.props.teacherClassroomStudentsList) {
      this.props.studentActions.classroomFetchStudentsClassroomList(this.props.match.params['uuid'])
    }
    if (!this.props.classroomTeacher) {
      this.props.classroomActions.classroomFetchTeacherClassroom(this.props.match.params['uuid'])
    }
  }

  render () {
    var isExactUrl = this.props.match.isExact // exact url for teacher view
    var studentProfileUrl = this.props.match.path + ':username'

    if (isExactUrl) {
      if (this.props.teacherClassroomTab !== 'students') {
        this.props.tabActions.changeTeacherClassroomSelectedTab('students', 'teacherClassroomTab', this.props.match)
      }
    }

    return (<div>
      { isExactUrl && this.props.classroomTeacher && this.props.classroomTeacher.external_classroom
        ? <Row>
          <Col sm={7} md={7} className={'vcenter'}>
            <span className={'gray-text'}>Keep your Google Classroom in sync</span>
          </Col>
          <Col sm={5} md={5}>
            <button
              disabled={!this.props.gapiInitState}
              className={'classroom-common-button'}
              onClick={this.syncExternalStudents}>Sync students</button>
          </Col>
        </Row> : null }
      <Route path={studentProfileUrl} component={StudentClassroomProfileView} />
      { isExactUrl && this.props.classroomTeacher
        ? <span>
          { this.props.teacherClassroomStudentsList ? this.props.teacherClassroomStudentsList.map(function (student, i) {
            return <TeacherStudentCard
              student={student}
              onStudentClick={() =>
                this.props.dispatch(push(BASE_URL +
                'teacher/' +
                this.props.classroomTeacher.uuid +
                '/students/' + student.username))}
              key={i} />
          }, this) : null }
          { this.props.teacherClassroomStudentsList.length === 0 ? <p style={{margin: '2rem'}}>There are no students in the classroom</p> : null }
          <div style={{clear: 'both'}} />
        </span>
        : null }
      { !isExactUrl && this.props.classroomTeacher && this.props.classroomTeacher.count_students === 0
        ? <div className={'gray-background-info-panel'}>No students have joined your classroom yet. <br /><br />
        Share the <u>classroom code</u> with your students so they can join your classroom.</div>
        : null}
    </div>)
  }
}

TeacherClassroomStudentsView.propTypes = {
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
  classroomTeacher: PropTypes.object,
  teacherClassroomStudentsList: PropTypes.array,
  googleActions: PropTypes.shape({
    googleFetchAndSaveClassroomsStudents: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    classroomTeacher: state.classroom.classroomTeacherClassroom,
    teacherClassroomTab: state.tab.teacherClassroomTab,
    // assignmentsList: state.assignment.assignmentsList,
    // assignment: state.assignment.assignment,
    teacherClassroomStudentsList: state.student.classroomStudentsList,
    gapiInitState: state.google.gapiInitState,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    tabActions: bindActionCreators(tabsCreators, dispatch),
    classroomActions: bindActionCreators(classroomCreators, dispatch),
    studentActions: bindActionCreators(studentCreators, dispatch),
    googleActions: bindActionCreators(googleCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherClassroomStudentsView)
export { TeacherClassroomStudentsView as TeacherClassroomStudentsViewNotConnected }
