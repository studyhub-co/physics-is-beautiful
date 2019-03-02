import { CHANGE_SELECTED_TAB } from '../constants'
import history from '../history'

export function changeSelectedTab (selectedTab, tabNamespace, profileId, fromChildren = false) {

  if (!fromChildren) {
    if (selectedTab !== 'profile') {
      history.push('/' + profileId + '/' + selectedTab + '/')
    } else {
      history.push('/' + profileId + '/') // root url
    }
  }
  return { type: CHANGE_SELECTED_TAB,
    tab: selectedTab,
    namespace: tabNamespace }
}
