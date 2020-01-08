import React, { memo } from 'react'

import { compose } from 'redux'
import withConnect from './MenuActions'
import Theme from '../Styles'
import FileMenu from './FileMenu.jsx'
import ViewMenu from './ViewMenu.jsx'

function WorkspaceMenu () {
  return (
    <Theme>
      {/* TODO hide menu for Mobile */}
      <FileMenu />
      <ViewMenu />
    </Theme>
  )
}

export default compose(
  withConnect,
  memo
)(WorkspaceMenu)
