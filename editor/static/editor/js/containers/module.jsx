import React from 'react';
import { connect } from 'react-redux'

import {Module} from '../components/module';

import {renameModule, changeModuleImage, deleteModule, moveLesson, addLesson} from '../actions';


const mapStateToProps = (state, ownProps) => {
  const mod = state.modules[ownProps.uuid];
  if (mod) 
    return {
      loading : false,
      name : mod.name,
      image : mod.image,
      lessons : mod.lessons || [],
      curriculum : mod.curriculum
    }
  else
    return {loading : true}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onImageChange : image => dispatch(changeModuleImage(ownProps.uuid, image)),
    onNameChange : name => dispatch(renameModule(ownProps.uuid, name)),
    onDeleteClick : () => dispatch(deleteModule(ownProps.uuid)),
    onLessonDroppedBefore : (beforeLessonUuid, draggedItem) => dispatch(moveLesson(draggedItem.uuid, ownProps.uuid, beforeLessonUuid)),
    onAddLessonClick : () => dispatch(addLesson(ownProps.uuid))
  }    
}

export const ModuleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Module);
