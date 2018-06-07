import React from 'react';
import { connect } from 'react-redux'

import {Lesson} from '../components/lesson';

import {renameLesson, changeLessonImage, changeLessonType, changeLessonGameType, deleteLesson} from '../actions';


const mapStateToProps = (state, ownProps) => {
  const les = state.lessons[ownProps.uuid];
  if (les) 
    return {
      loading : false,
      name : les.name,
      image : les.image,
      module : les.module,
      lesson_type : les.lesson_type,
      game_type : les.game_type,
      questions : les.questions,
      currentQuestion : state.currentQuestion,
    }
  else
    return {loading : true}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onImageChange : image => dispatch(changeLessonImage(ownProps.uuid, image)),
    onNameChange : name => dispatch(renameLesson(ownProps.uuid, name)),
    onDeleteClick : () => dispatch(deleteLesson(ownProps.uuid)),
    onTypeChange : newType => dispatch(changeLessonType(ownProps.uuid, newType)),
    onGameTypeChange : e => dispatch(changeLessonGameType(ownProps.uuid, e.target.value)),
  }    
}

export const LessonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Lesson);
