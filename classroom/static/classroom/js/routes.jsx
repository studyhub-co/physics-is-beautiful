import React from 'react'
import { Route, Switch } from 'react-router'
import { IndexView } from './containers/index'

export default(
  <Switch>
    <Route exact path='/classroom/' component={IndexView} />
    <Route exact path='/classroom/l' render={() => (<div>logout</div>)} />
    {/* <Route path='*' component={NotFoundView} /> */}
  </Switch>
)
