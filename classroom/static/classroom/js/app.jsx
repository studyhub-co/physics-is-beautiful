import React from 'react'
import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import { push } from 'connected-react-router'
// import classNames from 'classnames'
import PropTypes from 'prop-types'

class App extends React.Component {

  // goToIndex () {
  //   this.props.dispatch(push('/'))
  // }

  render () {
    // const homeClass = classNames({
    //     active: this.props.location && this.props.location.pathname === '/'
    // })
    return (
      <div className='app'>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
App.propTypes = {
  children: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
}
App.defaultProps = {
  location: undefined
}

const mapStateToProps = (state, ownProps) => {
  return {
    location: state.router.location
  }
}

export default connect(mapStateToProps)(App)
export { App as AppNotConnected }
