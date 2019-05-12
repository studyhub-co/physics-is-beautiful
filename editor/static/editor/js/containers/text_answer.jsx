import React from 'react'
import { connect } from 'react-redux'

import { changeAnswerText } from '../actions'

import { TextAnswer } from '../components/text_answer'

const mapStateToProps = (state, ownProps) => {
  var ans = state.answers[ownProps.uuid]
  return {
    text: ans.text,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTextChange: newText => dispatch(changeAnswerText(ownProps.uuid, newText)),
  }
}

export const TextAnswerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TextAnswer)
