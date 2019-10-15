import React from 'react'

import EditCourseView1 from './containers/course'
import EditModuleView1 from './containers/module'
// import EditLessonView1 from './containers/lesson'
import EditLessonView1 from './containers/LessonWorkSpace/index'

export class EditCourseView extends React.Component {
  render () {
    return (<div className={'editor'}>
      <EditCourseView1 {...this.props} />
    </div>)
  }
}

export class EditModuleView extends React.Component {
  render () {
    return (<div className={'editor'}>
      <EditModuleView1 {...this.props} />
    </div>)
  }
}

export class EditLessonView extends React.Component {
  render () {
    return (<div className={'editor'}>
      <EditLessonView1 {...this.props} />
    </div>)
  }
}
