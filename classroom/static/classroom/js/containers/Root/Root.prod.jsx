import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import PropTypes from 'prop-types'

import routes from '../../routes'
import App from '../../app'

export default class Root extends React.Component {
  render () {
    return (
      <div>
        I AM prod
        <Provider store={this.props.store}>
          <App>
            <ConnectedRouter history={this.props.history}>
              {routes}
            </ConnectedRouter>
          </App>
        </Provider>
      </div>
    )
  }
}
Root.propTypes = {
  store: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired
}
