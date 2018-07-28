import React from 'react'
// import { push } from 'react-router-redux'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Sheet } from '../../components/Sheet'

import { ClassroomCard } from '../../components/ClassroomCard'
import { JoinClassroomButton } from '../../components/JoinClassroomButton'

import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import { EditClassroomView, JoinClassroomView } from '../../containers/index'

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
    var createUrl = this.props.match.url.replace(/\/$/, '') + '/create'
    var editUrl = this.props.match.url.replace(/\/$/, '') + '/edit/:uuid/'
    var joinUrl = this.props.match.url.replace(/\/$/, '') + '/join'

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
              {this.props.classroomStudentList ? <Grid fluid>{ this.props.classroomStudentList.map(function (classroom, i) {
                return <ClassroomStudentRow classroom={classroom} key={i} />
              })}
              {/* <div style={{'clear': 'both'}} /> */}
              </Grid> : null }
              <Route path={joinUrl} component={JoinClassroomView} />
              {/* TODO if classrooms list and not empty */}
              {this.props.classroomStudentList && this.props.classroomStudentList.length > 0
                ? <div>
                  {this.props.location.pathname === '/classroom/' ? <div className={'create-classroom-button'}
                    onClick={() => this.props.dispatch(push(joinUrl))}>
                  + Join classroom
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
    classroomFetchStudentClassroomsList: PropTypes.func.isRequired
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
