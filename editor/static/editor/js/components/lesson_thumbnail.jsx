import React from 'react';

import {LessonContainer} from '../containers';
import {EditableThumbnail} from './thumbnail';
import {EditableLabel} from './label'


export class LessonThumbnail extends React.Component {
  render() {
    return (
      <div className="col-md-1 module-accessible-block">
        <div className="thumbnail section-thumbnail"><EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/></div>
        <div><EditableLabel value={this.props.name} onChange={this.props.onNameChange}/></div>
      </div>)    
  }
}
