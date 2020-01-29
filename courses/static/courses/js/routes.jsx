import React from 'react'
import { Route, Switch } from 'react-router'

import { CoursesRoutes } from './containers/CoursesViews'
import BrowseStudioDashboard from './containers/browseStudioIndex'
import {
  EditCourseView, EditModuleView, EditLessonView, ProblemTypeEditorView
} from './containers/StudioViews/EditorsViews'

import NotFoundView from './components/NotFoundView'

export default(
  <Switch>
    {/* <Route exact path={BASE_URL} component={IndexView} /> */}
    {/* TODO lazy load components (see units/loadable.jsx for details) */}

    {/* student views */}
    <Route path={'/courses/'} component={CoursesRoutes} />

    {/* browse courses */}
    <Route exact path={'/browse/'} component={BrowseStudioDashboard} />

    {/* studio */}
    <Route exact path={'/studio/'} component={BrowseStudioDashboard} />
    <Route exact path={'/studio/editor/courses/:uuid'} component={EditCourseView} />
    <Route exact path={'/studio/editor/modules/:uuid'} component={EditModuleView} />
    <Route exact path={'/studio/editor/lessons/:uuid'} component={EditLessonView} />
    <Route exact path={'/studio/editor/lessons/:uuid/materials/:material_uuid'} component={EditLessonView} />

    {/* TODO remove this url? */}
    <Route exact path={'/studio/editor/material-problem-type/:problem_type_uuid'} component={ProblemTypeEditorView} />
    {/* <Route exact path={'/studio/editor/questions/:uuid'} component={QuestionApp} /> */}
    {/* <Route path={BASE_URL + '/course/profile/:uuid'} component={CourseProfileView} /> */}

    {/* fixme */}
    {/* <Route exact path={'adblock/'} component={AdblockView} /> */}
    <Route path='*' component={NotFoundView} />
  </Switch>
)
