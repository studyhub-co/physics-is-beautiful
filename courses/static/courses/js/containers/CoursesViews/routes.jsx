import React from 'react'
import { Route, Switch } from 'react-router'

import { CourseApp } from './index'

export default class CoursesRouter extends React.Component {
  render () {
    return (
      <div>
        {/*<Route path='/lessons/:currentId' component={LessonsApp} />*/}
        {/*<Route path='/modules/:currentId' component={ModulesApp} />*/}
        {/*<Route path='/units/:currentId' component={UnitsApp} />*/}
        {/*<Route path='/games/:uuid/:slug' component={GamesApp} />*/}
        <Route exact path={this.props.match.path + ':currentId'} component={CourseApp} />
        {/*<Route path='/' component={CourseApp} />*/}
      </div>
    )
  }
}
