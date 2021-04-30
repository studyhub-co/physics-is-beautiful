import React, { useEffect } from 'react'
import { ReactReduxContext } from 'react-redux'

import { Sheet } from '../components/Sheet'

import resourcesRoutes from '../../../../../resources/static/resources/js/routes'
import resourcesReducers from '../../../../../resources/static/resources/js/reducers/index'

// TODO add dnd

const ResourcesIndex = (props) => {
  const context = React.useContext(ReactReduxContext)
  // inject async reducer

  Object.keys(resourcesReducers).map((key, reducer) => {
    context.store.injectReducer(key, resourcesReducers[key])
  })

  return (
    // class name needs for css separation
    <div className={'resources'}>
      <Sheet>
        {resourcesRoutes}
      </Sheet>
    </div>
  )
}

export default ResourcesIndex
