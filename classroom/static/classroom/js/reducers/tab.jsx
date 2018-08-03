import { CHANGE_SELECTED_TAB, CHANGE_SELECTED_TAB_TEACHER_CLASSROOM } from '../constants'

const initialState = {
  tab: null,
  teacherClassroomTab: null
}

export default function tabsReducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_SELECTED_TAB:
      return Object.assign(
        {},
        state,
        {
          [action.namespace]: action.tab
        })
    case CHANGE_SELECTED_TAB_TEACHER_CLASSROOM:
      return Object.assign(
        {},
        state,
        {
          [action.namespace]: action.teacherClassroomTab
        })
    default:
      return state
  }
}
