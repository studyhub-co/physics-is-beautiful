import React from 'react'
import { Route, Switch } from 'react-router'
import { IndexView } from './containers'

import { BASE_URL } from './utils/config'
import NotFoundView from '../../../../../courses/static/courses/js/components/NotFoundView'

export default (
  <Switch>
    <Route path={`${BASE_URL}/:id(\\d+)/`} component={IndexView} />
    {/*<Route path={`${BASE_URL}/:id/:tab/`} component={IndexView} />*/}
    <Route path="*" component={NotFoundView} />
  </Switch>
)
