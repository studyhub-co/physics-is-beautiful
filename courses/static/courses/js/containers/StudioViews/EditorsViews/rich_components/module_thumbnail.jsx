import React from 'react'

import { FaGripHorizontal, FaGripLines } from 'react-icons/fa'
import { DragSource } from 'react-dnd'

import { Thumbnail } from '../components/thumbnail'
import { DragItemTypes } from '../components/dnd'
import StructureItemMenu from '../rich_components/structure_item_menu'

export const moduleDragSource = {
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

class ModuleThumbnailComponent extends React.Component {
  render () {
    const { connectDragSource, connectDragPreview, isDragging, connectDropTarget } = this.props
    return connectDropTarget(connectDragPreview(
      <div className='module-thumbnail editor-col-md-1 module-accessible-block draggable' onClick={this.props.onClick} style={{display: isDragging ? 'none' : 'block'}}>
        {connectDragSource(<span className='drag-handle'><FaGripHorizontal /></span>)}
        <div className='thumbnail section-thumbnail'><Thumbnail image={this.props.image}/></div>
        <span
          style={{position: 'absolute', top: '5px', right: '5px', cursor: 'pointer'}}>
          <StructureItemMenu module={{uuid: this.props.uuid}}>
            <FaGripLines/>
          </StructureItemMenu>
        </span>
        <div>{this.props.name}</div>
      </div>
    ))
  }
}

export const ModuleThumbnail = DragSource(DragItemTypes.MODULE, moduleDragSource, collect)(ModuleThumbnailComponent)
