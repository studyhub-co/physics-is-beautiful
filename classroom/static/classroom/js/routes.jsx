import React from 'react'
import { Route, Switch } from 'react-router'
import { IndexView } from './containers/index'
import { BASE_URL } from './utils/config'

export default(
  <Switch>
    <Route path={BASE_URL + 'join/:joinCode/'} component={IndexView} />  // must be upper
    <Route path={BASE_URL} component={IndexView} />
    {/* <Route path='*' component={NotFoundView} /> */}
  </Switch>
)
