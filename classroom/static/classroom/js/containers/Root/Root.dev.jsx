import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import PropTypes from 'prop-types'

import routes from '../../routes'
import DevTools from './DevTools'
import App from '../../app'

export default class Root extends React.Component {
  render () {
    return (
      <div>
        I AM debugger
        <Provider store={this.props.store}>
          <div>
            <App>
              <ConnectedRouter history={this.props.history}>
                {routes}
              </ConnectedRouter>
            </App>
            <DevTools />
          </div>
        </Provider>
      </div>
    )
  }
}
Root.propTypes = {
  store: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired
}
