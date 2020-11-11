import React, { useState } from 'react'

import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import history from '../../../history'

import * as materialsActionCreators from '../../../actions/materials'

import { Sheet } from '../../../components/Sheet'
import AdSense from 'react-adsense'
import PropTypes from 'prop-types'

// import { SectionSheet } from '../SectionSheet'

const LessonComplete = props => {
  const { currentMaterial } = props

  console.log(currentMaterial)

  // const [state, setState] = useState({
  //   // lessonUuid: match.params.lessonUuid,
  //   // materialUuid: match.params.materialUuid || null,
  //   // iframeUrl: null
  // })

  return (
    <Sheet>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
      >
        <h2>You rock! Lesson complete!</h2>
        <Link
          href={''}
          onClick={e => { e.preventDefault(); history.push(`/courses/modules/${currentMaterial.lesson.module}`) }}
          variant='h5'
          underline='none'>
            Proceed to next lesson
        </Link>
        <Link
          href={''}
          onClick={e => { e.preventDefault(); history.push(`/courses/lessons/${currentMaterial.lesson.uuid}`) }}
          variant='h5'
          underline='none'>
            Learn the lesson again
        </Link>
      </Box>
      <AdSense.Google
        client='ca-pub-1780955227395785'
        slot='4334626488'
      />
    </Sheet>
  )
}

LessonComplete.propTypes = {
  currentMaterial: PropTypes.object
}

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
