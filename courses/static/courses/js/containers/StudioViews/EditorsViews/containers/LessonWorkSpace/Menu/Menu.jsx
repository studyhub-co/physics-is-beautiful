import React, { memo } from 'react'

import { compose } from 'redux'
import withConnect from './MenuActions'
import Theme from '../Styles'
import FileMenu from './FileMenu.jsx'
import ViewMenu from './ViewMenu.jsx'

function WorkspaceMenu (props) {
  return (
    <Theme>
      {/* TODO hide menu for Mobile */}
      {/* TODO not so good use the same pros for both */}
      <FileMenu {...props}/>
      <ViewMenu {...props}/>
    </Theme>
  )
}

export default compose(
  withConnect,
  memo
)(WorkspaceMenu)
