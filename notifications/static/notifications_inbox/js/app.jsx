import React from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class App extends React.Component {
  render () {
    return (
      <div className='app'>
        {this.props.children}
      </div>
    )
  }
}
App.propTypes = {
  children: PropTypes.shape().isRequired
}
// App.defaultProps = {
//   location: undefined
// }

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

export default connect(mapStateToProps)(App)
export { App as AppNotConnected }
