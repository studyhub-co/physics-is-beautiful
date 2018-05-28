import React from 'react';

import {Thumbnail} from './thumbnail'
import { DragSource } from 'react-dnd';

import {DragItemTypes} from '../dnd';

export const moduleDragSource = {
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


class ModuleThumbnail extends React.Component {
  render () {
    const { connectDragSource, isDragging, connectDropTarget } = this.props;
    return connectDropTarget(connectDragSource(
      <div className="col-md-1 module-accessible-block" onClick={this.props.onClick} style={{opacity:isDragging?0.5:1}}>
        <div className="thumbnail section-thumbnail"><Thumbnail image={this.props.image}/></div>
        <div>{this.props.name}</div>
      </div>
    ))
  } 
}
ModuleThumbnail = DragSource(DragItemTypes.MODULE, moduleDragSource, collect)(ModuleThumbnail);
export {ModuleThumbnail};
