import React from 'react'

import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { RingLoader } from 'react-spinners'

import * as tabsCreators from '../../actions/tab'
import * as profileCreators from '../../actions/profile'
import SettingRow from './settingRow'

class SettingsTabView extends React.Component {
  // TODO https://github.com/studyhub-co/physics-is-beautiful/issues/210
  componentWillMount() {
    const { history } = this.props
    this.props.tabActions.changeSelectedTab(
      'settings',
      'profileTab',
      this.props.match.params.id,
      history,
      false,
    )
    if (!this.props.profile && !this.props.profile_fetching) {
      this.props.profileActions.fetchProfile(this.props.match.params.id)
    }
  }

  settingChanged(name, value) {
    var profile = { id: this.props.profile.id || this.props.match.params.id }
    profile[name] = value

    // this.props.profileActions.updateReloadProfile(profile)
    this.props.profileActions.updateProfile(profile)
  }

  render() {
    return (
      <div>
        {this.props.profile ? (
          <Container fluid>
            <Row style={{ paddingTop: '2rem' }}>
              <Col sm={12} md={12}>
                <div className={'blue-title'}>Sound settings</div>
              </Col>
            </Row>
            <SettingRow
              value={this.props.profile.sound_enabled}
              onChange={value => {
                this.settingChanged('sound_enabled', value)
              }}
              uuid={'sound'}
              text={'Sound effects'}
            />
          </Container>
        ) : (
          <Container fluid>
            <Row>
              <Col sm={12} md={12}>
                <div style={{ height: '10rem' }}>
                  <div
                    className="sweet-loading"
                    style={{ position: 'absolute' }}
                  >
                    <RingLoader color={'#1caff6'} loading={Boolean(true)} />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    )
  }
}

SettingsTabView.propTypes = {
  tabActions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired,
  }).isRequired,
  profileActions: PropTypes.shape({
    fetchProfile: PropTypes.func.isRequired,
    // updateReloadProfile: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
  }).isRequired,
  profile: PropTypes.object,
  profile_fetching: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    // tab: tab: state.tabs.profileTab,
    profile: state.profileCustom.profile,
    profile_fetching: state.profileCustom.fetching,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    tabActions: bindActionCreators(tabsCreators, dispatch),
    profileActions: bindActionCreators(profileCreators, dispatch),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SettingsTabView),
)
export { SettingsTabView as SettingsTabViewNotConnected }
