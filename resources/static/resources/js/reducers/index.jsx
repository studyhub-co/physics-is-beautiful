import { combineReducers } from 'redux'

import resourcesReducer from './resources'

export default combineReducers({
  resources: resourcesReducer
})
