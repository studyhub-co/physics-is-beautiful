import React from 'react';
import { connect } from 'react-redux'

import {addQuestionVector, clearQuestionVectors} from '../actions';

import {QuestionVectors} from '../components/question_vectors';

import {angleToVector} from '../utils'

const mapStateToProps = (state, ownProps) => {
  var q = state.questions[ownProps.uuid];
  return {
    question : q.uuid,
    vectors : q.vectors
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onVectorChanged : (x_component, y_component) => dispatch(addQuestionVector(ownProps.uuid, x_component, y_component)),
    onClearClick : () => dispatch(clearQuestionVectors(ownProps.uuid))
  }
}

 
export const QuestionVectorsContainer = connect(
  mapStateToProps, mapDispatchToProps)(QuestionVectors);

