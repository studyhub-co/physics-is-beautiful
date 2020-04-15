import React from 'react'

// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import Dropdown from 'react-bootstrap/Dropdown'
import { FaTrophy } from 'react-icons/fa'
// import Badge from 'react-bootstrap/Badge'

import TrophyListView from './trophyList'
// import * as reputationCreators from '../../actions/reputation'

// CustomToggle.propTypes = {
//   onClick: PropTypes.func.isRequired
// }

// class IndexView extends React.Component {
const IndexView = props => {
  // render () {

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
  // constructor (props, context) {
  //   super(props, context)
  //
  //   this.handleClick = this.handleClick.bind(this)
  // }

  // handleClick (e) {
  //   e.preventDefault()
  //   this.props.onClick(e)
  // }

  // render () {
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
