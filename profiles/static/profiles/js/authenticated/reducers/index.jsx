import { combineReducers } from 'redux'

import profileReducer from './profile'

export default combineReducers({
  profile: profileReducer
})
