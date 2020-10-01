import React, { useState } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import history from '../../../history'

import * as materialsActionCreators from '../../../actions/materials'

import { RingLoader } from 'react-spinners'

// import { SectionSheet } from '../SectionSheet'

const LessonComplete = props => {
  const [state, setState] = useState({
    // lessonUuid: match.params.lessonUuid,
    // materialUuid: match.params.materialUuid || null,
    // iframeUrl: null
  })

  return (
    <div>
      <h2>Lesson complete!</h2>
      <div>Proceed to next level (Next lesson or module page?)</div>
    </div>
  )
}

LessonComplete.propTypes = {}

const mapStateToProps = function (store) {
  return {
    currentMaterial: store.materials.material
  }
}

export default connect(
  mapStateToProps,
  dispatch => {
    return bindActionCreators(materialsActionCreators, dispatch)
  })(LessonComplete)
