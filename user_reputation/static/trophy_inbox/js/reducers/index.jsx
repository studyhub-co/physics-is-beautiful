import { combineReducers } from 'redux'

import reputationActionsReducer from './reputation_actions'
import profileReducer from './profile'

export default combineReducers({
  reputationActions: reputationActionsReducer,
  profile: profileReducer
})
