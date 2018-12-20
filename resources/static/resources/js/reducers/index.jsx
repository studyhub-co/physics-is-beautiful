import { combineReducers } from 'redux'

import resourcesReducer from './resources'
import googleReducer from './google'
import djedditReducer from './djeddit'
import profileReducer from './profile'

export default combineReducers({
  resources: resourcesReducer,
  google: googleReducer,
  djeddit: djedditReducer,
  profile: profileReducer
})
