import React from 'react'
import { Route, Switch } from 'react-router'

import { CoursesRoutes } from './containers/CoursesViews'
import BrowseStudioDashboard from './containers/browseStudioIndex'
import {
  EditCourseView, EditModuleView
} from './containers/StudioViews/EditorsViews'

import EditLessonView from './containers/StudioViews/EditorsViews/editLessonLoadable'

import DiscussionIndex from './containers/discussionIndex'
import ResourcesIndex from './containers/ResourcesIndex/loadable'
import ClassroomIndex from './containers/classroomIndex/loadable'
import UserProfileIndex from './containers/userProfileIndex'

import NotFoundView from './components/NotFoundView'

export default(
  <Switch>
    {/* <Route exact path={BASE_URL} component={IndexView} /> */}
    {/* TODO lazy load components (see utils/loadable.jsx for details) */}

    {/* student views */}
    <Route exact path={'/'} component={CoursesRoutes} />
    <Route path={'/courses/:courseUuid?'} component={CoursesRoutes} />

    {/* browse courses */}
    <Route exact path={'/browse/'} component={BrowseStudioDashboard} />

    {/* studio */}
    <Route exact path={'/studio/'} component={BrowseStudioDashboard} />

    {/* see for details courses/static/courses/js/containers/browseStudioIndex.jsx */}
    <Route exact path={'/studio/profile/:uuid/'} component={BrowseStudioDashboard} />

    <Route exact path={'/studio/editor/courses/:uuid'} component={EditCourseView} />
    <Route exact path={'/studio/editor/modules/:uuid'} component={EditModuleView} />
    <Route exact path={'/studio/editor/lessons/:uuid'} component={EditLessonView} />
    <Route exact path={'/studio/editor/lessons/:uuid/materials/:material_uuid'} component={EditLessonView} />

    {/* <Route exact path={'/studio/profile/:uuid/' } component={EditCourseProfileView} /> */}

    {/* TODO remove this url? */}
    {/* <Route exact path={'/studio/editor/material-problem-type/:problem_type_uuid'} component={ProblemTypeEditorView} />* /}
    {/* <Route exact path={'/studio/editor/questions/:uuid'} component={QuestionApp} /> */}
    {/* <Route path={BASE_URL + '/course/profile/:uuid'} component={CourseProfileView} /> */}

    {/* discussion */}
    <Route path={'/discussion'} component={DiscussionIndex} />

    {/* resources */}
    <Route path={'/resources'} component={ResourcesIndex} />

    {/* classroom */}
    <Route path={'/classroom'} component={ClassroomIndex} />

    {/* profile */}
    <Route path={'/profile'} component={UserProfileIndex} />

    {/* fixme */}
    {/* do we have adblock in resources app only? */}
    {/* <Route exact path={'adblock/'} component={AdblockView} /> */}
    {/* TODO to complete home page */}
    {/* <Route path='/' component={HomeIndex} /> */}
    <Route path='*' component={NotFoundView} />
  </Switch>
)
