import React from 'react'
import { DropTarget } from 'react-dnd'

export const DragItemTypes = {
  PROBLEM: 'problem',
  CHAPTER: 'chapter'
}

let DockableDropTargetClass = class DockableDropTarget extends React.Component {
  render () {
    let dockSite = null

    let idAttr = this.props.idAttr

    let isOver = this.props.dragOver && (!this.props.self || this.props.itemOver[idAttr] !== this.props.self[idAttr])
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
    let idAttr = props.idAttr
    if (!props.self || item[idAttr] !== props.self[idAttr]) {
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
