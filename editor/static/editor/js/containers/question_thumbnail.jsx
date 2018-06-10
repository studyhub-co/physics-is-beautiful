import React from 'react';
import { connect } from 'react-redux'

import { history } from '../history';

import {goToQuestion, deleteQuestion} from '../actions';

import {QuestionThumbnail} from '../components/question_thumbnail';

const mapStateToProps = (state, ownProps) => {
  var q = state.questions[ownProps.uuid];
  return {
    shortText : q.text,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick : e => dispatch(goToQuestion(ownProps.uuid)),
    onDeleteClick : () => dispatch(deleteQuestion(ownProps.uuid)),   
  }
}
 
export const QuestionThumbnailContainer = connect(mapStateToProps, mapDispatchToProps)(QuestionThumbnail);
