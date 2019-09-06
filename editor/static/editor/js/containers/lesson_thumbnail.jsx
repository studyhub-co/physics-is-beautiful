import React from 'react'
import { connect } from 'react-redux'

import { history } from '../history'

import {LessonThumbnail} from '../components/lesson_thumbnail'

const mapStateToProps = (state, ownProps) => {
  var les = state.lessons[ownProps.uuid]
  return {
    name: les.name,
    image: les.image,
    onClick: () => { history.push('/studio/editor/lessons/' + ownProps.uuid + '/') }
  }
}

export const LessonThumbnailContainer = connect(mapStateToProps)(LessonThumbnail)
