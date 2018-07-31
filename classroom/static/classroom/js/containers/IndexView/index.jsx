import React from 'react'
// import { push } from 'react-router-redux'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import { ClassroomCard } from '../../components/ClassroomCard'

import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import { EditClassroomView, JoinClassroomView, StudentClassroomView } from '../../containers/index'

import * as actionCreators from '../../actions/tab'
import * as classroomCreators from '../../actions/classroom'

import { Route } from 'react-router'
import { ClassroomStudentRow } from '../../components/ClassroomStudentRow'

import { Grid } from 'react-bootstrap'

class IndexView extends React.Component {
  // goToProtected () {
  //   this.props.dispatch(push('/protected'))
  // }

  componentWillMount () {
    this.props.classroomActions.classroomFetchClassroomsList()
    this.props.classroomActions.classroomFetchStudentClassroomsList()
  }

  render () {
    var baseUrl =  this.props.match.url.replace(/\/$/, '')
    var createUrl = baseUrl + '/create'
    var editUrl = baseUrl + '/:uuid/edit/'
    var studentUrl = baseUrl + '/:uuid/student/'
    var joinUrl = baseUrl + '/join'

    return (
      <Sheet>
        <Tabs name='tab'
          className='tabs'
          handleSelect={this.props.actions.changeSelectedTab}
          selectedTab={this.props.tab}
        >
          <div className='tab-links'>
            <TabLink to='student'>Student</TabLink>
            <TabLink to='teacher'>Teacher</TabLink>
          </div>
          <div className='content'>
            <TabContent for='student'>
              {this.props.location.pathname === '/classroom/' && this.props.classroomStudentList ? <Grid fluid>{ this.props.classroomStudentList.map(function (classroom, i) {
                return <ClassroomStudentRow
                  classroom={classroom}
                  onAssignmentsClick={(url) => this.props.dispatch(push(url))}
                  baseUrl={baseUrl}
                  key={i} />
              }, this)}
              {/* <div style={{'clear': 'both'}} /> leaveClassroom={this.props.classroomActions.classroomLeaveClassroom}  */}
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
                ? <div>
                  <h2>All classrooms</h2>
                  {this.props.classroomList ? <div>{ this.props.classroomList.map(function (classroom, i) {
                    return <ClassroomCard classroom={classroom} key={i} />
                  })}
                  <div style={{'clear': 'both'}} />
                  </div> : null }
                </div>
                : null
              }
              <Route path={createUrl} component={EditClassroomView} />
              <Route path={editUrl} component={EditClassroomView} />
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
  actions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  classroomActions: PropTypes.shape({
    classroomFetchClassroomsList: PropTypes.func.isRequired,
    classroomFetchStudentClassroomsList: PropTypes.func.isRequired,
    classroomLeaveClassroom: PropTypes.func.isRequired
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
    actions: bindActionCreators(actionCreators, dispatch),
    classroomActions: bindActionCreators(classroomCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
export { IndexView as IndexViewNotConnected }
