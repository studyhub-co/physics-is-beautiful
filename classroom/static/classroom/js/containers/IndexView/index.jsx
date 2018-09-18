import React from 'react'
// import { push } from 'react-router-redux'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import { StudentIndexView, TeacherIndexView } from '../../containers/index'

import * as tabsCreators from '../../actions/tab'
import * as classroomCreators from '../../actions/classroom'
import * as googleCreators from '../../actions/google'

import { Route } from 'react-router'
// import { StudentClassroomRow } from '../../components/StudentClassroomRow'

// import { StudentClassroomView } from '../index'

class IndexView extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.getGoogleClassroomList = this.getGoogleClassroomList.bind(this)
  //   this.handleImportGoogleClassroom = this.handleImportGoogleClassroom.bind(this)
  //   this.onGoogleClassroomClick = this.onGoogleClassroomClick.bind(this)
  //   this.nextStepGoogleImportClick = this.nextStepGoogleImportClick.bind(this)
  //   this.prevStepGoogleImportClick = this.prevStepGoogleImportClick.bind(this)
  //   this.selectedCurriculumGoogleImportChanged = this.selectedCurriculumGoogleImportChanged.bind(this)
  //   this.state = { showSelectGoogleClassroom: false,
  //     googleClassroomsSelected: [],
  //     googleCurriculumSelected: null,
  //     googleClassroomsImportStep: 1
  //   }
  // }

  // componentWillMount () {
  //   this.props.googleActions.gapiInitialize()
  //   this.props.classroomActions.classroomFetchTeacherClassroomsList()
  //   this.props.classroomActions.classroomFetchStudentClassroomsList()
  // }

  // componentWillReceiveProps (props) {
  //   if (props.tab !== this.props.tab) {
  //     if (props.tab === 'student') {
  //       this.props.classroomActions.classroomFetchStudentClassroomsList()
  //     } else if (props.tab === 'teacher') {
  //       this.props.classroomActions.classroomFetchTeacherClassroomsList()
  //     }
  //   }
  // }

  render () {
    var baseUrl =  this.props.match.url.replace(/\/$/, '')
    // var createUrl = baseUrl + '/create'
    // var teacherUrl = baseUrl + '/:uuid/teacher/'
    var studentIndexUrl = baseUrl + '/student/'
    var teacherIndexUrl = baseUrl + '/teacher/'
    // var editUrl = baseUrl + '/:uuid/edit/'
    // var joinUrl = baseUrl + '/join'

    if (this.props.match.url === '/classroom/' && this.props.match.isExact) {
      this.props.dispatch(push(studentIndexUrl)) // redirect to student index page
    }

    return (
      <Sheet>
        <Tabs name='tab'
          className='tabs'
          handleSelect={this.props.tabActions.changeSelectedTab}
          selectedTab={this.props.tab}
        >
          <div className='tab-links'>
            <TabLink to='student'>Student</TabLink>
            <TabLink to='teacher'>Teacher</TabLink>
          </div>
          <div className='content'>
            <TabContent for='student'>
              <Route path={studentIndexUrl} component={StudentIndexView} />
            </TabContent>
            <TabContent for='teacher'>
              <Route path={teacherIndexUrl} component={TeacherIndexView} />
            </TabContent>
          </div>
        </Tabs>
      </Sheet>
    )
  }
}

IndexView.propTypes = {
  tabActions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  // googleActions: PropTypes.shape({
  //   googleFetchClassroomList: PropTypes.func.isRequired,
  //   gapiInitialize: PropTypes.func.isRequired,
  //   googleSaveClassroomsWithStudents: PropTypes.func.isRequired
  // }).isRequired,
  // classroomActions: PropTypes.shape({
  //   classroomCreateClassroom: PropTypes.func.isRequired,
  //   classroomFetchTeacherClassroomsList: PropTypes.func.isRequired,
  //   classroomFetchStudentClassroomsList: PropTypes.func.isRequired,
  //   classroomJoinClassroom: PropTypes.func.isRequired
  // }).isRequired,
  tab: PropTypes.string,
  // classroomList: PropTypes.array,
  // classroomStudentList: PropTypes.array,
  // googleClassroomsList: PropTypes.array,
  // gapiInitState: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    tab: state.tab.tab,
    // classroomList: state.classroom.classroomList,
    // classroomStudentList: state.classroom.classroomStudentList,
    // googleClassroomsList: state.google.googleClassroomsList,
    gapiInitState: state.google.gapiInitState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    tabActions: bindActionCreators(tabsCreators, dispatch),
    // classroomActions: bindActionCreators(classroomCreators, dispatch),
    // googleActions: bindActionCreators(googleCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
export { IndexView as IndexViewNotConnected }
