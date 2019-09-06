import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'
// import { routerMiddleware } from 'react-router-redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import rootReducer from '../reducers'

export default function configureStore (initialState, history) {

  const middleware = applyMiddleware(thunk, routerMiddleware(history))

  const reducers = combineReducers({...rootReducer, router: connectRouter(history)})

  const store = createStore(
    // connectRouter(history)(rootReducer),
    reducers,
    initialState,
    middleware
  )

  return store
}
