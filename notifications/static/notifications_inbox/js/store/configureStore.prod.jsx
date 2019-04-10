import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
// import { routerMiddleware } from 'react-router-redux'
// import { connectRouter, routerMiddleware } from 'connected-react-router'

import rootReducer from '../reducers'

export default function configureStore (initialState, history) {

  // const middleware = applyMiddleware(thunk, routerMiddleware(history))
  const middleware = applyMiddleware(thunk)

  const store = createStore(
    // connectRouter(history)(rootReducer),
    rootReducer,
    initialState,
    middleware
  )

  return store
}
