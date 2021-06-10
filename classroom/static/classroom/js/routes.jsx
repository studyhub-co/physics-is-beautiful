import React from 'react'
import { Route, Switch } from 'react-router'
import { IndexView, StudentIndexView } from './containers/index'
import { BASE_URL } from './utils/config'
import NotFoundView from '../../../../courses/static/courses/js/components/NotFoundView'

export default (
  <Switch>
    <Route
      path={BASE_URL + 'student/join/:joinCode/'}
      component={StudentIndexView}
    />{' '}
    {/* must be upper */}
    <Route path={BASE_URL} component={IndexView} />
    <Route path="*" component={NotFoundView} />
  </Switch>
)
