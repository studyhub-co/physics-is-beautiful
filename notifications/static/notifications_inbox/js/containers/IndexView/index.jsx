import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dropdown from 'react-bootstrap/Dropdown'
import { FaInbox } from 'react-icons/fa'

import NotificationsListView from './notificationsList'

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
    return (
      <a
        href=''
        onClick={this.handleClick}
        style={{
          padding: '1rem',
          cursor: 'pointer'
        }}>
        <FaInbox
          title={''}
          style={{fontSize: '2rem'}} />
      </a>
    )
  }
}

CustomToggle.propTypes = {
  onClick: PropTypes.func.isRequired
}

class IndexView extends React.Component {
  render () {
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
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
}

const mapStateToProps = (state) => {
  return {
    // newResourcesList: state.resources.newResourcesList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
export { IndexView as IndexViewNotConnected }
