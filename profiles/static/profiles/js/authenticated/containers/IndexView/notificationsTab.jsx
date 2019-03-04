import React from 'react'

import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'

import * as tabsCreators from '../../actions/tab'

class NotificationsTabView extends React.Component {
  componentWillMount () {
    // this.props.profileActions.()
    this.props.tabActions.changeSelectedTab('notifications', 'profileTab', this.props.match.params.id, false)
  }

  render () {
    // var baseUrl =  this.props.match.url.replace(/\/$/, '')
    // var studentClassroomUrl = baseUrl + '/:uuid/'
    //
    // var joinUrl = baseUrl + '/new/join'
    //
    // if (this.props.match.params && this.props.match.params.joinCode) {
    //   var joinCode = this.props.match.params.joinCode
    //   // join to classroom and redirect to classroom student view
    //   if (joinCode) {
    //     this.props.classroomActions.classroomJoinClassroom(joinCode)
    //   }
    // }

    return <div>
      NotificationsTabView
    </div>
  }
}

NotificationsTabView.propTypes = {
  tabActions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    // tab: tab: state.tabs.profileTab,
    // classroomStudentList: state.classroom.classroomStudentList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    tabActions: bindActionCreators(tabsCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsTabView)
export { NotificationsTabView as NotificationsTabViewNotConnected }
