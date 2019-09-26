import React from 'react'
import { Route, Switch } from 'react-router'
import { CoursesIndexView } from './containers/CoursesViews'
import { BASE_URL } from './utils/config'

export default(
  <Switch>
    {/*<Route exact path={BASE_URL} component={IndexView} />*/}
    {/* TODO lazy load component */}
    <Route exact path={BASE_URL + 'courses/'} component={CoursesIndexView} />
    {/*<Route*/}
      {/*exact*/}
      {/*path={BASE_URL + ':resource_title([A-Za-z0-9_\\-\\.]+)/problems/:problem_title([A-Za-z0-9_\\-\\.]+)/solutions/:solution_title([A-Za-z0-9_\\-\\.]+)/:uuid'}*/}
      {/*component={SolutionView} />*/}
    {/*<Route*/}
      {/*exact*/}
      {/*path={BASE_URL + ':resource_title([A-Za-z0-9_\\-\\.]+)/problems/:problem_title([A-Za-z0-9_\\-\\.]+)/:uuid'}*/}
      {/*component={ProblemView} />*/}
    {/*<Route exact path={BASE_URL + ':title([A-Za-z0-9_\\-\\.]+)/:uuid/'} component={ResourceView} />*/}
    {/*<Route exact path={BASE_URL + 'adblock/'} component={AdblockView} />*/}
     {/*<Route path='*' component={NotFoundView} />*/}
  </Switch>
)
