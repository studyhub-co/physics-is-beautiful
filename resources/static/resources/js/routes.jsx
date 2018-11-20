import React from 'react'
import { Route, Switch } from 'react-router'
import { IndexView } from './containers/index'
import { BASE_URL } from './utils/config'
import { AddResourceView } from './containers'

export default(
  <Switch>
    <Route exact path={BASE_URL} component={IndexView} />
    <Route exact path={BASE_URL + 'add/'} component={AddResourceView} />
    {/* <Route path='*' component={NotFoundView} /> */}
  </Switch>
)
