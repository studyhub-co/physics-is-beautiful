import React from 'react';
import { Route, Switch } from 'react-router';
import { HomeView } from './containers';

export default(
    <Switch>
        <Route exact path="/" component={HomeView} />
        {/*<Route path="*" component={NotFoundView} />*/}
    </Switch>

);
