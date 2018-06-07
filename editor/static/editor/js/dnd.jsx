import React from 'react';
import { DropTarget } from 'react-dnd';

export const DragItemTypes = {
  UNIT : 'unit',
  MODULE : 'module',
  LESSON : 'lesson',
  QUESTION : 'question',
};

class DockableDropTarget extends React.Component {
  render () {
    let dockSite, isOver=this.props.dragOver && this.props.itemOver.uuid != this.props.selfUuid;
    if (isOver){
      dockSite = <div className="dock-site"></div>;
    }
    return this.props.connectDropTarget(
      <div className={'drop-target' + (isOver ? ' drag-over':'')}>
        {dockSite}
        {this.props.children}
      </div>
    )
  }
}

DockableDropTarget = DropTarget(props =>  props.itemType,
                                {drop :function(props, monitor) {
                                  var item = monitor.getItem();
                                  if (item.uuid != props.selfUuid)
                                    props.onDrop(item);
                                }
                                },
                                (connect, monitor) => {
                                  return {
                                    connectDropTarget: connect.dropTarget(),
                                    dragOver : monitor.isOver(),
                                    itemOver : monitor.getItem()
                                  }
                                })(DockableDropTarget);

export {DockableDropTarget};


class DragHoverable extends React.Component {
  render() {
    return this.props.connectDropTarget(
      <div>
        {this.props.children}
      </div>
    )
  }
}

DragHoverable = DropTarget(props => props.itemType,
			   {
                             hover : (props, monitor, component) => {
			       component.lastDragOver = Date.now();
			       if (!component.timer) {
				 component.timer = setTimeout(() => {
				   component.timer = null;
				   if (Date.now() - component.lastDragOver < 200)
				     props.onDragHover()
				 }, 500)
			       }
                             }},
                           (connect, monitor) => {
                             return {
                               connectDropTarget: connect.dropTarget(),
                               dragOver : monitor.isOver()
                             }
                           }
                          )(DragHoverable)

export {DragHoverable};
