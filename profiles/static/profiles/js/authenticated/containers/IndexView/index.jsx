import React, { useEffect } from 'react'
import { Route, withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import { BASE_URL } from '../../utils/config'

// import history from '../../history'
// import { Sheet } from '../../components/Sheet'
import * as profileCreators from '../../actions/profile'
import * as tabsCreators from '../../actions/tab'

import ProfileTabView from './profileTab'
import NotificationsTabView from './notificationsTab'
import SettingsTabView from './settingsTab'
import ActivityTabView from './activityTab'

// class IndexView extends React.Component {
//   // componentWillMount () { // deprecated
//   componentDidMount () {
//     if (!this.props.profile && !this.props.profile_fetching) {
//       this.props.profileActions.fetchProfile(this.props.match.params.id)
//     }
//   }
//
//   // TODO remove custom user profile from state on component unmount
//
//   // componentDidUpdate (prevProps, prevState, snapshot) {
//   //   const { history } = this.props
//   //
//   //   if (this.props.profile &&
//   //       this.props.match.params?.id === 'me') {
//   //     // redirect to profile with id (not 'me')
//   //     this.props.tabActions.changeSelectedTab(
//   //       'profile', 'profileTab',
//   //       this.props.profile.id, history
//   //     )
//   //   }
//   // }
//
//   render () {
//     const profileSettingsUrl = `${BASE_URL}/:id/settings/`
//     const profileNotificationsUrl = `${BASE_URL}/:id/notifications/`
//     const profileActivityUrl = `${BASE_URL}/:id/activity/`
//
//     const { history } = this.props
//
//     return (
//       // <Sheet>
//       <Tabs name='profileTab'
//         className='tabs'
//         handleSelect={
//           (selectedTab, tabNamespace) => {
//             this.props.tabActions.changeSelectedTab(
//               selectedTab,
//               tabNamespace,
//               this.props.match.params.id,
//               history)
//           }
//         }
//         selectedTab={this.props.tab}
//       >
//         <div className='tab-links'>
//           <TabLink to='profile'>Profile</TabLink>
//           {this.props.profile && this.props.profile.is_current_user_profile
//             ? <TabLink to='settings'>Settings</TabLink> : null }
//           <TabLink to='activity'>Activity</TabLink>
//           {this.props.profile && this.props.profile.is_current_user_profile
//             ? <TabLink to='notifications'>Notifications</TabLink>
//             : null }
//         </div>
//         <div className='content'>
//           <TabContent for='profile'>
//             <ProfileTabView profileId={this.props.match.params.id} />
//           </TabContent>
//           {this.props.profile && this.props.profile.is_current_user_profile
//             ? <TabContent for='settings'>
//               <Route exact path={profileSettingsUrl} component={SettingsTabView} />
//             </TabContent> : null }
//           <TabContent for='activity'>
//             <Route exact path={profileActivityUrl} component={ActivityTabView} />
//           </TabContent>
//           {this.props.profile && this.props.profile.is_current_user_profile
//             ? <TabContent for='notifications'>
//               <Route exact path={profileNotificationsUrl} component={NotificationsTabView} />
//               <Route exact path={profileNotificationsUrl + ':filter/'} component={NotificationsTabView} />
//             </TabContent> : null }
//         </div>
//       </Tabs>
//       // </Sheet>
//     )
//   }
// }

const IndexView = (props) => {
  const {
    profile_fetching, history, profile,
    profileActions, match, tab, tabActions
  } = props

  useEffect(() => {
    if (!profile && !profile_fetching) {
      profileActions.fetchProfile(match.params.id)
    }
  }, [])

  useEffect(() => {
    if (match.isExact && tab !== 'profile') {
      tabActions.changeSelectedTab(
        'profile',
        'profileTab',
        match.params.id,
        history,
        true)
    }
  }, [match, tab])

  // TODO remove custom user profile from state on component unmount
  const profileSettingsUrl = `${BASE_URL}/:id/settings/`
  const profileNotificationsUrl = `${BASE_URL}/:id/notifications/`
  const profileActivityUrl = `${BASE_URL}/:id/activity/`

  return (
  // <Sheet>
    <Tabs name='profileTab'
      className='tabs'
      handleSelect={
        (selectedTab, tabNamespace) => {
          tabActions.changeSelectedTab(
            selectedTab,
            tabNamespace,
            match.params.id,
            history)
        }
      }
      selectedTab={tab}
    >
      <div className='tab-links'>
        <TabLink to='profile'>Profile</TabLink>
        {profile && profile.is_current_user_profile
          ? <TabLink to='settings'>Settings</TabLink> : null }
        <TabLink to='activity'>Activity</TabLink>
        {profile && profile.is_current_user_profile
          ? <TabLink to='notifications'>Notifications</TabLink>
          : null }
      </div>
      <div className='content'>
        <TabContent for='profile'>
          <ProfileTabView profileId={match.params.id} />
        </TabContent>
        {profile && profile.is_current_user_profile
          ? <TabContent for='settings'>
            <Route exact path={profileSettingsUrl} component={SettingsTabView} />
          </TabContent> : null }
        <TabContent for='activity'>
          <Route exact path={profileActivityUrl} component={ActivityTabView} />
        </TabContent>
        {profile && profile.is_current_user_profile
          ? <TabContent for='notifications'>
            <Route exact path={profileNotificationsUrl} component={NotificationsTabView} />
            <Route exact path={profileNotificationsUrl + ':filter/'} component={NotificationsTabView} />
          </TabContent> : null }
      </div>
    </Tabs>
  // </Sheet>
  )
}

IndexView.propTypes = {
  // actions
  tabActions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  profileActions: PropTypes.shape({
    fetchProfile: PropTypes.func.isRequired
  }).isRequired,
  // data
  tab: PropTypes.string,
  profile: PropTypes.object,
  profile_fetching: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    tab: state.tabs.profileTab,
    profile: state.profileCustom.profile,
    profile_fetching: state.profileCustom.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    // profileActions: bindActionCreators(profileCreators, dispatch)
    tabActions: bindActionCreators(tabsCreators, dispatch),
    profileActions: bindActionCreators(profileCreators, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IndexView))
export { IndexView as IndexViewNotConnected }
