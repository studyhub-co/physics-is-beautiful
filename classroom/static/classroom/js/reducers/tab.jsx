import { CHANGE_SELECTED_TAB } from '../constants'

const initialState = {
  tab: null
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
    default:
      return state
  }
}
