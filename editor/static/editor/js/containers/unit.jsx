import React from 'react';
import { connect } from 'react-redux'

import {Unit} from '../components/unit';
import {renameUnit, changeUnitImage, deleteUnit, addModule, moveModule, moveLesson} from '../actions';
import {DragItemTypes} from '../dnd';

const mapStateToProps = (state, ownProps) => {
  const unit = state.units[ownProps.uuid];
  return {
    loading : false,
    name : unit.name,
    image : unit.image,
    curricilum : unit.curriculum,
    modules : unit.modules,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onImageChange : image => dispatch(changeUnitImage(ownProps.uuid, image)),
    onNameChange : name => dispatch(renameUnit(ownProps.uuid, name)),
    onDeleteClick : () => dispatch(deleteUnit(ownProps.uuid)),
    onAddModuleClick : () => dispatch(addModule(ownProps.uuid)),
    onModuleDroppedBefore : (beforeModuleUuid, draggedItem) => {
      dispatch(moveModule(draggedItem.uuid, ownProps.uuid, beforeModuleUuid))
    }
  }    
}

export const UnitContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Unit);
