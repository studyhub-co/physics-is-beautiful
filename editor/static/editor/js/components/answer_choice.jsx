import React from 'react';

import {EditableThumbnail} from './thumbnail';
import {EditableLabel} from './label'


export class AnswerChoice extends React.Component {
  render() {
    var thumb = <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>
    var selectionControl = <input type={this.props.exclusive ? 'radio':'checkbox'}  onChange={this.props.onSelectChange} value={this.props.text} checked={this.props.is_correct}/>
    var label = <EditableLabel value={this.props.text} onChange={this.props.onTextChange}/>

    if (this.props.withThumbnail)
    return (
      <div className="answer-choice col-md-1 module-accessible-block with-image">
        <div className="thumbnail">{thumb}</div>
        <div>
          {selectionControl} {label}          
        </div>
      </div>)
    else
      return (
        <div className="answer-choice answer-button without-image">
          {selectionControl} {label} {thumb}
        </div>)
      
  }
}
