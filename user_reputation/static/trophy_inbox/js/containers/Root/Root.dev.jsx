import React from 'react'
import { Provider } from 'react-redux'
// import { ConnectedRouter } from 'connected-react-router'
import PropTypes from 'prop-types'

// import routes from '../../routes'
import DevTools from './DevTools'
import App from '../../app'
import { IndexView } from '../../containers'

export default class Root extends React.Component {
  render () {
    return (
      <div>
        <Provider store={this.props.store}>
          <div>
            <App>
              <IndexView />
              {/*<ConnectedRouter history={this.props.history}>*/}
                {/*{routes}*/}
              {/*</ConnectedRouter>*/}
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
  // history: PropTypes.shape().isRequired
}
