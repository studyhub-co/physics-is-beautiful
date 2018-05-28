import React from 'react';

import {EditableThumbnail} from './thumbnail';
import {EditableLabel} from './label'

import { DragSource } from 'react-dnd';

import {DragItemTypes} from '../dnd';

export const lessonDragSource = {
  beginDrag(props) {
    return {uuid:props.uuid};
  }
}


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


class LessonThumbnail extends React.Component {
  render() {
    return this.props.connectDragSource(
      <div className="col-md-1 module-accessible-block">
        <div className="thumbnail section-thumbnail"><EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/></div>
        <div><EditableLabel value={this.props.name} onChange={this.props.onNameChange}/></div>
      </div>)    
  }
}

LessonThumbnail = DragSource(DragItemTypes.LESSON, lessonDragSource, collect)(LessonThumbnail)

export {LessonThumbnail}
