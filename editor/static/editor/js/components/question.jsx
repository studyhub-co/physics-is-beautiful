import React from 'react';

import {EditableThumbnail} from './thumbnail';
import {EditableLabel} from './label'
import {AnswerTypes, AnswerTypeLabels} from '../constants';

import {MultipleChoiceAnswers} from './multiple_choice_answers';

export class Question extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  handleDeleteClick(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this question?')){
      this.props.onDeleteClick();
    }
  }
  render() {
    if (this.props.loading) {
      return <div>Loading...</div>
    }
    var typeOptions = Object.entries(AnswerTypeLabels).map(([typeId, typeDisplay]) => <option value={typeId}>{typeDisplay}</option>);

    var answersEditor;

    if (this.props.answer_type === AnswerTypes.MULTIPLE_CHOICE || this.props.answer_type === AnswerTypes.MULTISELECT_CHOICE){
      answersEditor = <MultipleChoiceAnswers answers={this.props.answers} onAddAnswerClick={this.props.onAddAnswerClick} exclusive={this.props.answer_type === AnswerTypes.MULTIPLE_CHOICE}/>;
    }
    
    return (
      <div className="question">
        <div className="row">
          <div className="col-md-6 text-center">
            <div className="bounding-box">
              <h1>
                <EditableLabel value={this.props.text} onChange={this.props.onTextChange}/>
                <span className="glyphicon glyphicon-remove" onClick={this.handleDeleteClick}/>
              </h1>
              <div className="thumbnail question-thumbnail">
                <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>                
              </div>
              Hint: <EditableLabel value={this.props.hint} onChange={this.props.onHintChange}/>
            </div>
          </div>
          <div className="col-md-6 text-center">
            <div className="bounding-box">
              <select onChange={this.props.onTypeChange} value={this.props.answer_type}>{typeOptions}</select>
              {answersEditor}
              <div className="clearfix"/>
            </div>
          </div>
        </div>
      </div>)
  }
}
