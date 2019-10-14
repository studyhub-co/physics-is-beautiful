import React from 'react'

import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import { FaGripHorizontal, FaGripLines } from 'react-icons/fa'

import { Thumbnail } from '../../../../components/thumbnail'
import { DragItemTypes } from '../../../../dnd'
import StructureItemMenu from '../rich_components/structure_item_menu'

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

class LessonThumbnailComponent extends React.Component {
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

LessonThumbnailComponent.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string,
  uuid: PropTypes.string,
  image: PropTypes.string,
  isDragging: PropTypes.bool
}

export const LessonThumbnail = DragSource(
  DragItemTypes.LESSON, lessonDragSource, collect
)(LessonThumbnailComponent)
