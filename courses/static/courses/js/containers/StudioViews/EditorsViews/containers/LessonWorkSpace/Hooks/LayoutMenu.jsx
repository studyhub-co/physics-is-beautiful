import { useState } from 'react'
import { dispatch as csDispatch } from 'codesandbox-api'

export function useLayoutMode () {
  const [layout, setLayout] = useState('student')

  function setLayoutMode (mode) {
    // dispatch event to Editor API
    csDispatch({
      type: 'edit_mode',
      data: mode
    })
    setLayout(mode)
  }

  return [layout, setLayoutMode]
}
