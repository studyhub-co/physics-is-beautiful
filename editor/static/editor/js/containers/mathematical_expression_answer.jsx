import React from 'react';
import { connect } from 'react-redux'

import {changeAnswerRepresentation} from '../actions';

import {MathematicalExpressionAnswer} from '../components/mathematical_expression_answer';

const mapStateToProps = (state, ownProps) => {
  var ans = state.answers[ownProps.uuid];
  return {
    representation : ans.representation
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRepresentationChange : newRepresentation => dispatch(changeAnswerRepresentation(ownProps.uuid, newRepresentation)),
  }
}

 
export const MathematicalExpressionAnswerContainer = connect(
  mapStateToProps, mapDispatchToProps)(MathematicalExpressionAnswer);
