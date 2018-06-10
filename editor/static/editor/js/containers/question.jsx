import React from 'react';
import { connect } from 'react-redux'

import {Question} from '../components/question';

import {changeQuestionText, changeQuestionImage, changeQuestionHint, changeQuestionType, addAnswer} from '../actions';


const mapStateToProps = (state, ownProps) => {
  const q = state.questions[ownProps.uuid];
  if (q) {
    var hasPictures = false
    for (var i in q.answers) {
      if (state.answers[q.answers[i]].image) {
        hasPictures = true;
        break;
      }
    }
    return {
      loading : false,
      text : q.text,
      image : q.image,
      hint : q.hint,
      answers : q.answers,
      hasPictures : hasPictures,
      answer_type : q.answer_type
    }
  }
  else
    return {loading : true}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onImageChange : image => dispatch(changeQuestionImage(ownProps.uuid, image)),
    onTextChange : name => dispatch(changeQuestionText(ownProps.uuid, name)),
    onHintChange : hint => dispatch(changeQuestionHint(ownProps.uuid, hint)),
    onTypeChange : (e) => dispatch(changeQuestionType(ownProps.uuid, e.target.value)),
    onAddAnswerClick : () => dispatch(addAnswer(ownProps.uuid))
  }    
}

export const QuestionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
