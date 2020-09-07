import React, { memo } from 'react'

import { compose } from 'redux'
import withConnect from './MenuActions'
import Theme from '../Styles'
import FileMenu from './Sections/FileMenu'
import ViewMenu from './Sections/ViewMenu'
import ActionsMenu from './Sections/ActionsMenu'
import LessonMenu from './Sections/LessonMenu'

function WorkspaceMenu (props) {
  return (
    <Theme>
      {/* TODO hide menu for Mobile */}
      {/* TODO not so good use the same props for all */}
      <FileMenu {...props}/>
      <ViewMenu {...props}/>
      <ActionsMenu {...props}/>
      <LessonMenu {...props}/>
    </Theme>
  )
}

export default compose(
  withConnect,
  memo
)(WorkspaceMenu)
