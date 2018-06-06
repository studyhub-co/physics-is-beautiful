import React from 'react';
import { connect } from 'react-redux'

import {changeAnswerText, changeAnswerImage, deleteAnswerChoice, setAnswerIsCorrect} from '../actions';

import {AnswerChoice} from '../components/answer_choice';

const mapStateToProps = (state, ownProps) => {
  var ans = state.answers[ownProps.uuid];
  return {
    text : ans.text,
    image : ans.image,
    is_correct : ans.is_correct,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTextChange : newName => dispatch(changeAnswerText(ownProps.uuid, newName)),
    onImageChange : newImage => dispatch(changeAnswerImage(ownProps.uuid, newImage)),
    onSelectChange : e =>  dispatch(setAnswerIsCorrect(ownProps.uuid, e.target.checked, ownProps.exclusive)),
    onDeleteClick : () => dispatch(deleteAnswerChoice(ownProps.uuid))
  }
}

 
export const AnswerChoiceContainer = connect(
  mapStateToProps, mapDispatchToProps)(AnswerChoice);
