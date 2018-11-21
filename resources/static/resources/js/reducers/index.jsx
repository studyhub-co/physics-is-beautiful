import { combineReducers } from 'redux'

import resourcesReducer from './resources'
import googleReducer from './google'

export default combineReducers({
  resources: resourcesReducer,
  google: googleReducer
})
