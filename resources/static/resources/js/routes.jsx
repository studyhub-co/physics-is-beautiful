import React from 'react'
import { Route, Switch } from 'react-router'
import { IndexView, AddResourceView, ResourceView, TextBookProblemView, TextBookSolutionView } from './containers'
import { BASE_URL } from './utils/config'

export default(
  <Switch>
    <Route exact path={BASE_URL} component={IndexView} />
    <Route exact path={BASE_URL + 'add/'} component={AddResourceView} />
    {/*<Route exact path={BASE_URL + ':resource_uuid/problems/:problem_uuid/solutions/:uuid'} component={TextBookSolutionView} />*/}
    {/*<Route exact path={BASE_URL + ':resource_uuid/problems/:uuid'} component={TextBookProblemView} />*/}
    {/*<Route exact path={BASE_URL + ':uuid/'} component={ResourceView} />*/}
    <Route
      exact
      path={BASE_URL + ':resource_title([A-Za-z0-9._-]+)/problems/:problem_title([A-Za-z0-9._-]+)/solutions/:solution_title([A-Za-z0-9._-]+)/:uuid'}
      component={TextBookSolutionView} />
    <Route
      exact
      path={BASE_URL + ':resource_title([A-Za-z0-9._-]+)/problems/:problem_title([A-Za-z0-9._-]+)/:uuid'}
      component={TextBookProblemView} />
    <Route exact path={BASE_URL + ':title([A-Za-z0-9._-]+)/:uuid/'} component={ResourceView} />
    {/* <Route path='*' component={NotFoundView} /> */}
  </Switch>
)
