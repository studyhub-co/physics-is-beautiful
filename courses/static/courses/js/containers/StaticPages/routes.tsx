import { Route, Switch } from 'react-router'
import React from 'react'

import AboutView from './about'
import PrivacyView from './privacy'
import TermsView from './terms'

const StaticRoutes = (props: object) => (
  <Switch>
    <Route exact path={`${props.match.path}/about`} component={AboutView} />
    <Route exact path={`${props.match.path}/terms`} component={TermsView} />
    <Route exact path={`${props.match.path}/privacy`} component={PrivacyView} />
  </Switch>
)

export default StaticRoutes
