import React from 'react'

import {Thumbnail} from './thumbnail'
import { DragSource } from 'react-dnd'

import {DragItemTypes} from '../dnd'
import StructureItemMenu from './structure_item_menu'
import { FaGripHorizontal, FaGripLines } from 'react-icons/fa'

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

class ModuleThumbnail extends React.Component {
  render () {
    const { connectDragSource, connectDragPreview, isDragging, connectDropTarget } = this.props
    return connectDropTarget(connectDragPreview(
      <div className='module-thumbnail editor-col-md-1 module-accessible-block draggable' onClick={this.props.onClick} style={{display: isDragging ? 'none' : 'block'}}>
        {/*{connectDragSource(<span className='drag-handle'/>)}*/}
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
ModuleThumbnail = DragSource(DragItemTypes.MODULE, moduleDragSource, collect)(ModuleThumbnail)
export {ModuleThumbnail}
