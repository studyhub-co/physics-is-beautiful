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

export function changeTeacherClassroomSelectedTab (selectedTab, tabNamespace, match) {
  if (match &&
    match.isExact === false &&
    !match.params.hasOwnProperty('assigmentUuid') &&
    !match.params.hasOwnProperty('username')) {
    history.push(match.url) // rewrite url to teacher tab url. fixme: seems it's need a better solution
  }

  return { type: CHANGE_SELECTED_TAB_TEACHER_CLASSROOM,
    teacherClassroomTab: selectedTab,
    namespace: tabNamespace }
}
