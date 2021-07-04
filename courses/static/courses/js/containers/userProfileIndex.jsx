import React from 'react'

import { Sheet } from '../components/Sheet'

import userProfileRoutes from '../../../../../profiles/static/profiles/js/authenticated/routes'
import userProfileReducers from '../../../../../profiles/static/profiles/js/authenticated/reducers'
import useInjectReducer from '../utils/reactHooks/useInjectReducer'

const UserProfileIndex = props => {
  // if you get warning in dev console here,
  // please see for detail: https://github.com/zalmoxisus/redux-devtools-extension/issues/759
  // inject async reducer
  Object.keys(userProfileReducers).map((key, reducer) => {
    useInjectReducer({ key, reducer: userProfileReducers[key] })
  })

  return (
    // class name needs for css separation
    <div className={'profile'}>
      <Sheet>{userProfileRoutes}</Sheet>
    </div>
  )
}

export default UserProfileIndex
