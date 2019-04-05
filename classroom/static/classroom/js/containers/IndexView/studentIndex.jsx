import React from 'react'

import PropTypes from 'prop-types'

import { Route } from 'react-router'

import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Container } from 'react-bootstrap'

import { JoinClassroomView, StudentClassroomView } from '../index'
import { StudentClassroomRow } from '../../components/StudentClassroomRow'

import * as tabsCreators from '../../actions/tab'
import * as classroomCreators from '../../actions/classroom'

class StudentIndexView extends React.Component {

  componentWillMount () {
    this.props.classroomActions.classroomFetchStudentClassroomsList()
    this.props.tabActions.changeSelectedTab('student', 'tab', true)
  }

  render () {
    var baseUrl =  this.props.match.url.replace(/\/$/, '')
    var studentClassroomUrl = baseUrl + '/:uuid/'

    var joinUrl = baseUrl + '/new/join'

    if (this.props.match.params && this.props.match.params.joinCode) {
      var joinCode = this.props.match.params.joinCode
      // join to classroom and redirect to classroom student view
      if (joinCode) {
        this.props.classroomActions.classroomJoinClassroom(joinCode)
      }
    }

    return <div>
      {this.props.location.pathname === '/classroom/student/' && this.props.classroomStudentList
        ? <Container fluid>{ this.props.classroomStudentList.map(function (classroom, i) {
          return <StudentClassroomRow
            classroom={classroom}
            onAssignmentsClick={(url) => this.props.dispatch(push(url))}
            baseUrl={baseUrl}
            key={i} />
        }, this)}
        </Container> : null }
      <Route exact path={studentClassroomUrl} component={StudentClassroomView} />
      {/* TODO I think iti is better to move  join URL to routes.jsx */}
      <Route path={joinUrl} component={JoinClassroomView} />
      {/* if classrooms list and not empty */}
      {this.props.classroomStudentList && this.props.classroomStudentList.length > 0
        ? <div>
          {this.props.location.pathname.lastIndexOf('/classroom/', 0) === 0 ? <div className={'join-another-classroom'}
            onClick={() => this.props.dispatch(push(joinUrl))}>
          + Join another classroom
          </div> : null}
        </div>
        : null }
      {this.props.classroomStudentList && this.props.classroomStudentList.length === 0
        ? <JoinClassroomView /> : null }</div>
  }
}

StudentIndexView.propTypes = {
  tabActions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  classroomActions: PropTypes.shape({
    classroomCreateClassroom: PropTypes.func.isRequired,
    classroomFetchTeacherClassroomsList: PropTypes.func.isRequired,
    classroomFetchStudentClassroomsList: PropTypes.func.isRequired,
    classroomJoinClassroom: PropTypes.func.isRequired
  }).isRequired,
  tab: PropTypes.string,
  classroomStudentList: PropTypes.array,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    tab: state.tab.tab,
    classroomStudentList: state.classroom.classroomStudentList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    tabActions: bindActionCreators(tabsCreators, dispatch),
    classroomActions: bindActionCreators(classroomCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentIndexView)
export { StudentIndexView as StudentIndexViewNotConnected }
