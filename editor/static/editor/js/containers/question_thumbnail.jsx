import React from 'react';
import { connect } from 'react-redux'

import { history } from '../history';

//import {} from '../actions';

import {QuestionThumbnail} from '../components/question_thumbnail';

const mapStateToProps = (state, ownProps) => {
  var q = state.questions[ownProps.uuid];
  return {
    shortText : q.text,
  }
}

 
export const QuestionThumbnailContainer = connect(mapStateToProps)(QuestionThumbnail);
