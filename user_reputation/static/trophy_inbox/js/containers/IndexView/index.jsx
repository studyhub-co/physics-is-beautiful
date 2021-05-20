import React from 'react'

// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown'
import { FaTrophy } from 'react-icons/fa'

import TrophyListView from './trophyList'
// import * as reputationCreators from '../../actions/reputation'

const IndexView = props => {
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
  // }
  })

  return (
    <Dropdown>
      <Dropdown.Toggle
        as={CustomToggle}
        id='dropdown-custom-components'>
        <span>
          <FaTrophy
            title={''}
            style={{fontSize: '2rem'}} />
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        alignRight>
        <TrophyListView />
      </Dropdown.Menu>
    </Dropdown>
  )
  // }
}

IndexView.propTypes = {
  // reputationActions: PropTypes.shape({
  //   fetchReputationActions: PropTypes.func.isRequired
  // }).isRequired,
  // unReadCount: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    // unReadCount: state.trophy.unReadCount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
    // reputationActions: bindActionCreators(reputationCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
export { IndexView as IndexViewNotConnected }
