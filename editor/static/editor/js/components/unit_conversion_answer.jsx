import React from 'react';

import {UnitConversionTypes, UnitConversionTypeLabels} from '../constants'
import {EditableLabel} from './label'


export class UnitConversionAnswer extends React.Component {

  render() {
    var typeOptions=[];
    for (var uct in UnitConversionTypeLabels)
      typeOptions.push(<option key={uct} value={uct}>{UnitConversionTypeLabels[uct]}</option>)
    var steps=[];
    for (var s in this.props.conversion_steps){
      steps.push(<div className="conversion-step" key={s}>
                 <div className="numerator"><EditableLabel value={this.props.conversion_steps[s].numerator.replace('\\ ',' ')} onChange={this.props.onStepNumeratorChanged.bind(null, s)}/></div>
                 <div className="denominator"><EditableLabel value={this.props.conversion_steps[s].denominator.replace('\\ ',' ')} onChange={this.props.onStepDenominatorChanged.bind(null,s)}/></div>
                 </div>)
    }
    return (
      <div className={'unit-conversion' + (this.props.is_consistent? '' : ' inconsistent')}>
        <select onChange={this.props.onTypeChange} value={this.props.unit_conversion_type}>{typeOptions}</select>
        <div className="conversion-row">
          <div className="conversion-steps">
            <div className="conversion-step">
              <div className="numerator"><EditableLabel value={this.props.question_number+' '+this.props.question_unit} onChange={this.props.onQuestionValueChange}/></div>
              <div className="denominator">&nbsp;</div>
            </div>
            {steps}
          </div>
          <div className="add-remove-steps">
            <a href="" onClick={e=>{e.preventDefault();this.props.onAddStepClick()}} className="hover-button"><span className="glyphicon glyphicon-plus"/> Add Step</a> <br/>
            <a href="" onClick={e=>{e.preventDefault(); if (this.props.conversion_steps.length > 1) this.props.onRemoveStepClick()}} className={'hover-button' + (this.props.conversion_steps.length<=1 ? ' disabled' : '')}><span className="glyphicon glyphicon-minus"/> Remove Step</a>
          </div>
          <div className="equals"> = </div>
          <div className="conversion-result">
            <EditableLabel value={this.props.answer_number+' '+this.props.answer_unit} onChange={this.props.onAnswerValueChange}/>
          </div>        
        </div>
        {!this.props.is_consistent &&
          <div className="alert alert-warning" role="alert">This conversion is inconsistent or incomplete. Please correct or complete it</div>
          }
      </div>
    )
  }
}
