import React from 'react'
import { Route, Switch } from 'react-router'
import { IndexView } from './containers'
import { BASE_URL } from './utils/config'

export default(
  <Switch>
    <Route exact path={BASE_URL + ':id/'} component={IndexView} />
    {/*<Route exact path={BASE_URL + ':resource_uuid/problems/:problem_uuid/solutions/:uuid'} component={TextBookSolutionView} />*/}
    {/*<Route exact path={BASE_URL + ':resource_uuid/problems/:uuid'} component={TextBookProblemView} />*/}
    {/*<Route exact path={BASE_URL + ':uuid/'} component={ResourceView} />*/}
    {/* <Route path='*' component={NotFoundView} /> */}
  </Switch>
)
