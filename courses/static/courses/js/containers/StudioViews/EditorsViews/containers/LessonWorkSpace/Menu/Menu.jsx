import React, { memo } from 'react'

import { compose } from 'redux'
import withConnect from './MenuActions'
import Theme from '../Styles'
import FileMenu from './FileMenu.jsx'
import FileMenu1 from './FileMenu.jsx'

function WorkspaceMenu () {
  return (
    <Theme>
      {/*TODO hide menu for Mobile */}
      <FileMenu />
      <FileMenu1 />
    </Theme>
  )
}

export default compose(
  withConnect,
  memo
)(WorkspaceMenu )
