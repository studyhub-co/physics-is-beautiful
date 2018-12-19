import { combineReducers } from 'redux'

import resourcesReducer from './resources'
import googleReducer from './google'
import djedditReducer from './djeddit'

export default combineReducers({
  resources: resourcesReducer,
  google: googleReducer,
  djeddit: djedditReducer
})
