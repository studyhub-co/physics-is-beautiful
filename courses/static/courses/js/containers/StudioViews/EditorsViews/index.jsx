import React from 'react'

import { Sheet } from '../../../components/Sheet'
import EditCourseView1 from './containers/course'
import EditModuleView1 from './containers/module'

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
