import React from 'react';

import {EditableLabel} from './label'
import {EditableThumbnail} from './thumbnail'
import {ModuleThumbnailContainer} from '../containers/module_thumbnail'
import {DockableDropTarget, DragHoverable, DragItemTypes} from '../dnd';

export class Unit extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  handleDeleteClick (e) {
    e.preventDefault();
    if (confirm('This will permanently delete unit "'+this.props.name+'" with all its contents. Are you sure?')){
      this.props.onDeleteClick()
    }
  }
  render () {
    const modules=[];
    for (var i=0; i<this.props.modules.length; i++){
      modules.push(
        <DockableDropTarget key={this.props.modules[i]} onDrop={this.props.onModuleDroppedBefore.bind(null, this.props.modules[i])} itemType={DragItemTypes.MODULE}>
          <ModuleThumbnailContainer uuid={this.props.modules[i]} />
        </DockableDropTarget>);
    }
   
    return (
      <div>
        <div className="section-title">
          <h2>
            <EditableThumbnail image={this.props.image} onChange={this.props.onImageChange}/>          
            <EditableLabel value={this.props.name} onChange={this.props.onNameChange}/>
            <span className="glyphicon glyphicon-remove" onClick={this.handleDeleteClick}/>
          </h2>
        </div>
        <div className="row">
          {modules}
          <DockableDropTarget onDrop={this.props.onModuleDroppedBefore.bind(null, null)} itemType={DragItemTypes.MODULE}>
            <div className="col-md-1 module-accessible-block" onClick={this.props.onAddModuleClick}>
              <div className="thumbnail section-thumbnail">
                <span className="glyphicon glyphicon-plus-sign"/>
              </div>
              Add module
            </div>
          </DockableDropTarget>
        </div>
      </div>)
  }
}

