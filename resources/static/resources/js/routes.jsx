import React from 'react'
import { Route, Switch } from 'react-router'
import { IndexView, AddResourceView, ResourceView, TextBookProblemView, TextBookSolutionView, AdblockView } from './containers'
import { BASE_URL } from './utils/config'

export default(
  <Switch>
    <Route exact path={BASE_URL} component={IndexView} />
    <Route exact path={BASE_URL + 'add/'} component={AddResourceView} />
    {/* <Route exact path={BASE_URL + ':resource_uuid/problems/:problem_uuid/solutions/:uuid'} component={TextBookSolutionView} /> */}
    {/* <Route exact path={BASE_URL + ':resource_uuid/problems/:uuid'} component={TextBookProblemView} /> */}
    {/* <Route exact path={BASE_URL + ':uuid/'} component={ResourceView} /> */}
    {/* TODO extract regex */}
    <Route
      exact
      path={BASE_URL + ':resource_title([A-Za-z0-9_\\-\\.]+)/problems/:problem_title([A-Za-z0-9_\\-\\.]+)/solutions/:solution_title([A-Za-z0-9_\\-\\.]+)/:uuid'}
      component={TextBookSolutionView} />
    <Route
      exact
      path={BASE_URL + ':resource_title([A-Za-z0-9_\\-\\.]+)/problems/:problem_title([A-Za-z0-9_\\-\\.]+)/:uuid'}
      component={TextBookProblemView} />
    <Route exact path={BASE_URL + ':title([A-Za-z0-9_\\-\\.]+)/:uuid/'} component={ResourceView} />
    <Route exact path={BASE_URL + 'adblock/'} component={AdblockView} />
    {/* <Route path='*' component={NotFoundView} /> */}
  </Switch>
)
