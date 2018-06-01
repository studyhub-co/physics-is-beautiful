import React from 'react';
import { connect } from 'react-redux'

import {updateVectorAnswerComponents, updateVectorAnswerAngleOnly} from '../actions';

import {VectorAnswer} from '../components/vector_answer';

import {angleToVector} from '../utils'

const mapStateToProps = (state, ownProps) => {
  var ans = state.answers[ownProps.uuid];
  var x,y;
  if (ans.x_component != null) {
    x = ans.x_component;
    y = ans.y_component;    
  } else if (ans.angle != null) {
    [x,y] = angleToVector(ans.angle)
  } 
  return {
    question : ans.question,
    x_component : x,
    y_component : y,
    angleOnly : ans.angle != null,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onVectorChanged : (x_component, y_component) => dispatch(updateVectorAnswerComponents(ownProps.uuid, x_component, y_component)),
    onAngleOnlyChanged : angleOnly => dispatch(updateVectorAnswerAngleOnly(ownProps.uuid,angleOnly)),
    onSetNull : () => dispatch(updateVectorAnswerComponents(ownProps.uuid, null, null))
  }
}

 
export const VectorAnswerContainer = connect(
  mapStateToProps, mapDispatchToProps)(VectorAnswer);
