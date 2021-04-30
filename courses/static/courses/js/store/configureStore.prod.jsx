import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'

// middlware for automatic routing with redux states
import routingMiddleware from '../middleware/routing'

import { connectRouter, routerMiddleware } from 'connected-react-router'

import rootReducer from '../reducers'

export default function configureStore (initialState, history) {
  function createReducer (asyncReducers) {
    return combineReducers({
      ...rootReducer,
      router: connectRouter(history),
      ...asyncReducers
    })
  }

  const middleware = applyMiddleware(
    thunk, routerMiddleware(history), routingMiddleware
  )

  // const reducers = combineReducers(
  //   {...rootReducer, router: connectRouter(history)}
  // )

  const reducers = createReducer()

  const store = createStore(
    // connectRouter(history)(rootReducer),
    reducers,
    initialState,
    middleware
  )

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {}

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
  }

  return store
}
