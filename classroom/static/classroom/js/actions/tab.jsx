import { CHANGE_SELECTED_TAB, CHANGE_SELECTED_TAB_TEACHER_CLASSROOM } from '../constants'
import history from '../history'
import { BASE_URL } from '../utils/config'

export function changeSelectedTab (selectedTab, tabNamespace, fromChildren = false) {
  if (!fromChildren) {
    history.push(BASE_URL)
  }
  return { type: CHANGE_SELECTED_TAB,
    tab: selectedTab,
    namespace: tabNamespace }
}

export function changeTeacherClassroomSelectedTab (selectedTab, tabNamespace) {
  return { type: CHANGE_SELECTED_TAB_TEACHER_CLASSROOM,
    teacherClassroomTab: selectedTab,
    namespace: tabNamespace }
}
