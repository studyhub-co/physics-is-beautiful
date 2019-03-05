import { combineReducers } from 'redux'

import profileReducer from './profile'
import tabReducer from './tab'
import notificationsReducer from './notifications'

export default combineReducers({
  profile: profileReducer,
  tabs: tabReducer,
  notifications: notificationsReducer,
})
