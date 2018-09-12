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
  // TODO refactor this

  if (selectedTab === 'students') {
    if (match &&
      match.path !== '/classroom/:uuid/teacher/students/' &&
      match.path !== '/classroom/:uuid/teacher/students/:username') {
      history.push('/classroom/' + match.params['uuid'] + '/teacher/students/')
    }
  } else if (match &&
     !match.params.hasOwnProperty('assigmentUuid') &&
     !match.params.hasOwnProperty('username')
  ) { // main teacher page
    history.push('/classroom/' + match.params['uuid'] + '/teacher/')
  }

  // if (match &&
  //     match.isExact === false &&
  //     !match.params.hasOwnProperty('assigmentUuid') &&
  //     !match.params.hasOwnProperty('username') &&
  //     match.path !== '/classroom/:uuid/teacher/students/' &&
  //     match.path !== '/classroom/:uuid/teacher/' &&
  // {
  //   history.push('/classroom/' + match.params['uuid'] + '/teacher/') // rewrite url to teacher tab url. fixme: seems it's need a better solution
  // }

  return { type: CHANGE_SELECTED_TAB_TEACHER_CLASSROOM,
    teacherClassroomTab: selectedTab,
    namespace: tabNamespace
  }
}
