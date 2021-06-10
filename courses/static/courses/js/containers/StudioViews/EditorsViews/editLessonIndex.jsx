import React from 'react'
import EditLessonView1 from './containers/LessonWorkSpace'

export default class EditLessonView extends React.Component {
  render() {
    return (
      <div className={'editor'} style={{ backgroundColor: 'white' }}>
        <EditLessonView1 {...this.props} />
      </div>
    )
  }
}
