import React from 'react'

import PropTypes from 'prop-types'
// import { Route } from 'react-router'
// import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import { Container, Row, Col, Button, Glyphicon, Overlay, Image, FormGroup, InputGroup, FormControl } from 'react-bootstrap'
// import { RingLoader } from 'react-spinners'
// import Moment from 'react-moment'

import * as tabsCreators from '../../actions/tab'
import * as profileCreators from '../../actions/profile'

import Badge from '../../components/Badge'

class ActivityTabView extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentWillMount () {
    // if (!this.props.profile && !this.props.profile_fetching) {
    //   this.props.profileActions.fetchProfile(this.props.profileId)
    // }
    this.props.tabActions.changeSelectedTab('activity', 'profileTab', this.props.match.params.id, false)
    if (!this.props.badges) {
      this.props.profileActions.fetchBadges(this.props.match.params.id)
    }
  }

  render () {
    return <div>
      <Row style={{paddingTop: '2rem'}}>
        <Col sm={12} md={12}>
          <div className={'blue-title'}>
           Badges Awarded
          </div>
        </Col>
      </Row>
      <Row style={{paddingTop: '2rem'}}>
        <Col sm={12} md={12}>
          {this.props.badges
            // TODO sort by level
            ? <div>
              { this.props.badges.length === 0 ? <span>No badges</span> : null }
              { this.props.badges.map(function (badge, i) {
              // TODO create badge component
              //   return <div key={badge.id}>{badge.title} {badge.count > 1 ? 'x ' + badge.count : null}</div>
                return <Badge key={badge.id} badge={badge} />
              }) }
            </div>
            : null }
        </Col>

      </Row>
    </div>
  }
}

ActivityTabView.propTypes = {
  tabActions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  profileActions: PropTypes.shape({
    // fetchProfile: PropTypes.func.isRequired,
    // updateReloadProfile: PropTypes.func.isRequired
    fetchBadges: PropTypes.func.isRequired
  }).isRequired,
  // profile_fetching: PropTypes.bool,
  // profile: PropTypes.object,
  badges: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    // tab: tab: state.tabs.profileTab,
    // profile: state.profile.profile,
    // profile_fetching: state.profile.fetching
    badges: state.profile.badges
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    tabActions: bindActionCreators(tabsCreators, dispatch),
    profileActions: bindActionCreators(profileCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityTabView)
export { ActivityTabView as ProfileTabViewNotConnected }
