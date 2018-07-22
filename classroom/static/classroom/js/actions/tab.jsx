import { CHANGE_SELECTED_TAB } from '../constants'
import history from '../history'

export function changeSelectedTab (selectedTab, tabNamespace, fromChildren = false) {
  if (!fromChildren) {
    history.push('/classroom/')
  }
  return { type: CHANGE_SELECTED_TAB,
    tab: selectedTab,
    namespace: tabNamespace }
}
