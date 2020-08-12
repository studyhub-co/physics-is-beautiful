import React, { memo } from 'react'

import { compose } from 'redux'
import withConnect from './MenuActions'
import Theme from '../Styles'
import FileMenu from './Sections/FileMenu.jsx'
import ViewMenu from './Sections/ViewMenu.jsx'
import ActionsMenu from './Sections/ActionsMenu.jsx'

function WorkspaceMenu (props) {
  return (
    <Theme>
      {/* TODO hide menu for Mobile */}
      {/* TODO not so good use the same props for all */}
      <FileMenu {...props}/>
      <ViewMenu {...props}/>
      <ActionsMenu {...props}/>
    </Theme>
  )
}

export default compose(
  withConnect,
  memo
)(WorkspaceMenu)
