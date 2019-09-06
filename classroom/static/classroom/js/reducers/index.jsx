// import { combineReducers } from 'redux'

import tabReducer from './tab'
import classroomReducer from './classroom'
import curriculaReducer from './curricula'
import assignmentReducer from './assignment'
import studentReducer from './student'
import googleReducer from './google'

// export default combineReducers({
//   tab: tabReducer,
//   classroom: classroomReducer,
//   curricula: curriculaReducer,
//   assignment: assignmentReducer,
//   student: studentReducer,
//   google: googleReducer
// })

export default {
  tab: tabReducer,
  classroom: classroomReducer,
  curricula: curriculaReducer,
  assignment: assignmentReducer,
  student: studentReducer,
  google: googleReducer
}
