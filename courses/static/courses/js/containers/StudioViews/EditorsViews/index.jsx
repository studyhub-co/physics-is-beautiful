import React from 'react'

import { Sheet } from '../../../components/Sheet'
import EditCourseView1 from './containers/course'
import EditModuleView1 from './containers/module'
// import EditLessonView1 from './containers/lesson'
// import EditLessonView1 from './containers/LessonWorkSpace/index'
import EditLessonView1 from './containers/LessonWorkSpace/index'
// import ProblemTypeEditorView1 from './containers/LessonWorkSpace/index_problem_type'

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
      <Sheet>
        <div className={'editor'}>
          <EditLessonView1 {...this.props} />
        </div></Sheet>
    )
  }
}

// export class ProblemTypeEditorView extends React.Component {
//   render () {
//     return (
//       <Sheet>
//         <div className={'editor'}>
//           <ProblemTypeEditorView1 {...this.props} />
//         </div></Sheet>
//     )
//   }
// }
