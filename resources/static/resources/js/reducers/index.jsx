// import { combineReducers } from 'redux'

import resourcesReducer from './resources'
import googleReducer from './google'
import reactCommentsReducer from './react_comments'
import profileReducer from './profile'

// export default combineReducers({
//   resources: resourcesReducer,
//   google: googleReducer,
//   reactComments: reactCommentsReducer,
//   profile: profileReducer
// })

export default {
  resources: resourcesReducer,
  google: googleReducer,
  // reactComments: reactCommentsReducer,
  profile: profileReducer
}
