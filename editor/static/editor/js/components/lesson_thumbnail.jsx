import React from 'react'

import { DragSource } from 'react-dnd'
import { FaGripHorizontal, FaGripLines } from 'react-icons/fa'

import { Thumbnail } from './thumbnail'
import { DragItemTypes } from '../dnd'
import StructureItemMenu from './structure_item_menu'

export const lessonDragSource = {
  beginDrag (props) {
    return {uuid: props.uuid}
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class LessonThumbnail extends React.Component {
  render () {
    return this.props.connectDragPreview(
      <div
        className='lesson-thumbnail editor-col-md-1 module-accessible-block draggable'
        onClick={this.props.onClick}
        style={{display: this.props.isDragging ? 'none' : 'block'}}>
        {/* {this.props.connectDragSource(<span className='drag-handle'/>)} */}
        {this.props.connectDragSource(<span className='drag-handle'><FaGripHorizontal /></span>)}
        <div className='thumbnail section-thumbnail'>
          <Thumbnail image={this.props.image}/>
        </div>
        <span
          style={{position: 'absolute', top: '5px', right: '5px', cursor: 'pointer'}}>
          <StructureItemMenu lesson={{uuid: this.props.uuid}}>
            <FaGripLines/>
          </StructureItemMenu>
        </span>
        <div>{this.props.name}</div>
      </div>)
  }
}

LessonThumbnail = DragSource(DragItemTypes.LESSON, lessonDragSource, collect)(LessonThumbnail)

export {LessonThumbnail}
