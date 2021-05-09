import React from 'react'

import TrophyListView
  from '../../../../../../user_reputation/static/trophy_inbox/js/containers/IndexView/trophyList'

import useInjectReducer from '../../utils/reactHooks/useInjectReducer'
import achievementsReducers from '../../../../../../user_reputation/static/trophy_inbox/js/reducers'
import PropTypes from 'prop-types'

const AchievementsList = (props) => {
  // if you get warning in dev console here,
  // please see for detail: https://github.com/zalmoxisus/redux-devtools-extension/issues/759
  // inject async reducer
  Object.keys(achievementsReducers).map((key, reducer) => {
    useInjectReducer({key, reducer: achievementsReducers[key]})
  })

  return (
    // history is in props
    <TrophyListView {...props}/>
  )
}

AchievementsList.propTypes = {
  history: PropTypes.object
}

export default AchievementsList
