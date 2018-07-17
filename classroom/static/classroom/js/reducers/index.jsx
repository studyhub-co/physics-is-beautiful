import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'

import dataReducer from './data'
import tabReducer from './tab'

export default combineReducers({
  data: dataReducer,
  tab: tabReducer
  // routing: routerReducer
})
