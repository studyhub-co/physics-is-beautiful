import React from 'react';
import { DropTarget } from 'react-dnd';

export const DragItemTypes = {
  MODULE : 'module'
};

class DockableDropTarget extends React.Component {
/*  constructor (props) {
    super(props);
    this.onDr
  }*/
  render () {
    let dockSite;
    if (this.props.dragOver){
      dockSite = <div className="dock-site"></div>;
    }
    return this.props.connectDropTarget(
      <div className="drop-target">
        {dockSite}
        {this.props.children}
      </div>
    )
  }
}

DockableDropTarget = DropTarget([DragItemTypes.MODULE],
                              {drop :function(props, monitor) {
                                props.onDrop(monitor.getItem());
                              }
                              },
                              (connect, monitor) => {
                                return {
                                  connectDropTarget: connect.dropTarget(),
                                  dragOver : monitor.isOver()
                                }
                              })(DockableDropTarget);

export {DockableDropTarget};
