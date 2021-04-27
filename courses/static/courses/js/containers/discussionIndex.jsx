import React, { useState, useEffect } from 'react'

// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

import TopicsListComponent from '@studyhub.co/react-comments-django-client/lib/TopicsListComponent'

import history from '../history'
import { Sheet } from '../components/Sheet'
// import { Col, Container, Row } from 'react-bootstrap'
// import { RingLoader } from 'react-spinners'
// import { SectionSheet } from '../SectionSheet'

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

// DiscussionIndex.propTypes = {}
//
// const mapStateToProps = function (store) {
//   return {
//     // currentCourse: store.courses.course
//   }
// }
//
// export default connect(
//   mapStateToProps,
//   dispatch => {
//     // return bindActionCreators(coursesActionCreators, dispatch)
//   })(DiscussionIndex)
