import React from 'react';
import { connect } from 'react-redux'

import {updateVectorAnswerComponents, changeVectorComponentsAnswer} from '../actions';

import {VectorComponentsAnswer} from '../components/vector_components_answer';

function shorten(num){
  if (num == 1)
    return '';
  else if (num == -1){
    return '-';
  }
  return num;
}

function parseComponent(s){
  if (s==='') 
    return 1
  else if (!s)
    return 0
  else if (s==='-')
    return -1
  else if (s==='+')
    return 1
  else
    return parseFloat(s)
}

function parse(rep){
  var match = rep.match(/^\s*((-?\d*\.?\d*)\s*\\hat\{x\})?\s*?(([+-]?\d*\.?\d*)\s*\\hat\{y\})?\s*$/)
  var x = parseComponent(match[2])
  var y = parseComponent(match[4])
  return [x, y]
}

const mapStateToProps = (state, ownProps) => {
  var ans = state.answers[ownProps.uuid];
  var rep = '';
  if (ans.x_component && ans.x_component != 0) {
    rep += shorten(ans.x_component) + '\\hat{x}'
  }
    if (rep && ans.y_component > 0)
      rep = rep +'+';

  if (ans.y_component && ans.y_component != 0) {
    rep += shorten(ans.y_component) + '\\hat{y}'
  }
    
  return {
    representation : rep
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRepresentationChange : newRepresentation => {
      var x,y;
      [x,y] = parse(newRepresentation)
      dispatch(updateVectorAnswerComponents(ownProps.uuid, x, y))
    },
  }
}

 
export const VectorComponentsAnswerContainer = connect(
  mapStateToProps, mapDispatchToProps)(VectorComponentsAnswer);
