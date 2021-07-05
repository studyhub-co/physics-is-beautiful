import { CHANGE_SELECTED_TAB } from '../constants'

import { BASE_URL } from '../utils/config'

export function changeSelectedTab(
  selectedTab,
  tabNamespace,
  profileId,
  history,
  fromChildren = false,
  filter,
) {
  console.log(selectedTab)

  if (!fromChildren) {
    let url = `${BASE_URL}/${profileId}`

    if (selectedTab !== 'profile') {
      url = `${url}/${selectedTab}/`
      if (filter) {
        url = `${url}${filter}/`
      }
      history.push(url)
    } else {
      history.push(url) // root url
    }
  }
  return {
    type: CHANGE_SELECTED_TAB,
    tab: selectedTab,
    namespace: tabNamespace,
  }
}
