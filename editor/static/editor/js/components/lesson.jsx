import React from 'react';

import {EditableThumbnail} from './thumbnail'
import {EditableLabel} from './label'
import {BackButton} from './back_button'


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
    return (
      <div className="lesson">        
        <BackButton link={'/modules/' + this.props.module + '/'}/>
        <h1>
          <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>
          <EditableLabel value={this.props.name} onChange={this.props.onNameChange} defaultValue="New lesson"/>
          <span className="glyphicon glyphicon-remove" onClick={this.handleDeleteClick}/>
        </h1>
        <label><input type="radio" value="0" checked={this.props.lesson_type==0} onChange={e=>this.props.onTypeChange(0)}/> Normal lesson</label>
        <label><input type="radio" value="1" checked={this.props.lesson_type==1} onChange={e=>this.props.onTypeChange(1)} /> Game</label>
        {this.props.lesson_type==1 &&
          <select value={this.props.game_type} onChange={this.props.onGameTypeChange}>
              <option value="vector-game">Draw vector game</option>
                <option value="unit-conversion">Unit conversion game</option>
            </select>
          }
          <a href={'/curriculum/lessons/'+this.props.uuid} target="_blank" className="btn btn-default"><span className="glyphicon glyphicon-new-window"/> Open student view</a>
      </div>)
  }
}
