import React from 'react'
import { useStore } from 'react-redux'

const useInjectReducer = ({ key, reducer }) => {
  const store = useStore()

  const isInjected = React.useRef(false)

  if (!isInjected.current) {
    store.injectReducer(key, reducer)
    isInjected.current = true
  }
}

export default useInjectReducer
