import React from 'react';

import {EditableThumbnail} from './thumbnail'
import {EditableLabel} from './label'
import {BackButton} from './back_button'
import {QuestionThumbnailContainer} from '../containers/question_thumbnail'
import {DockableDropTarget, DragItemTypes} from '../dnd';


export class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  handleDeleteClick(e) {
    e.preventDefault();
    if (confirm('This will permanently delete lesson "'+this.props.name+'" with all its questions. Are you sure?')){
      this.props.onDeleteClick();
    }
  }
  render() {
    if (this.props.loading) {
      return <div>Loading...</div>
    }
    var questions = [];
    for (var i in this.props.questions) {
      questions.push(
        <DockableDropTarget key={this.props.questions[i]} onDrop={this.props.onQuestionDroppedBefore.bind(null, this.props.questions[i])}
                            itemType={DragItemTypes.QUESTION} selfUuid={this.props.questions[i]}>
          <QuestionThumbnailContainer key={this.props.questions[i]} uuid={this.props.questions[i]} />
        </DockableDropTarget>
      )
    }
    return (
      <div>        
        <BackButton link={'/modules/' + this.props.module + '/'}/>
        <h1>
          <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>
          <EditableLabel value={this.props.name} onChange={this.props.onNameChange}/>
          <span className="glyphicon glyphicon-remove" onClick={this.handleDeleteClick}/>
        </h1>
        <label><input type="radio" value="0" checked={this.props.lesson_type==0} onChange={e=>this.props.onTypeChange(0)}/> Normal lesson</label>
        <label><input type="radio" value="1" checked={this.props.lesson_type==1} onChange={e=>this.props.onTypeChange(1)} /> Game</label>
        {this.props.lesson_type==1 &&
          <label>Game type:
              <select value={this.props.game_type} onChange={this.props.onGameTypeChange}>
                  <option value="vector-game">Draw vector game</option>
                  <option value="unit-conversion">Unit conversion game</option>
                </select>
            </label>
          }
          {this.props.lesson_type==0 && <div className="lesson-questions">
              {questions}
              <DockableDropTarget onDrop={this.props.onQuestionDroppedBefore.bind(null, null)}
                                    itemType={DragItemTypes.QUESTION}>
                  <div className="dock-space"/>                     
              </DockableDropTarget>

          </div>}
      </div>)
  }
}
