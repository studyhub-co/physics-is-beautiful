import React from 'react';

import {EditableThumbnail} from './thumbnail';
import {EditableLabel} from './label'


export class AnswerChoice extends React.Component {
  render() {
    return (
      <div className="col-md-1 module-accessible-block">
        <div className="thumbnail"><EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/></div>
        <div>
          <input type={this.props.exclusive ? 'radio':'checkbox'}  onChange={this.props.onSelectChange} value={this.props.text} checked={this.props.is_correct}/>
          <EditableLabel value={this.props.text} onChange={this.props.onTextChange}/>
        </div>
      </div>)    
  }
}
