import { Route, Switch } from 'react-router'
import React from 'react'

import AboutView from './about'
import PrivacyView from './privacy'
import TermsView from './terms'

import VerificationSentView from './auth/verification_sent'
import NotFoundView from '../../components/NotFoundView'

const StaticRoutes = (props: object) => (
  <Switch>
    <Route exact path={`${props.match.path}/about`} component={AboutView} />
    <Route exact path={`${props.match.path}/terms`} component={TermsView} />
    <Route exact path={`${props.match.path}/privacy`} component={PrivacyView} />
    <Route
      exact
      path={`${props.match.path}/auth/confirm-email`}
      component={VerificationSentView}
    />
    {/* we need this to catch not found */}
    <Route path="*" component={NotFoundView} />
  </Switch>
)

export default StaticRoutes
