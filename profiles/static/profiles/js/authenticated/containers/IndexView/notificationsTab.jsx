import React from 'react'

import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
// import Glyphicon from 'react-bootstrap/Glyphicon'
import { FaCheck } from 'react-icons/fa'

import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { RingLoader } from 'react-spinners'
import InfiniteScroll from 'react-infinite-scroller'
// import Moment from 'react-moment'

import history from '../../history'

import * as tabsCreators from '../../actions/tab'
import * as notificationsCreators from '../../actions/notifications'
// import * as profileCreators from '../../actions/profile'

import Profile from '../../components/NotificationsDeserializers/profile'
import Thread from '../../components/NotificationsDeserializers/thread'
import Badge from '../../components/NotificationsDeserializers/badge'
import Lesson from '../../components/NotificationsDeserializers/lesson'
import Module from '../../components/NotificationsDeserializers/module'

class NotificationsTabView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nextHref: null,
      notifications: []
    }

    this.loadNextPage = this.loadNextPage.bind(this)
    this.onFilterClick = this.onFilterClick.bind(this)
    this.markAs = this.markAs.bind(this)
  }

  componentWillMount () {
    // if (!this.props.profile && !this.props.profile_fetching) {
    //   this.props.profileActions.fetchProfile(this.props.match.params.id)
    // }
    // var path = this.props.match.path
    // if (path.indexOf('/notifications/', path.length - '/notifications/'.length) !== -1) {
    if (!this.props.match.params.hasOwnProperty('filter') || this.props.match.params['filter'] !== 'read') {
      this.props.notificationsActions.fetchNotifications(null, {'filter': 'unread'})
      this.props.tabActions.changeSelectedTab('notifications', 'profileTab', this.props.match.params.id, false)
    }

    // console.log(this.props.match.params);
    // if (path.indexOf('/notifications/read/', path.length - '/notifications/read/'.length) !== -1) {
    if (this.props.match.params.hasOwnProperty('filter') && this.props.match.params['filter'] === 'read') {
      this.props.notificationsActions.fetchNotifications(null, {'filter': 'read'})
      this.props.tabActions.changeSelectedTab('notifications', 'profileTab', this.props.match.params.id, false, 'read')
    }
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

  onFilterClick (filter) {
    if (this.props.cancelSource) {
      // cancel prev request
      this.props.cancelSource.cancel()
    }

    if (filter === 'unread') {
      if (this.props.match.params.hasOwnProperty('filter') && this.props.match.params['filter'] === 'read') {
        var unReadUrl = this.props.match.url.replace(/read\/$/, '');
        history.push(unReadUrl)
      }
    }
    if (filter === 'read') {
      if (!this.props.match.params.hasOwnProperty('filter') || this.props.match.params['filter'] !== 'read') {
        var readUrl = this.props.match.url + 'read/'
        history.push(readUrl)
      }
    }
  }

  markAs (id) {
    // remove from this.state.notifications
    var notifications = this.state.notifications.filter(obj => obj.id !== id)
    this.setState({notifications: notifications})
    if (this.props.match.params.hasOwnProperty('filter') && this.props.match.params['filter'] === 'read') {
      this.props.notificationsActions.markAsRead({id: id}, 'unread')
    } else {
      this.props.notificationsActions.markAsRead({id: id}, 'read')
    }
  }

  getNotificationStringFromOjbect (notification, type) {
    return <span>
      { notification[type] && notification[type]['content_type'] === 'thread'
        ? <span>
          { type === 'target' ? 'on ' : null }<Thread thread={notification[type]} />&nbsp;
        </span>
        : null
      }
      { notification[type] && notification[type]['content_type'] === 'badge'
        ? <span>
          { type === 'target' ? 'on ' : null }<Badge badge={notification[type]} user={notification['recipient']} />&nbsp;
        </span>
        : null
      }
      { notification[type] && notification[type]['content_type'] === 'lesson'
        ? <span>
          { type === 'target' ? 'on ' : null }<Lesson lesson={notification[type]} />&nbsp;
        </span>
        : null
      }
      { notification[type] && notification[type]['content_type'] === 'module'
        ? <span>
          { type === 'target' ? 'on ' : null }<Module module={notification[type]} />&nbsp;
        </span>
        : null
      }
    </span>
  }

  render () {
    var items = []
    var markAsTitle = 'read'
    if (this.props.match.params.hasOwnProperty('filter') && this.props.match.params['filter'] === 'read') {
      markAsTitle = 'unread'
    }

    if (this.props.notifications) {
      for (var i = 0; i < this.state.notifications.length; i++) {
        var notification = this.state.notifications[i]
        let that = this

        let getMarkAsFunc = function (id) {
          return function () {
            that.markAs(id)
          }
        }

        var actionString = this.getNotificationStringFromOjbect(notification, 'action_object')
        var targetString = this.getNotificationStringFromOjbect(notification, 'target')

        items.push(
          <Row key={notification.id}>
            <Col sm={2} md={2}>
            {/*<Col sm={2} md={2}>*/}
              {/*<Moment fromNow>*/}
              {notification['timesince']}
              {/*</Moment>*/}
            {/*</Col>*/}
            {/*<Col sm={2} md={2}>*/}
            </Col>
            <Col sm={8} md={8}>
              {notification['recipient'].id !== notification['actor'].id
                ? <Profile profile={notification['actor']} />
                : <span>You've</span>
              }
            {/*</Col>*/}
            {/*<Col sm={3} md={3}>*/}
            &nbsp;
              <span>{notification['verb']}</span>
            &nbsp;
            {/*</Col>*/}
            {/*<Col sm={3} md={3}>*/}
              { actionString }
              { targetString }
              {/*{ notification[type] && notification[type]['content_type'] === 'thread'*/}
                {/*? <Thread thread={notification[type]} />*/}
                {/*: null*/}
              {/*}*/}
              {/*{ notification[type] && notification[type]['content_type'] === 'badge'*/}
                {/*? <Badge badge={notification[type]} user={notification['recipient']} />*/}
                {/*: null*/}
              {/*}*/}
            </Col>
            <Col sm={2} md={2}>
              <FaCheck
                onClick={getMarkAsFunc(notification.id)}
                title={'Mark as ' + markAsTitle}
                style={{fontSize: '1.5rem', cursor: 'pointer'}} />
            </Col>
          </Row>
        )
      }
    }

    return <div>
      <Container fluid>
        <Row style={{padding: '2rem 0 0 0'}}>
          <Col sm={2} md={2}>
            <ListGroup>
              <ListGroupItem
                onClick={() => this.onFilterClick('unread')}
                action
                style={{cursor: 'pointer',
                  backgroundColor: markAsTitle === 'read' ? 'rgb(8, 209, 255)' : null}}>Unread</ListGroupItem>
              <ListGroupItem
                onClick={() => this.onFilterClick('read')}
                action
                style={{cursor: 'pointer',
                  backgroundColor: markAsTitle === 'unread' ? 'rgb(8, 209, 255)' : null}}>Read</ListGroupItem>
            </ListGroup>
          </Col>
          <Col sm={10} md={10}>
            {this.props.notifications
              ? <InfiniteScroll
                pageStart={0}
                loadMore={this.loadNextPage}
                hasMore={this.state.hasMoreItems}
                loader={<div key={this.state.nextHref} style={{clear: 'both'}} />} // fix https://github.com/CassetteRocks/react-infinite-scroller/issues/14#issuecomment-225835845
              >
                {items}
              </InfiniteScroll>
              : <Row>
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
            }
          </Col>
        </Row>
      </Container>
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
    fetchNotifications: PropTypes.func.isRequired,
    markAsRead: PropTypes.func.isRequired
  }).isRequired,
  // profile: PropTypes.object,
  // profile_fetching: PropTypes.bool,
  notifications: PropTypes.object,
  cancelSource: PropTypes.object
  // dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    // profile: state.profile.profile,
    // profile_fetching: state.profile.fetching
    notifications: state.notifications.notifications,
    cancelSource: state.notifications.cancelSource
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
