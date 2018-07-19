import { combineReducers } from 'redux'

import dataReducer from './data'
import tabReducer from './tab'
import classroomReducer from './classroom'

export default combineReducers({
  data: dataReducer,
  tab: tabReducer,
  classroom: classroomReducer
})
