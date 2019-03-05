import React from 'react'

import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { RingLoader } from 'react-spinners'
import InfiniteScroll from 'react-infinite-scroller'
import Moment from 'react-moment'

import * as tabsCreators from '../../actions/tab'
import * as notificationsCreators from '../../actions/notifications'
// import * as profileCreators from '../../actions/profile'

import Profile from '../../components/NotificationsDeserializers/profile'
import Thread from '../../components/NotificationsDeserializers/thread'

class NotificationsTabView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nextHref: null,
      notifications: []
    }

    this.loadNextPage = this.loadNextPage.bind(this)
  }

  componentWillMount () {
    this.props.tabActions.changeSelectedTab('notifications', 'profileTab', this.props.match.params.id, false)
    // if (!this.props.profile && !this.props.profile_fetching) {
    //   this.props.profileActions.fetchProfile(this.props.match.params.id)
    // }
    this.props.notificationsActions.fetchNotifications()
  }

  componentWillReceiveProps (nexProps) {
    if (nexProps.notifications !== this.props.notifications) {
      var notifications = this.state.notifications.concat(nexProps.notifications['results'])

      this.setState({
        notifications: notifications,
        nextHref: nexProps.notifications['next']
      })
    }
  }

  loadNextPage () {
    var self = this

    if (self.state.newNextPageUrl) {
      this.props.notificationsActions.fetchNotifications(self.state.newNextPageUrl)
    }
  }

  render () {
    var items = []
    if (this.props.notifications) {
      for (var i = 0; i < this.state.notifications.length; i++) {
        var currentItem = this.state.notifications[i]

        items.push(
          <Row key={currentItem.slug}>
            <Col sm={1} md={1}>
              {/*<Moment fromNow>*/}
              {currentItem['timesince']}
              {/*</Moment>*/}
            </Col>
            <Col sm={3} md={3}>
              <Profile profile={currentItem['actor']} />
            </Col>
            <Col sm={3} md={3}>
              {currentItem['unread']
                ? <b>{currentItem['verb']}</b>
                : <span>{currentItem['verb']}</span>
              }
            </Col>
            <Col sm={3} md={3}>
              { currentItem['target']['content_type'] === 'thread'
                ? <Thread thread={currentItem['target']} />
                : null
              }
            </Col>
          </Row>
        )
      }
    }

    return <div>
      {this.props.notifications
        ? <Grid fluid>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadNextPage}
            hasMore={this.state.hasMoreItems}
            loader={<div key={this.state.nextHref} style={{clear: 'both'}} />} // fix https://github.com/CassetteRocks/react-infinite-scroller/issues/14#issuecomment-225835845
          >
            {items}
          </InfiniteScroll>
        </Grid>
        : <Grid fluid>
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
        </Grid>
      }
    </div>
  }
}

NotificationsTabView.propTypes = {
  tabActions: PropTypes.shape({
    changeSelectedTab: PropTypes.func.isRequired
  }).isRequired,
  // profileActions: PropTypes.shape({
  //   fetchProfile: PropTypes.func.isRequired,
  //   updateReloadProfile: PropTypes.func.isRequired
  // }).isRequired,
  notificationsActions: PropTypes.shape({
    fetchNotifications: PropTypes.func.isRequired
  }).isRequired,
  profile: PropTypes.object,
  profile_fetching: PropTypes.bool,
  notifications: PropTypes.object
  // dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    // profile: state.profile.profile,
    // profile_fetching: state.profile.fetching
    notifications: state.notifications.notifications,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    tabActions: bindActionCreators(tabsCreators, dispatch),
    notificationsActions: bindActionCreators(notificationsCreators, dispatch),
    // profileActions: bindActionCreators(profileCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsTabView)
export { NotificationsTabView as NotificationsTabViewNotConnected }
