import { combineReducers } from 'redux'

import profileReducer from './profile'
import tabReducer from './tab'

export default combineReducers({
  profile: profileReducer,
  tabs: tabReducer
})
