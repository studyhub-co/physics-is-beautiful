import React from 'react'

import { withRouter } from 'react-router'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import { Container, Row, Col, Button, Glyphicon, Overlay, Image, FormGroup, InputGroup, FormControl } from 'react-bootstrap'
// import { RingLoader } from 'react-spinners'
// import Moment from 'react-moment'

import * as tabsCreators from '../../actions/tab'
import * as profileCreators from '../../actions/profile'

import { BASE_URL } from '../../utils/config'

import Badge from '../../components/Badge'

class ActivityTabView extends React.Component {
  // constructor (props, context) {
  //   super(props, context)
  // }

  // TODO https://github.com/studyhub-co/physics-is-beautiful/issues/210
  componentWillMount() {
    // if (!this.props.profile && !this.props.profile_fetching) {
    //   this.props.profileActions.fetchProfile(this.props.profileId)
    // }
    const { history } = this.props

    this.props.tabActions.changeSelectedTab(
      'activity',
      'profileTab',
      this.props.match.params.id,
      history,
      false,
    )
    if (!this.props.badges) {
      this.props.profileActions.fetchBadges(this.props.match.params.id)
    }
  }

  render() {
    const { history } = this.props
    const { id } = this.props.match.params

    return (
      <div>
        <Row style={{ paddingTop: '2rem' }}>
          <Col sm={12} md={12}>
            <div className={'blue-title'}>Badges Awarded</div>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
            {this.props.badges ? (
              // TODO sort by level
              <div>
                {this.props.badges.length === 0 ? <span>No badges</span> : null}
                {this.props.badges.map(function(badge, i) {
                  return (
                    <Badge
                      key={badge.id}
                      badge={badge}
                      history={history}
                      notificationsUrl={`${BASE_URL}/${id}/notifications/`}
                    />
                  )
                })}
              </div>
            ) : null}
          </Col>
        </Row>
      </div>
    )
  }
}

ActivityTabView.propTypes = {
  tabActions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired,
  }).isRequired,
  profileActions: PropTypes.shape({
    // fetchProfile: PropTypes.func.isRequired,
    // updateReloadProfile: PropTypes.func.isRequired
    fetchBadges: PropTypes.func.isRequired,
  }).isRequired,
  // profile_fetching: PropTypes.bool,
  // profile: PropTypes.object,
  badges: PropTypes.array,
}

const mapStateToProps = state => {
  return {
    // tab: tab: state.tabs.profileTab,
    // profile: state.profileCustom.profile,
    // profile_fetching: state.profileCustom.fetching
    badges: state.profileCustom.badges,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    tabActions: bindActionCreators(tabsCreators, dispatch),
    profileActions: bindActionCreators(profileCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityTabView)
export { ActivityTabView as ProfileTabViewNotConnected }
