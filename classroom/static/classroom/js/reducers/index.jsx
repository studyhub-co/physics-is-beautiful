// import { combineReducers } from 'redux'

import tabReducer from './tab'
import classroomReducer from './classroom'
// import curriculaReducer from './curricula'
import resourcesReducer from './resources'
import assignmentReducer from './assignment'
import studentReducer from './student'
import googleReducer from './google'

export default {
  tab: tabReducer,
  classroom: classroomReducer,
  // curricula: curriculaReducer,
  resources: resourcesReducer,
  assignment: assignmentReducer,
  student: studentReducer,
  google: googleReducer
}
