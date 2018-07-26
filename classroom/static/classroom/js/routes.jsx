import React from 'react'
import { Route, Switch } from 'react-router'
import { IndexView } from './containers/index'

export default(
  <Switch>
    <Route path='/classroom/' component={IndexView} />
    {/* <Route path='*' component={NotFoundView} /> */}
  </Switch>
)
