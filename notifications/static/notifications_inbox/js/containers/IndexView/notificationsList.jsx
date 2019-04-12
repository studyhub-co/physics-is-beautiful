import React from 'react'
import PropTypes from 'prop-types'

import { RingLoader } from 'react-spinners'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { FaCheck, FaCheckCircle, FaExclamationCircle, FaClock } from 'react-icons/fa'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import * as notificationsCreators from '../../actions/notifications'
import * as profileCreators from '../../actions/profile'

class NotificationsListView extends React.Component {
  constructor (props) {
    super(props)
    this.onSellAllClick = this.onSellAllClick.bind(this)
  }

  onSellAllClick () {
    if (this.props.profile) {
      window.location.href = '/profile/' + this.props.profile.id + '/notifications/'
    }
  }

  componentWillMount () {
    this.props.profileActions.fetchProfileMe()

    if (!this.props.notifications) {
      // load notifications list
      this.props.notificationsActions.fetchNotifications(null, {'filter': 'unread'})
    }
  }

  render () {
    return (
      <Container style={{width: '30rem', maxWidth: '100vw'}}>
        <Row>
          <Col sm={12} md={12}>
            { this.props.notifications
              ? <div>
                { this.props.notifications['results'].length === 0 ? <span>No unseen notifications<hr /></span> : null }
                { this.props.notifications['results'].map(function (notification, i) {
                  return <div key={notification.id}>
                    {/*{notification['timesince']}*/}
                    {/*&nbsp;*/}
                    {/*ago*/}
                    {/*&nbsp;*/}
                    {notification['recipient'].id !== notification['actor'].id
                      ? <span>{notification['actor'].display_name}</span>
                      : <span>You've</span>
                    }
                    &nbsp;
                    <span>{notification['verb']}</span>
                    { notification['target'] && notification['target']['content_type'] === 'thread'
                      ? <span>&nbsp; {notification['target'].title}</span>
                      : null
                    }
                    { notification['target'] && notification['target']['content_type'] === 'badge'
                      ? <span>&nbsp; {notification['target'].title} badge</span>
                      : null
                    }
                    {/*&nbsp;*/}
                    {/*{notification['timesince']}*/}
                    {/*&nbsp;*/}
                    {/*ago*/}
                    <hr />
                  </div>
                }) }
                <div className={'text-center'}>
                  <span
                    onClick={this.onSellAllClick}
                    style={{cursor: 'pointer', color: '#1caff6'}}
                  >See all items</span>
                </div>
              </div>
              : <div style={{'margin': '0 auto', width: '60px'}}>
                <RingLoader
                  color={'#1caff6'}
                  loading={Boolean(true)}
                >
                </RingLoader>
              </div>
            }
          </Col>
        </Row>
      </Container>
    )
  }
}

NotificationsListView.propTypes = {
  notificationsActions: PropTypes.shape({
    fetchNotifications: PropTypes.func.isRequired
  }).isRequired,
  profileActions: PropTypes.shape({
    fetchProfileMe: PropTypes.func.isRequired
  }),
  notifications: PropTypes.object,
  profile: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications.notifications,
    profile: state.profile.me
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    notificationsActions: bindActionCreators(notificationsCreators, dispatch),
    profileActions: bindActionCreators(profileCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsListView)
export { NotificationsListView as NotificationsListNotConnected }
