import { CHANGE_SELECTED_TAB } from '../constants'
import history from '../history'

export function changeSelectedTab (selectedTab, tabNamespace, profileId, fromChildren = false, filter) {
  if (!fromChildren) {
    if (selectedTab !== 'profile') {
      var url = '/' + profileId + '/' + selectedTab + '/'
      if (filter) {
        url += filter + '/'
      }
      history.push(url)
    } else {
      history.push('/' + profileId + '/') // root url
    }
  }
  return { type: CHANGE_SELECTED_TAB,
    tab: selectedTab,
    namespace: tabNamespace }
}
