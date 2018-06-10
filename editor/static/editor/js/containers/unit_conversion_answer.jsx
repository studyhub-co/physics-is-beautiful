import React from 'react';
import { connect } from 'react-redux'

import {UnitConversionAnswer} from '../components/unit_conversion_answer';

import {updateUnitConversionType, updateUnitConversionQuestionValue, updateUnitConversionAnswerValue,
        updateUnitConversionStep, addConversionStep, removeConversionStep} from '../actions';


const mapStateToProps = (state, ownProps) => {
  var ans = state.answers[ownProps.uuid];
  return {
    question : ans.question,
    unit_conversion_type : ans.unit_conversion_type,
    conversion_steps : ans.conversion_steps,
    question_number : ans.question_number||'',
    question_unit : ans.question_unit||'',
    answer_number : ans.answer_number||'',
    answer_unit : ans.answer_unit||'',
    is_consistent : ans.is_consistent
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTypeChange : (e) => dispatch(updateUnitConversionType(ownProps.uuid, e.target.value)),
    onQuestionValueChange : newValue => dispatch(updateUnitConversionQuestionValue(ownProps.uuid, newValue)),
    onAnswerValueChange : newValue => dispatch(updateUnitConversionAnswerValue(ownProps.uuid, newValue)),
    onStepNumeratorChanged : (i, newValue) => dispatch(updateUnitConversionStep(ownProps.uuid, i, {numerator:newValue})),
    onStepDenominatorChanged : (i, newValue) => dispatch(updateUnitConversionStep(ownProps.uuid, i, {denominator:newValue})),
    onAddStepClick : () => dispatch(addConversionStep(ownProps.uuid)),
    onRemoveStepClick : () => dispatch(removeConversionStep(ownProps.uuid))
    
  }
}

 
export const UnitConversionAnswerContainer = connect(
  mapStateToProps, mapDispatchToProps)(UnitConversionAnswer);

