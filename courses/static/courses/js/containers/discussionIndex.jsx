import React, { useState, useEffect } from 'react'

import TopicsListComponent from '@studyhub.co/react-comments-django-client/lib/TopicsListComponent'

import history from '../history'
import { Sheet } from '../components/Sheet'

const DiscussionIndex = props => {
  return (
    <Sheet>
      <TopicsListComponent
        anonAsUserObject={Boolean(true)}
        history={history}
      />
    </Sheet>
  )
}

export default DiscussionIndex
