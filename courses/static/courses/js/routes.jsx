import React from 'react'
import { Route, Switch } from 'react-router'
import { BASE_URL } from './utils/config'

import { CoursesIndexView } from './containers/CoursesViews'
import BrowseStudioDashboard from './containers/browseStudioIndex'
import { EditCourseView, EditModuleView } from './containers/StudioViews/EditorsViews'

import NotFoundView from './components/NotFoundView'

export default(
  <Switch>
    {/*<Route exact path={BASE_URL} component={IndexView} />*/}
    {/* TODO lazy load component (see units/loadable.jsx for details) */}
    <Route exact path={BASE_URL + 'courses/'} component={CoursesIndexView} />
    <Route exact path={BASE_URL + 'browse/'} component={BrowseStudioDashboard} />

    {/* studio */}
    <Route exact path={BASE_URL + 'studio/'} component={BrowseStudioDashboard} />
    <Route exact path={BASE_URL + 'studio/editor/courses/:uuid'} component={EditCourseView} />
    <Route exact path={BASE_URL + 'studio/editor/modules/:uuid'} component={EditModuleView} />
    {/*<Route exact path={BASE_URL + '/studio/editor/lessons/:uuid'} component={LessonApp} />*/}
    {/*<Route exact path={BASE_URL + '/studio/editor/questions/:uuid'} component={QuestionApp} />*/}

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
     <Route path='*' component={NotFoundView} />
  </Switch>
)
