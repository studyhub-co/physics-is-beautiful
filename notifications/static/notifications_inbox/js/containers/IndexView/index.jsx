import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dropdown from 'react-bootstrap/Dropdown'
import { FaInbox } from 'react-icons/fa'
import Badge from 'react-bootstrap/Badge'

import NotificationsListView from './notificationsList'
import * as notificationsCreators from '../../actions/notifications'

class CustomToggle extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    this.props.onClick(e)
  }

  render () {
    let unReadCount = null
    if (this.props.unReadCount && this.props.unReadCount['count']) {
      if (this.props.unReadCount['count'] > 99) {
        unReadCount = '99+'
      } else {
        unReadCount = '' + this.props.unReadCount['count']
      }
    }

    return (
      <span
        onClick={this.handleClick}
        style={{
          padding: '1rem',
          cursor: 'pointer'
        }}>
        <FaInbox
          title={''}
          style={{fontSize: '2rem'}} />
        { unReadCount
          ? <Badge
            variant='danger'
            style={{left: '2rem', position: 'absolute'}}
          >{unReadCount}</Badge>
          : null }
      </span>
    )
  }
}

CustomToggle.propTypes = {
  onClick: PropTypes.func.isRequired,
  unReadCount: PropTypes.object
}

class IndexView extends React.Component {
  componentWillMount () {
    this.props.notificationsActions.fetchUnReadCount()
  }

  render () {
    return (
      <Dropdown>
        <Dropdown.Toggle unReadCount={this.props.unReadCount} as={CustomToggle} id='dropdown-custom-components'>
        Custom toggle
        </Dropdown.Toggle>
        <Dropdown.Menu alignRight>
          <NotificationsListView />
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

IndexView.propTypes = {
  notificationsActions: PropTypes.shape({
    fetchUnReadCount: PropTypes.func.isRequired
  }).isRequired,
  unReadCount: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    unReadCount: state.notifications.unReadCount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    notificationsActions: bindActionCreators(notificationsCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
export { IndexView as IndexViewNotConnected }
