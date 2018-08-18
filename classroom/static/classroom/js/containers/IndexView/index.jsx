import React from 'react'
// import { push } from 'react-router-redux'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import { TeacherClassroomCard } from '../../components/TeacherClassroomCard'

import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import { CreateClassroomView, JoinClassroomView,
  StudentClassroomView, TeacherClassroomView } from '../../containers/index'

import * as tabsCreators from '../../actions/tab'
import * as classroomCreators from '../../actions/classroom'

import { Route } from 'react-router'
import { StudentClassroomRow } from '../../components/StudentClassroomRow'

import { Grid } from 'react-bootstrap'

class IndexView extends React.Component {
  // goToProtected () {
  //   this.props.dispatch(push('/protected'))
  // }

  componentWillMount () {
    this.props.classroomActions.classroomFetchTeacherClassroomsList()
    this.props.classroomActions.classroomFetchStudentClassroomsList()
  }

  render () {
    var baseUrl =  this.props.match.url.replace(/\/$/, '')
    var createUrl = baseUrl + '/create'
    var teacherUrl = baseUrl + '/:uuid/teacher/'
    var studentUrl = baseUrl + '/:uuid/student/'
    // var autoJointUrl = baseUrl + '/:uuid/join/'
    var editUrl = baseUrl + '/:uuid/edit/'
    var joinUrl = baseUrl + '/join'

    if (this.props.match.params && this.props.match.params.joinCode){
      var joinCode = this.props.match.params.joinCode
      // join to classroom and redirect to classroom student view
      this.props.classroomActions.classroomJoinClassroom(joinCode)
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
              {this.props.location.pathname === '/classroom/' && this.props.classroomStudentList
                ? <Grid fluid>{ this.props.classroomStudentList.map(function (classroom, i) {
                  return <StudentClassroomRow
                    classroom={classroom}
                    onAssignmentsClick={(url) => this.props.dispatch(push(url))}
                    baseUrl={baseUrl}
                    key={i} />
                }, this)}
                </Grid> : null }
              <Route path={studentUrl} component={StudentClassroomView} />
              <Route path={joinUrl} component={JoinClassroomView} />
              {/* if classrooms list and not empty */}
              {this.props.classroomStudentList && this.props.classroomStudentList.length > 0
                ? <div>
                  {this.props.location.pathname.lastIndexOf('/classroom/', 0) === 0 ? <div className={'create-classroom-button'}
                    onClick={() => this.props.dispatch(push(joinUrl))}>
                  + Join another classroom
                  </div> : null}
                </div>
                : null }
              {this.props.classroomStudentList && this.props.classroomStudentList.length === 0
                ? <JoinClassroomView /> : null }
            </TabContent>
            <TabContent for='teacher'>
              {this.props.location.pathname === '/classroom/'
                ? <Grid fluid>
                  <h2>All classrooms</h2>
                  {this.props.classroomList
                    ? <div> { this.props.classroomList.map(function (classroom, i) {
                      return <TeacherClassroomCard
                        classroom={classroom}
                        onTitleClick={(url) => this.props.dispatch(push(url))}
                        baseUrl={baseUrl}
                        key={i} />
                    }, this)}
                    <div style={{'clear': 'both'}} />
                    </div> : null }
                </Grid>
                : null
              }
              <Route path={createUrl} component={CreateClassroomView} />
              <Route path={editUrl} component={CreateClassroomView} />
              <Route path={teacherUrl} component={TeacherClassroomView} />
              {this.props.location.pathname === '/classroom/' ? <div className={'create-classroom-button'}
                onClick={() => this.props.dispatch(push(createUrl))}>
                + Create classroom
              </div> : null}
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
  classroomActions: PropTypes.shape({
    classroomFetchTeacherClassroomsList: PropTypes.func.isRequired,
    classroomFetchStudentClassroomsList: PropTypes.func.isRequired,
    classroomJoinClassroom: PropTypes.func.isRequired
  }).isRequired,
  tab: PropTypes.string,
  classroomList: PropTypes.array,
  classroomStudentList: PropTypes.array,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    tab: state.tab.tab,
    classroomList: state.classroom.classroomList,
    classroomStudentList: state.classroom.classroomStudentList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    tabActions: bindActionCreators(tabsCreators, dispatch),
    classroomActions: bindActionCreators(classroomCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
export { IndexView as IndexViewNotConnected }
