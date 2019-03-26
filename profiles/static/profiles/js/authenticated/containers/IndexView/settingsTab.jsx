import React from 'react'

import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { RingLoader } from 'react-spinners'

import * as tabsCreators from '../../actions/tab'
import * as profileCreators from '../../actions/profile'
import SettingRow from './settingRow'

class SettingsTabView extends React.Component {
  componentWillMount () {
    this.props.tabActions.changeSelectedTab('settings', 'profileTab', this.props.match.params.id, false)
    if (!this.props.profile && !this.props.profile_fetching) {
      this.props.profileActions.fetchProfile(this.props.match.params.id)
    }
  }

  settingChanged (name, value) {
    var profile = {id: this.props.profile.id}
    profile[name] = value
    this.props.profileActions.updateReloadProfile(profile)
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
      {this.props.profile
        ? <Container fluid>
          <Row style={{paddingTop: '2rem'}}>
            <Col sm={12} md={12}>
              <div className={'blue-title'}>
               Sounds settings
              </div>
            </Col>
          </Row>
          <SettingRow
            value={this.props.profile.sound_enabled}
            onChange={(value) => { this.settingChanged('sound_enabled', value) }}
            uuid={'units'}
            text={'Sound effects'} />
        </Container>
        : <Container fluid>
          <Row>
            <Col sm={12} md={12}>
              <div style={{height: '10rem'}}>
                <div className='sweet-loading' style={{position: 'absolute'}}>
                  <RingLoader
                    color={'#1caff6'}
                    loading={Boolean(true)}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container> }
    </div>
  }
}

SettingsTabView.propTypes = {
  tabActions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  profileActions: PropTypes.shape({
    fetchProfile: PropTypes.func.isRequired,
    updateReloadProfile: PropTypes.func.isRequired
  }).isRequired,
  profile: PropTypes.object,
  profile_fetching: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    // tab: tab: state.tabs.profileTab,
    profile: state.profile.profile,
    profile_fetching: state.profile.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    tabActions: bindActionCreators(tabsCreators, dispatch),
    profileActions: bindActionCreators(profileCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTabView)
export { SettingsTabView as SettingsTabViewNotConnected }
