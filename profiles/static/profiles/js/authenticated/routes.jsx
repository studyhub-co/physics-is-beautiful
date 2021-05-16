import React from 'react'
import { Route, Switch } from 'react-router'
import { IndexView } from './containers'

import { BASE_URL } from './utils/config'

export default(
  <Switch>
    <Route path={`${BASE_URL}/:id/`} component={IndexView} />
    {/*<Route path={`${BASE_URL}/:id/:tab/`} component={IndexView} />*/}
  </Switch>
)
