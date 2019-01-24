import React from 'react'
import { DropTarget } from 'react-dnd'

export const DragItemTypes = {
  SOLUTION: 'solution',
  CHAPTER: 'chapter'
}

let DockableDropTargetClass = class DockableDropTarget extends React.Component {
  render () {
    let dockSite = null
    let isOver = this.props.dragOver && this.props.itemOver.id !== this.props.self.id
    if (isOver) {
      dockSite = <div className='dock-site' />
    }
    return this.props.connectDropTarget(
      <div className={'drop-target' + (isOver ? ' drag-over' : '')}>
        {dockSite}
        {this.props.children}
      </div>
    )
  }
}

let DockableDropTarget = DropTarget(props => props.itemType,
  {drop: function (props, monitor) {
    var item = monitor.getItem()
    if (item.id !== props.self.id) {
      props.onDrop(item)
    }
  }
  },
  (connect, monitor) => {
    return {
      connectDropTarget: connect.dropTarget(),
      dragOver: monitor.isOver(),
      itemOver: monitor.getItem()
    }
  })(DockableDropTargetClass)

export {DockableDropTarget}
