import React, {useEffect} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dropdown from 'react-bootstrap/Dropdown'
import { FaInbox } from 'react-icons/fa'
import Badge from 'react-bootstrap/Badge'

import NotificationsListView from './notificationsList'
import * as notificationsCreators from '../../actions/notifications'

// class IndexView extends React.Component {
const IndexView = props => {
  const {
    unReadCount, notificationsActions
  } = props

  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
    return (
      <span
        ref={ref}
        onClick={(e) => {
          e.preventDefault()
          onClick(e)
        }}
        style={{
          padding: '1rem',
          cursor: 'pointer'
        }}>
        {children}
      </span>
    )
  }
  )

  useEffect(() => {
    notificationsActions.fetchUnReadCount()
  }, [])

  let unReadCountString = unReadCount

  if (unReadCount && unReadCount['count']) {
    if (unReadCount['count'] > 99) {
      unReadCountString = '99+'
    } else {
      unReadCountString = '' + unReadCount['count']
    }
  }

  return (
    <Dropdown>
      <Dropdown.Toggle
        as={CustomToggle} id='dropdown-custom-components'>
        <span>
          <FaInbox
            title={''}
            style={{fontSize: '2rem'}} />
          { unReadCountString
            ? <Badge
              variant='danger'
              style={{left: '2rem', position: 'absolute'}}
            >{unReadCountString}</Badge>
            : null }
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        // as={this.CustomMenu}
        alignRight>
        <NotificationsListView />
      </Dropdown.Menu>
    </Dropdown>
  )
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

// fix for future versions https://github.com/react-bootstrap/react-bootstrap/issues/4841
