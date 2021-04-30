/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

import rootReducer from '../reducers'
import routingMiddleware from '../middleware/routing'
import DevTools from '../containers/Root/DevTools'

import { connectRouter, routerMiddleware } from 'connected-react-router'

export default function configureStore (initialState, history) {
  function createReducer (asyncReducers) {
    return combineReducers({
      ...rootReducer,
      router: connectRouter(history),
      ...asyncReducers
    })
  }

  const logger = createLogger()

  // Build the middleware for intercepting and dispatching navigation actions
  // const reduxRouterMiddleware = routerMiddleware(history)
  const middleware = applyMiddleware(
    thunk, routerMiddleware(history), routingMiddleware, logger
  )

  // comment this for using inline dev tools, need comment compose below DevTools works only in one place
  const middlewareWithDevTools = compose(
    middleware,
    DevTools.instrument()
  )

  // use redux-devtools-extension (chrome)
  // uncomment this for using redux-devtools, need comment compose above DevTools works only in one place
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  // const middlewareWithDevTools = composeEnhancers(
  //   middleware
  // )

  // Add the reducer to your store on the `router` key
  // Also apply our middleware for navigating

  // const reducers = combineReducers({
  //   ...rootReducer,
  //   router: connectRouter(history),
  // })

  const reducers = createReducer()

  const store = createStore(
    // rootReducer,
    // connectRouter(history)(rootReducer),
    reducers,
    initialState,
    middlewareWithDevTools
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(
  )

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {}

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
  }

  if (module.hot) {
    module.hot
      .accept('../reducers', () => {
        const nextRootReducer = require('../reducers/index') // eslint-disable-line global-require

        store.replaceReducer(nextRootReducer)
      })
  }

  return store
}
