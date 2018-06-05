import React from 'react';
import { connect } from 'react-redux'

import {Curriculum} from '../components/curriculum';

import {renameCurriculum, changeCurriculumImage, deleteCurriculum, addUnit, moveUnit} from '../actions';


const mapStateToProps = (state, ownProps) => {
  const cur = state.curricula[ownProps.uuid];
  if (cur) 
    return {
      loading : false,
      name : cur.name,
      image : cur.image,
      units : cur.units.map(unit_uuid => state.units[unit_uuid]),
    }
  else
    return {loading : true}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onImageChange : image => dispatch(changeCurriculumImage(ownProps.uuid, image)),
    onNameChange : name => dispatch(renameCurriculum(ownProps.uuid, name)),
    onDeleteClick : () => dispatch(deleteCurriculum(ownProps.uuid)),
    onAddUnitClick : () => dispatch(addUnit(ownProps.uuid)),
    onUnitDroppedBefore : (beforeUnit, unit) => dispatch(moveUnit(unit.uuid, beforeUnit)),
  }    
}

export const CurriculumContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Curriculum);
