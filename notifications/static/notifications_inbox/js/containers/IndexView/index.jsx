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
    unReadCount, onClick, notificationsActions
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

// 2 remove
// CustomMenu = React.forwardRef(
//   ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
//
//     return (
//       <div
//         ref={ref}
//         style={style}
//         className={className}
//         aria-labelledby={labeledBy}
//       >
//         <FormControl
//           autoFocus
//           className='mx-3 my-2 w-auto'
//           placeholder='Type to filter...'
//         />
//         <ul className='list-unstyled'>
//         fsdfsdfsdfsd
//         </ul>
//       </div>
//     )
//   }
// );

// class CustomToggle extends React.Component {
//   constructor (props, context) {
//     super(props, context)
//
//     this.handleClick = this.handleClick.bind(this)
//   }
//
//   handleClick (e) {
//     e.preventDefault()
//     this.props.onClick(e)
//   }
//
//   render () {
//     let unReadCount = null
//     if (this.props.unReadCount && this.props.unReadCount['count']) {
//       if (this.props.unReadCount['count'] > 99) {
//         unReadCount = '99+'
//       } else {
//         unReadCount = '' + this.props.unReadCount['count']
//       }
//     }
//
//     return (
//       <span
//         onClick={this.handleClick}
//         style={{
//           padding: '1rem',
//           cursor: 'pointer'
//         }}>
//         <FaInbox
//           title={''}
//           style={{fontSize: '2rem'}} />
//         { unReadCount
//           ? <Badge
//             variant='danger'
//             style={{left: '2rem', position: 'absolute'}}
//           >{unReadCount}</Badge>
//           : null }
//       </span>
//     )
//   }
// }

// CustomToggle.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   unReadCount: PropTypes.object
// }

// fix for future versions https://github.com/react-bootstrap/react-bootstrap/issues/4841
