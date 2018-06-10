import React from 'react';

import {Thumbnail} from './thumbnail';

import { DragSource } from 'react-dnd';

import {DragItemTypes} from '../dnd';

export const dragSource = {
  beginDrag(props) {
    return {uuid:props.uuid};
  }
}


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview : connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}


class QuestionThumbnail extends React.Component {
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
    return this.props.connectDragPreview(
      <div className={'question-thumbnail draggable' + (this.props.selected ? ' selected':'')} style={{display: this.props.isDragging ? 'none' : 'inline-block'}}
           onClick={this.props.onClick}>
        <div className="question-thumbnail-inner">
          {this.props.connectDragSource(<span className="drag-handle"/>)}
          <span>{this.props.shortText}</span>
        </div>
        <span className="glyphicon glyphicon-remove btn-delete" onClick={this.handleDeleteClick}/>
      </div>)    
  }
}

QuestionThumbnail = DragSource(DragItemTypes.QUESTION, dragSource, collect)(QuestionThumbnail)

export {QuestionThumbnail}
