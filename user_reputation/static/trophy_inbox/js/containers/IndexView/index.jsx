import React from 'react'

// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dropdown from 'react-bootstrap/Dropdown'
import { FaTrophy } from 'react-icons/fa'
// import Badge from 'react-bootstrap/Badge'

import TrophyListView from './trophyList'
// import * as reputationCreators from '../../actions/reputation'

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
    // let unReadCount = null
    // if (this.props.unReadCount && this.props.unReadCount['count']) {
    //   if (this.props.unReadCount['count'] > 99) {
    //     unReadCount = '99+'
    //   } else {
    //     unReadCount = '' + this.props.unReadCount['count']
    //   }
    // }

    return (
      <span
        onClick={this.handleClick}
        style={{
          padding: '1rem',
          cursor: 'pointer'
        }}>
        <FaTrophy
          title={''}
          style={{fontSize: '2rem'}} />
      </span>
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
          <TrophyListView />
        </Dropdown.Menu>
      </Dropdown>
    )
  }
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
    dispatch,
    // reputationActions: bindActionCreators(reputationCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
export { IndexView as IndexViewNotConnected }
