import React from 'react'
import { Route, Switch } from 'react-router'
import { BASE_URL } from './utils/config'

import { CoursesIndexView } from './containers/CoursesViews'
import BrowseStudioDashboard from './containers/browseStudioIndex'
import {
  EditCourseView, EditModuleView, EditLessonView
} from './containers/StudioViews/EditorsViews'

import NotFoundView from './components/NotFoundView'

export default(
  <Switch>
    {/*<Route exact path={BASE_URL} component={IndexView} />*/}
    {/* TODO lazy load components (see units/loadable.jsx for details) */}

    {/* student views */}
    <Route exact path={BASE_URL + 'courses/'} component={CoursesIndexView} />

    {/* browse courses */}
    <Route exact path={BASE_URL + 'browse/'} component={BrowseStudioDashboard} />

    {/* studio */}
    <Route exact path={BASE_URL + 'studio/'} component={BrowseStudioDashboard} />
    <Route exact path={BASE_URL + 'studio/editor/courses/:uuid'} component={EditCourseView} />
    <Route exact path={BASE_URL + 'studio/editor/modules/:uuid'} component={EditModuleView} />
    <Route exact path={BASE_URL + 'studio/editor/lessons/:uuid'} component={EditLessonView} />
    {/*<Route exact path={BASE_URL + '/studio/editor/questions/:uuid'} component={QuestionApp} />*/}
    {/*<Route path={BASE_URL + '/course/profile/:uuid'} component={CourseProfileView} />*/}

    {/* fixme */}
    {/*<Route exact path={BASE_URL + 'adblock/'} component={AdblockView} />*/}
    <Route path='*' component={NotFoundView} />
  </Switch>
)
