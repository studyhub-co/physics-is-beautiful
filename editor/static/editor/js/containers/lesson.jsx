import React from 'react';
import { connect } from 'react-redux'

import {Lesson} from '../components/lesson';

import {renameLesson, changeLessonImage, deleteLesson} from '../actions';


const mapStateToProps = (state, ownProps) => {
  const les = state.lessons[ownProps.uuid];
  if (les) 
    return {
      loading : false,
      name : les.name,
      image : les.image,
      module : les.module
    }
  else
    return {loading : true}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onImageChange : image => dispatch(changeLessonImage(ownProps.uuid, image)),
    onNameChange : name => dispatch(renameLesson(ownProps.uuid, name)),
    onDeleteClick : () => dispatch(deleteLesson(ownProps.uuid)),
  }    
}

export const LessonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Lesson);
