import React from 'react'
import { Route, Switch } from 'react-router'

// React react-router >= 5.1
// import { useRouteMatch } from 'react-router-dom'

import { CourseApp, ModuleApp, LessonApp } from './index'
import NotFoundView from '../../components/NotFoundView'
// import NotFoundView from '../../components/NotFoundView'

export default class CoursesRouter extends React.Component {
  render() {
    return (
      <div className={'course'}>
        <Switch>
          <Route
            exact
            path={this.props.match.path + 'lessons/:lessonUuid'}
            component={LessonApp}
          />
          <Route
            exact
            path={
              this.props.match.path +
              'lessons/:lessonUuid/materials/:materialUuid'
            }
            component={LessonApp}
          />
          <Route
            exact
            path={this.props.match.path + 'modules/:moduleUuid'}
            component={ModuleApp}
          />
          {/* FixMe Not need (not used for now) or redirect to a first module in Unit */}
          {/* <Route path='/units/:currentId' component={UnitsApp} /> */}
          {/* <Route path='/games/:uuid/:slug' component={GamesApp} /> */}

          {/* default course */}
          <Route exact path="" component={CourseApp} />
          {/* course with uuid */}
          <Route
            exact
            path={this.props.match.path + ':courseUuid/'}
            component={CourseApp}
          />
          <Route path="*" component={NotFoundView} />
        </Switch>
      </div>
    )
  }
}
