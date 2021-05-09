import thunk from 'redux-thunk'
import { applyMiddleware, createStore, combineReducers } from 'redux'
// import { routerMiddleware } from 'react-router-redux'
// import { connectRouter, routerMiddleware } from 'connected-react-router'

import rootReducer from '../reducers'

export default function configureStore (initialState, history) {

  // const middleware = applyMiddleware(thunk, routerMiddleware(history))
  const middleware = applyMiddleware(thunk)

  const store = createStore(
    // connectRouter(history)(rootReducer),
    combineReducers(rootReducer),
    initialState,
    middleware
  )

  return store
}
