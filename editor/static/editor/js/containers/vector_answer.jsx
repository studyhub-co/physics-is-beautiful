import React from 'react';
import { connect } from 'react-redux'

import {updateVectorAnswerComponents, updateVectorCheckType} from '../actions';

import {VectorAnswer} from '../components/vector_answer';

import {angleToVector} from '../utils'

const mapStateToProps = (state, ownProps) => {
  var ans = state.answers[ownProps.uuid];
  var x,y;
  var checkType;
  if (ans.x_component != null) {
    x = ans.x_component;
    y = ans.y_component;
    checkType = 'full';
  } else if (ans.angle != null) {
    [x,y] = angleToVector(ans.angle);
    checkType = 'angle';
  } else {
    x = ans.magnitude;
    y = 0;
    checkType = 'magnitude';
  }
  return {
    question : ans.question,
    x_component : x,
    y_component : y,
    vectorCheckType : checkType,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onVectorChanged : (x_component, y_component) => dispatch(updateVectorAnswerComponents(ownProps.uuid, x_component, y_component)),
    onVectorCheckTypeChanged : e => dispatch(updateVectorCheckType(ownProps.uuid, e.target.value)),
    onSetNull : () => dispatch(updateVectorAnswerComponents(ownProps.uuid, null, null))
  }
}

 
export const VectorAnswerContainer = connect(
  mapStateToProps, mapDispatchToProps)(VectorAnswer);
