import React from 'react'
import { useStore, ReactReduxContext } from 'react-redux'

import { Sheet } from '../components/Sheet'

import classroomRoutes from '../../../../../classroom/static/classroom/js/routes'
import classroomReducers from '../../../../../classroom/static/classroom/js/reducers/index'

// TODO move it to main app and apply for every loadable parts of SPA
const useInjectReducer = ({ key, reducer }) => {
  const store = useStore()

  const isInjected = React.useRef(false)

  if (!isInjected.current) {
    store.injectReducer(key, reducer)
    isInjected.current = true
  }
}

const ClassroomIndex = (props) => {
  // const context = React.useContext(ReactReduxContext)
  // // inject async reducer

  // if you get warning in dev console here,
  // please see for detail: https://github.com/zalmoxisus/redux-devtools-extension/issues/759
  Object.keys(classroomReducers).map((key, reducer) => {
    useInjectReducer({key, reducer: classroomReducers[key]})
  })

  return (
    // class name needs for css separation
    <div className={'classroom'}>
      <Sheet>
        {classroomRoutes}
      </Sheet>
    </div>
  )
}

export default ClassroomIndex
