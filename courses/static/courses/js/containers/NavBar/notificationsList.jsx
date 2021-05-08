import React from 'react'

import NotificationsListView
  from '../../../../../../notifications/static/notifications_inbox/js/containers/IndexView/notificationsList'

import useInjectReducer from '../../utils/reactHooks/useInjectReducer'
import notificationsReducers from '../../../../../../notifications/static/notifications_inbox/js/reducers'
import PropTypes from 'prop-types'

const NotificationsList = (props) => {
  // if you get warning in dev console here,
  // please see for detail: https://github.com/zalmoxisus/redux-devtools-extension/issues/759
  // inject async reducer
  Object.keys(notificationsReducers).map((key, reducer) => {
    useInjectReducer({key, reducer: notificationsReducers[key]})
  })

  return (
    // class name needs for css separation
    <NotificationsListView {...props}/>
  )
}

NotificationsListView.propTypes = {
  history: PropTypes.object
}

export default NotificationsList
