/**
 * Asynchronously loads the container
 */

import React from 'react'
import loadable from '../../utils/loadable'
import { RingLoader } from 'react-spinners'
import { Sheet } from '../../components/Sheet'

const RingLoaderSheet = () => {
  return (
    <Sheet>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <RingLoader color={'#1caff6'} />
      </div>
    </Sheet>
  )
}

export default loadable(() => import('./classroomIndex'), {
  fallback: <RingLoaderSheet />,
})
