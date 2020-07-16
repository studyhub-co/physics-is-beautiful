import React from 'react'

import { Sheet } from '../../../components/Sheet'
import EditCourseView1 from './containers/course'
import EditModuleView1 from './containers/module'
import EditLessonView1 from './containers/LessonWorkSpace/index'

export class EditCourseView extends React.Component {
  render () {
    return (
      <Sheet>
        <div className={'editor'}>
          <EditCourseView1 {...this.props} />
        </div>
      </Sheet>
    )
  }
}

export class EditModuleView extends React.Component {
  render () {
    return (<Sheet>
      <div className={'editor'}>
        <EditModuleView1 {...this.props} />
      </div>
    </Sheet>
    )
  }
}

export class EditLessonView extends React.Component {
  render () {
    return (
      <div className={'editor'} style={{ backgroundColor: 'white' }}>
        <EditLessonView1 {...this.props} />
      </div>
    )
  }
}
