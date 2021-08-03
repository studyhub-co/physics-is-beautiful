import { useState } from 'react'
// import { dispatch as csDispatch } from 'codesandbox-api'

import { editModeMessage } from '../../../../../../utils/iframe/postMessages'

export function useLayoutMode() {
  const [layout, setLayout] = useState('student')

  function setLayoutMode(mode) {
    // we can't use csDispatch in sandbox standalone mode
    // dispatch event to Editor API
    // csDispatch({
    //   type: 'edit_mode',
    //   data: mode
    // })
    // document.getElementById('student_view_iframe').contentWindow.postMessage(
    //   {
    //     type: 'edit_mode',
    //     data: mode,
    //   },
    //   '*',
    // )
    editModeMessage(mode)
    setLayout(mode)
  }

  // let's use standalone fast mode

  return [layout, setLayoutMode]
}
