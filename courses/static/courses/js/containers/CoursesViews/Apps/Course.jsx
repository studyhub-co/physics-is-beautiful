import React, { useState, useEffect } from 'react'

import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

// import history from '../history'

import * as coursesActionCreators from '../../../actions/courses'

import { Sheet } from '../../../components/Sheet'

const Course = props => {
  const { match, fetchCourse } = props

  // currentId: obj.match.params.currentId || 'default',
  const [state, setState] = useState({
    courseUuid: match.params.courseUuid || '00000000-0000-0000-0000-000000000000' // todo add url param
  })

  console.log(props);

  useEffect(() => {
    // fetch state.courseUuid
    // console.log(state.courseUuid)
    fetchCourse(state.courseUuid)
  }, [])

  return (
    <Sheet>

      This is course index: <br/>
      TODO: <br/>
      1. Get default course<br/>
      2. Show default course<br/>
      3. Support courseId navigation<br/>
      4. Add iframe execution<br/>
      5. Iframe execution navigation (move to the next material)<br/>
    </Sheet>
  )
}

Course.propTypes = {}

const mapStateToProps = function (store) {
  return {
    // tab: store.studio.tabs.tab
  }
}

export default connect(
  mapStateToProps,
  dispatch => {
    return bindActionCreators(coursesActionCreators, dispatch)
    // return {
    //   // deleteCourse: (uuid) => dispatch(deleteCourse(uuid))
    // }
  })(Course)
