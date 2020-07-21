import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'

// middlware for automatic routing with redux states
import routingMiddleware from '../middleware/routing'

import { connectRouter, routerMiddleware } from 'connected-react-router'

import rootReducer from '../reducers'

export default function configureStore (initialState, history) {
  const middleware = applyMiddleware(
    thunk, routerMiddleware(history), routingMiddleware
  )

  const reducers = combineReducers(
    {...rootReducer, router: connectRouter(history)}
  )

  const store = createStore(
    // connectRouter(history)(rootReducer),
    reducers,
    initialState,
    middleware
  )

  return store
}
